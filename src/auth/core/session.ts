import { userRoles } from '@/db/schema';
import z from 'zod';
import { sessionService } from '@/lib/services/session-service';

export const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const COOKIE_SESSION_KEY = 'sessionId';
// Throttle interval for session expiration refresh; defaults to 5 minutes
export const SESSION_TOUCH_INTERVAL_SECONDS = 60 * 5;
export const COOKIE_SESSION_TOUCH_KEY = 'sessionTouchAt';

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});

type UserSession = z.infer<typeof sessionSchema>;

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: 'strict' | 'lax';
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, 'get' | 'set'>
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  // Skip if Redis is not available (e.g., during build)
  if (!process.env.REDIS_URL) {
    return null;
  }

  // Throttle refreshes using an httpOnly cookie storing last touch timestamp
  const now = Date.now();
  const throttleMs = SESSION_TOUCH_INTERVAL_SECONDS * 1000;
  const lastTouchRaw = cookies.get(COOKIE_SESSION_TOUCH_KEY)?.value;
  const lastTouch = lastTouchRaw
    ? Number.parseInt(lastTouchRaw, 10)
    : undefined;

  if (Number.isFinite(lastTouch) && now - (lastTouch as number) < throttleMs) {
    return; // Skip refresh; too soon
  }

  try {
    // Use new session service for touching session
    const success = await sessionService.touchSession(sessionId, lastTouch);

    if (success) {
      setCookie(sessionId, cookies);

      // Record the last refresh time to enforce throttling
      cookies.set(COOKIE_SESSION_TOUCH_KEY, String(now), {
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        expires: now + SESSION_EXPIRATION_SECONDS * 1000,
      });

      console.log('updated session expiration');
    }

    return success;
  } catch (error) {
    console.warn('Failed to update session expiration:', error);
    return null; // Graceful degradation
  }
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, 'set'>
) {
  // Skip if Redis is not available (e.g., during build)
  if (!process.env.REDIS_URL) {
    throw new Error('Redis is required for session management');
  }

  try {
    // Validate user data
    const validatedUser = sessionSchema.parse(user);

    // Create session using new session service
    const sessionId = await sessionService.createSession(validatedUser);

    if (!sessionId) {
      throw new Error('Failed to create session');
    }

    await setCookie(sessionId, cookies);
    console.log('User session created successfully');
  } catch (error) {
    console.error('Failed to create user session:', error);

    if (error instanceof Error) {
      // Re-throw validation errors
      if (error.name === 'ZodError') {
        throw new Error('Invalid user data provided for session');
      }

      // Handle Redis-related errors gracefully
      if (
        error.message.includes('Redis') ||
        error.message.includes('connection')
      ) {
        throw new Error(
          'Session management is temporarily unavailable. Please try again later.'
        );
      }
    }

    throw new Error('Session creation failed');
  }
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, 'get' | 'delete'>
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return;

  // Always delete cookies, even if Redis is not available
  cookies.delete(COOKIE_SESSION_KEY);
  cookies.delete(COOKIE_SESSION_TOUCH_KEY);

  // Skip Redis deletion if not available (e.g., during build)
  if (!process.env.REDIS_URL) {
    return;
  }

  try {
    // Use new session service for deletion
    const success = await sessionService.deleteSession(sessionId);

    if (success) {
      console.log('removed user from session');
    } else {
      console.warn('Session may not have existed in Redis');
    }
  } catch (error) {
    console.warn('Failed to remove session from Redis:', error);
    // Continue anyway since cookies are already deleted
  }
}

export async function setCookie(
  sessionId: string,
  cookies: Pick<Cookies, 'set'>
) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

async function getUserSessionById(sessionId: string) {
  // Skip if Redis is not available (e.g., during build)
  if (!process.env.REDIS_URL) {
    return null;
  }

  try {
    // Use new session service for getting session
    const sessionData = await sessionService.getSession(sessionId);

    if (!sessionData) {
      return null;
    }

    // Validate session data matches our expected schema
    const { success, data: user } = sessionSchema.safeParse(sessionData);
    return success ? user : null;
  } catch (error) {
    console.warn('Failed to get session from Redis:', error);
    return null;
  }
}

export async function getUserFromSession(cookies: Pick<Cookies, 'get'>) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;

  if (sessionId == null) return null;

  return await getUserSessionById(sessionId);
}
