'use server';

import { redirect } from 'next/navigation';
import { forgotPasswordSchema, signInSchema, signUpSchema } from './schemas';
import { db } from '@/db';
import { OAuthProvider, UserTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from '../core/password-hasher';
import { cookies } from 'next/headers';
import { createUserSession, removeUserFromSession } from '../core/session';
import { ActionResult, ErrorCode } from './types';
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
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (user == null) {
      return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
    }

    await createUserSession(user, await cookies());
  } catch (error) {
    return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
  }

  redirect('/profile');
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
      where: eq(UserTable.email, parsedData.email),
    });

    if (user == null) {
      return { ok: false, errorCode: ErrorCode.USER_NOT_FOUND };
    }

    // TODO: Send password reset email here
    return { ok: true };
  } catch (error) {
    return { ok: false, errorCode: ErrorCode.UNKNOWN_ERROR };
  }
}

// export async function oAuthSignIn(provider: OAuthProvider) {
//   const oAuthClient = getOAuthClient(provider);
//   redirect(oAuthClient.createAuthUrl(await cookies()));
// }
