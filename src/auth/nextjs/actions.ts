'use server';

import { redirect } from 'next/navigation';
import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
  resendVerificationSchema,
} from './schemas';
import { db } from '@/db';
import { UserTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from '../core/password-hasher';
import { cookies } from 'next/headers';
import { createUserSession, removeUserFromSession } from '../core/session';
import { ActionResult, ErrorCode } from './types';
import { emailService } from '@/lib/email-service';
import { tokenService } from '@/lib/token-service';
import { after } from 'next/server';
// import { getOAuthClient } from '../core/oauth/base';

export async function signIn(
  _previousState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const { success, data: parsedData } = signInSchema.safeParse(data);

  if (!success) {
    return {
      ok: false,
      errorCode: ErrorCode.INVALID_FORM,
    };
  }

  try {
    const user = await db.query.UserTable.findFirst({
      columns: {
        password: true,
        salt: true,
        id: true,
        email: true,
        role: true,
        emailVerified: true,
      },
      where: eq(UserTable.email, parsedData.email),
    });

    if (user == null || user.password == null || user.salt == null) {
      return { ok: false, errorCode: ErrorCode.INVALID_CREDENTIALS };
    }

    const isCorrectPassword = await comparePasswords({
      hashedPassword: user.password,
      password: parsedData.password,
      salt: user.salt,
    });

    if (!isCorrectPassword) {
      return { ok: false, errorCode: ErrorCode.INVALID_CREDENTIALS };
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return { ok: false, errorCode: ErrorCode.EMAIL_NOT_VERIFIED };
    }

    await createUserSession(user, await cookies());
  } catch (error) {
    console.error('Sign in error:', error);
    return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
  }

  redirect('/');
}

export async function signUp(
  _previousState: unknown,
  formData: FormData
): Promise<ActionResult | never> {
  const data = Object.fromEntries(formData.entries());
  const { success, data: parsedData } = signUpSchema.safeParse(data);

  if (!success) {
    return { ok: false, errorCode: ErrorCode.INVALID_FORM };
  }

  try {
    const existingUser = await db.query.UserTable.findFirst({
      where: eq(UserTable.email, parsedData.email),
    });

    if (existingUser != null) {
      return { ok: false, errorCode: ErrorCode.EXISTING_EMAIL };
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(parsedData.password, salt);

    const [user] = await db
      .insert(UserTable)
      .values({
        name: parsedData.name,
        email: parsedData.email,
        password: hashedPassword,
        salt,
        // emailVerified is null by default - user needs to verify
      })
      .returning({
        id: UserTable.id,
        role: UserTable.role,
        name: UserTable.name,
      });

    if (user == null) {
      return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
    }

    // Generate email verification token and send email
    try {
      const verificationToken = await tokenService.createEmailVerificationToken(
        user.id
      );
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;

      after(async () => {
        try {
          await emailService.sendEmailVerification(parsedData.email, {
            userName: user.name,
            verificationUrl,
          });
        } catch (emailError) {
          console.error(
            'Failed to send verification email in after callback:',
            emailError
          );
        }
      });
    } catch (emailError) {
      console.error('Failed to create verification token:', emailError);
    }

    // Don't create session yet - user needs to verify email first
  } catch (error) {
    console.error('Sign up error:', error);
    return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
  }

  redirect('/verify-email');
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect('/');
}

export async function forgotPassword(
  _previousState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const { success, data: parsedData } = forgotPasswordSchema.safeParse(data);

  if (!success) {
    return { ok: false, errorCode: ErrorCode.INVALID_FORM };
  }

  try {
    const user = await db.query.UserTable.findFirst({
      columns: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
      where: eq(UserTable.email, parsedData.email),
    });

    // Always return success for security (don't reveal if email exists)
    // But only send email if user exists and is verified
    if (user && user.emailVerified) {
      // Check rate limiting
      const rateLimit = await tokenService.checkPasswordResetRateLimit(user.id);
      if (!rateLimit.allowed) {
        return { ok: false, errorCode: ErrorCode.RATE_LIMITED };
      }

      try {
        const resetToken = await tokenService.createPasswordResetToken(user.id);
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
        console.log('resetUrl', resetUrl);

        after(async () => {
          try {
            await emailService.sendPasswordReset(user.email, {
              userName: user.name,
              resetUrl,
            });
          } catch (emailError) {
            console.error(
              'Failed to send password reset email in after callback:',
              emailError
            );
          }
        });
      } catch (emailError) {
        console.error('Failed to create password reset token:', emailError);
        // Still return success for security
      }
    }

    return { ok: true };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
  }
}

export async function resetPassword(
  token: string,
  _previousState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const { success, data: parsedData } = resetPasswordSchema.safeParse(data);

  if (!success) {
    return { ok: false, errorCode: ErrorCode.INVALID_FORM };
  }

  try {
    // Validate the token
    const validation = await tokenService.validatePasswordResetToken(token);
    if (!validation.isValid || !validation.userId) {
      switch (validation.error) {
        case 'EXPIRED':
          return { ok: false, errorCode: ErrorCode.EXPIRED_TOKEN };
        case 'ALREADY_USED':
          return { ok: false, errorCode: ErrorCode.TOKEN_ALREADY_USED };
        case 'NOT_FOUND':
        case 'INVALID':
        default:
          return { ok: false, errorCode: ErrorCode.INVALID_TOKEN };
      }
    }

    // Generate new password hash
    const salt = generateSalt();
    const hashedPassword = await hashPassword(parsedData.password, salt);

    // Update password and mark token as used
    await db.transaction(async (tx) => {
      // Update user password
      await tx
        .update(UserTable)
        .set({
          password: hashedPassword,
          salt,
          updatedAt: new Date(),
        })
        .where(eq(UserTable.id, validation.userId!));

      // Mark token as used
      await tokenService.consumePasswordResetToken(token);
    });

    // Invalidate all user sessions for security
    // Note: In a production app, you might want to store session IDs
    // and invalidate them specifically
    console.log(`Password reset successful for user ${validation.userId}`);

    return { ok: true };
  } catch (error) {
    console.error('Reset password error:', error);
    return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
  }
}

export async function verifyEmail(token: string): Promise<ActionResult> {
  try {
    const success = await tokenService.consumeEmailVerificationToken(token);

    if (!success) {
      const validation =
        await tokenService.validateEmailVerificationToken(token);
      switch (validation.error) {
        case 'EXPIRED':
          return { ok: false, errorCode: ErrorCode.EXPIRED_TOKEN };
        case 'ALREADY_USED':
          return { ok: false, errorCode: ErrorCode.TOKEN_ALREADY_USED };
        case 'NOT_FOUND':
        case 'INVALID':
        default:
          return { ok: false, errorCode: ErrorCode.INVALID_TOKEN };
      }
    }

    return { ok: true };
  } catch (error) {
    console.error('Email verification error:', error);
    return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
  }
}

export async function resendVerificationEmail(
  _previousState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const data = Object.fromEntries(formData.entries());
  const { success, data: parsedData } =
    resendVerificationSchema.safeParse(data);

  if (!success) {
    return { ok: false, errorCode: ErrorCode.INVALID_FORM };
  }

  try {
    const user = await db.query.UserTable.findFirst({
      columns: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
      },
      where: eq(UserTable.email, parsedData.email),
    });

    if (!user) {
      return { ok: false, errorCode: ErrorCode.USER_NOT_FOUND };
    }

    if (user.emailVerified) {
      return { ok: false, errorCode: ErrorCode.TOKEN_ALREADY_USED };
    }

    // Check rate limiting
    const rateLimit = await tokenService.checkEmailVerificationRateLimit(
      user.id
    );
    if (!rateLimit.allowed) {
      return { ok: false, errorCode: ErrorCode.RATE_LIMITED };
    }

    try {
      const verificationToken = await tokenService.createEmailVerificationToken(
        user.id
      );
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;
      console.log('verificationUrl', verificationUrl);

      after(async () => {
        try {
          await emailService.sendEmailVerification(user.email, {
            userName: user.name,
            verificationUrl,
          });
        } catch (emailError) {
          console.error(
            'Failed to send verification email in after callback:',
            emailError
          );
        }
      });
    } catch (emailError) {
      console.error('Failed to create verification token:', emailError);
      return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
    }

    return { ok: true };
  } catch (error) {
    console.error('Resend verification email error:', error);
    return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
  }
}

// export async function oAuthSignIn(provider: OAuthProvider) {
//   const oAuthClient = getOAuthClient(provider);
//   redirect(oAuthClient.createAuthUrl(await cookies()));
// }
