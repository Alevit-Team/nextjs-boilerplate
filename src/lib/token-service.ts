import { randomBytes, createHash, timingSafeEqual } from 'crypto';
import { db } from '@/db';
import {
  EmailVerificationTokenTable,
  PasswordResetTokenTable,
  UserTable,
  type NewEmailVerificationToken,
  type NewPasswordResetToken,
} from '@/db/schema';
import { eq, and, lt, gt, isNull } from 'drizzle-orm';

export interface TokenValidationResult {
  isValid: boolean;
  userId?: string;
  error?: 'EXPIRED' | 'NOT_FOUND' | 'ALREADY_USED' | 'INVALID';
}

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts?: number;
  resetTime?: Date;
}

class TokenService {
  // Token expiration times
  private readonly EMAIL_VERIFICATION_EXPIRY_HOURS = 24;
  private readonly PASSWORD_RESET_EXPIRY_MINUTES = 15;

  // Rate limiting
  private readonly MAX_VERIFICATION_EMAILS_PER_HOUR = 3;
  private readonly MAX_PASSWORD_RESET_PER_HOUR = 5;

  /**
   * Generate a cryptographically secure token
   */
  private generateSecureToken(): string {
    return randomBytes(64).toString('hex');
  }

  /**
   * Hash a token for secure storage
   */
  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  /**
   * Compare tokens in constant time to prevent timing attacks
   */
  private compareTokens(storedHash: string, providedToken: string): boolean {
    const providedHash = this.hashToken(providedToken);
    const storedBuffer = Buffer.from(storedHash, 'hex');
    const providedBuffer = Buffer.from(providedHash, 'hex');

    if (storedBuffer.length !== providedBuffer.length) {
      return false;
    }

    return timingSafeEqual(storedBuffer, providedBuffer);
  }

  /**
   * Create an email verification token
   */
  async createEmailVerificationToken(userId: string): Promise<string> {
    // Clean up any existing tokens for this user
    await this.cleanupExpiredEmailVerificationTokens(userId);

    const token = this.generateSecureToken();
    const hashedToken = this.hashToken(token);
    const expiresAt = new Date();
    expiresAt.setHours(
      expiresAt.getHours() + this.EMAIL_VERIFICATION_EXPIRY_HOURS
    );

    const tokenData: NewEmailVerificationToken = {
      userId,
      token: hashedToken,
      expiresAt,
    };

    await db.insert(EmailVerificationTokenTable).values(tokenData);

    return token; // Return the unhashed token for the email
  }

  /**
   * Create a password reset token
   */
  async createPasswordResetToken(userId: string): Promise<string> {
    // Clean up any existing tokens for this user
    await this.cleanupExpiredPasswordResetTokens(userId);

    const token = this.generateSecureToken();
    const hashedToken = this.hashToken(token);
    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() + this.PASSWORD_RESET_EXPIRY_MINUTES
    );

    const tokenData: NewPasswordResetToken = {
      userId,
      token: hashedToken,
      expiresAt,
    };

    await db.insert(PasswordResetTokenTable).values(tokenData);

    return token; // Return the unhashed token for the email
  }

  /**
   * Validate an email verification token
   */
  async validateEmailVerificationToken(
    token: string
  ): Promise<TokenValidationResult> {
    try {
      // Fetch all non-expired tokens (we'll compare them securely)
      const now = new Date();
      const tokenRecords = await db.query.EmailVerificationTokenTable.findMany({
        where: gt(EmailVerificationTokenTable.expiresAt, now),
        with: {
          user: {
            columns: {
              id: true,
              emailVerified: true,
            },
          },
        },
      });

      // Find matching token using constant-time comparison
      let matchingRecord = null;
      for (const record of tokenRecords) {
        if (this.compareTokens(record.token, token)) {
          matchingRecord = record;
          break;
        }
      }

      if (!matchingRecord) {
        return { isValid: false, error: 'NOT_FOUND' };
      }

      // Check if token is expired
      if (new Date() > matchingRecord.expiresAt) {
        // Clean up expired token
        await db
          .delete(EmailVerificationTokenTable)
          .where(eq(EmailVerificationTokenTable.id, matchingRecord.id));
        return { isValid: false, error: 'EXPIRED' };
      }

      // Check if email is already verified
      if (matchingRecord.user.emailVerified) {
        return { isValid: false, error: 'ALREADY_USED' };
      }

      return { isValid: true, userId: matchingRecord.userId };
    } catch (error) {
      console.error('Error validating email verification token:', error);
      return { isValid: false, error: 'INVALID' };
    }
  }

  /**
   * Validate a password reset token
   */
  async validatePasswordResetToken(
    token: string
  ): Promise<TokenValidationResult> {
    try {
      // Fetch all non-expired, non-used tokens (we'll compare them securely)
      const now = new Date();
      const tokenRecords = await db.query.PasswordResetTokenTable.findMany({
        where: and(
          gt(PasswordResetTokenTable.expiresAt, now),
          isNull(PasswordResetTokenTable.usedAt)
        ),
      });

      // Find matching token using constant-time comparison
      let matchingRecord = null;
      for (const record of tokenRecords) {
        if (this.compareTokens(record.token, token)) {
          matchingRecord = record;
          break;
        }
      }

      if (!matchingRecord) {
        return { isValid: false, error: 'NOT_FOUND' };
      }

      // Check if token is expired
      if (new Date() > matchingRecord.expiresAt) {
        // Clean up expired token
        await db
          .delete(PasswordResetTokenTable)
          .where(eq(PasswordResetTokenTable.id, matchingRecord.id));
        return { isValid: false, error: 'EXPIRED' };
      }

      // Check if token was already used
      if (matchingRecord.usedAt) {
        return { isValid: false, error: 'ALREADY_USED' };
      }

      return { isValid: true, userId: matchingRecord.userId };
    } catch (error) {
      console.error('Error validating password reset token:', error);
      return { isValid: false, error: 'INVALID' };
    }
  }

  /**
   * Mark an email verification token as used and verify the user's email
   */
  async consumeEmailVerificationToken(token: string): Promise<boolean> {
    try {
      const validation = await this.validateEmailVerificationToken(token);

      if (!validation.isValid || !validation.userId) {
        return false;
      }

      // Find the token record to delete using secure comparison
      const tokenRecords = await db.query.EmailVerificationTokenTable.findMany({
        where: eq(EmailVerificationTokenTable.userId, validation.userId!),
      });

      let tokenRecordId = null;
      for (const record of tokenRecords) {
        if (this.compareTokens(record.token, token)) {
          tokenRecordId = record.id;
          break;
        }
      }

      if (!tokenRecordId) {
        return false;
      }

      // Start a transaction to ensure atomicity
      await db.transaction(async (tx) => {
        // Mark email as verified
        await tx
          .update(UserTable)
          .set({ emailVerified: new Date() })
          .where(eq(UserTable.id, validation.userId!));

        // Delete the verification token
        await tx
          .delete(EmailVerificationTokenTable)
          .where(eq(EmailVerificationTokenTable.id, tokenRecordId));
      });

      return true;
    } catch (error) {
      console.error('Error consuming email verification token:', error);
      return false;
    }
  }

  /**
   * Mark a password reset token as used
   */
  async consumePasswordResetToken(token: string): Promise<boolean> {
    try {
      const validation = await this.validatePasswordResetToken(token);

      if (!validation.isValid || !validation.userId) {
        return false;
      }

      // Find the token record to update using secure comparison
      const tokenRecords = await db.query.PasswordResetTokenTable.findMany({
        where: eq(PasswordResetTokenTable.userId, validation.userId),
      });

      let tokenRecordId = null;
      for (const record of tokenRecords) {
        if (this.compareTokens(record.token, token)) {
          tokenRecordId = record.id;
          break;
        }
      }

      if (!tokenRecordId) {
        return false;
      }

      // Mark token as used
      await db
        .update(PasswordResetTokenTable)
        .set({ usedAt: new Date() })
        .where(eq(PasswordResetTokenTable.id, tokenRecordId));

      return true;
    } catch (error) {
      console.error('Error consuming password reset token:', error);
      return false;
    }
  }

  /**
   * Check rate limiting for email verification requests
   */
  async checkEmailVerificationRateLimit(
    userId: string
  ): Promise<RateLimitResult> {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    try {
      const recentTokens = await db.query.EmailVerificationTokenTable.findMany({
        where: and(
          eq(EmailVerificationTokenTable.userId, userId),
          lt(EmailVerificationTokenTable.createdAt, oneHourAgo)
        ),
      });

      const remainingAttempts = Math.max(
        0,
        this.MAX_VERIFICATION_EMAILS_PER_HOUR - recentTokens.length
      );

      if (remainingAttempts === 0) {
        const resetTime = new Date(oneHourAgo);
        resetTime.setHours(resetTime.getHours() + 1);

        return {
          allowed: false,
          remainingAttempts: 0,
          resetTime,
        };
      }

      return {
        allowed: true,
        remainingAttempts,
      };
    } catch (error) {
      console.error('Error checking email verification rate limit:', error);
      // Allow the request if we can't check the rate limit
      return { allowed: true };
    }
  }

  /**
   * Check rate limiting for password reset requests
   */
  async checkPasswordResetRateLimit(userId: string): Promise<RateLimitResult> {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    try {
      const recentTokens = await db.query.PasswordResetTokenTable.findMany({
        where: and(
          eq(PasswordResetTokenTable.userId, userId),
          lt(PasswordResetTokenTable.createdAt, oneHourAgo)
        ),
      });

      const remainingAttempts = Math.max(
        0,
        this.MAX_PASSWORD_RESET_PER_HOUR - recentTokens.length
      );

      if (remainingAttempts === 0) {
        const resetTime = new Date(oneHourAgo);
        resetTime.setHours(resetTime.getHours() + 1);

        return {
          allowed: false,
          remainingAttempts: 0,
          resetTime,
        };
      }

      return {
        allowed: true,
        remainingAttempts,
      };
    } catch (error) {
      console.error('Error checking password reset rate limit:', error);
      // Allow the request if we can't check the rate limit
      return { allowed: true };
    }
  }

  /**
   * Clean up expired email verification tokens for a user
   */
  private async cleanupExpiredEmailVerificationTokens(
    userId: string
  ): Promise<void> {
    try {
      await db
        .delete(EmailVerificationTokenTable)
        .where(
          and(
            eq(EmailVerificationTokenTable.userId, userId),
            lt(EmailVerificationTokenTable.expiresAt, new Date())
          )
        );
    } catch (error) {
      console.error(
        'Error cleaning up expired email verification tokens:',
        error
      );
    }
  }

  /**
   * Clean up expired password reset tokens for a user
   */
  private async cleanupExpiredPasswordResetTokens(
    userId: string
  ): Promise<void> {
    try {
      await db
        .delete(PasswordResetTokenTable)
        .where(
          and(
            eq(PasswordResetTokenTable.userId, userId),
            lt(PasswordResetTokenTable.expiresAt, new Date())
          )
        );
    } catch (error) {
      console.error('Error cleaning up expired password reset tokens:', error);
    }
  }

  /**
   * Clean up all expired tokens (can be run as a scheduled job)
   */
  async cleanupAllExpiredTokens(): Promise<void> {
    try {
      const now = new Date();

      // Clean up expired email verification tokens
      await db
        .delete(EmailVerificationTokenTable)
        .where(lt(EmailVerificationTokenTable.expiresAt, now));

      // Clean up expired password reset tokens
      await db
        .delete(PasswordResetTokenTable)
        .where(lt(PasswordResetTokenTable.expiresAt, now));

      console.log('Cleaned up expired tokens');
    } catch (error) {
      console.error('Error cleaning up expired tokens:', error);
    }
  }
}

export const tokenService = new TokenService();
