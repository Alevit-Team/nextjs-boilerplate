import { userRoles } from '@/db/schema';
import { randomBytes } from 'crypto';
import z from 'zod';
import redisClient from '@/redis';
import { env } from '@/env/server';

export const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const COOKIE_SESSION_KEY = 'sessionId';
// Throttle interval for session expiration refresh; defaults to 5 minutes
export const SESSION_TOUCH_INTERVAL_SECONDS =
  env.SESSION_TOUCH_INTERVAL_SECONDS ?? 60 * 5;
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

  const user = await getUserSessionById(sessionId);
  if (user == null) return;

  await redisClient.set(
    `session:${sessionId}`,
    JSON.stringify(user),
    'EX',
    SESSION_EXPIRATION_SECONDS
  );
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

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, 'set'>
) {
  const sessionId = randomBytes(512).toString('hex').normalize();

  await redisClient.set(
    `session:${sessionId}`,
    JSON.stringify(sessionSchema.parse(user)),
    'EX',
    SESSION_EXPIRATION_SECONDS
  );

  await setCookie(sessionId, cookies);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, 'get' | 'delete'>
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return;

  await redisClient.del(`session:${sessionId}`);
  cookies.delete(COOKIE_SESSION_KEY);
  cookies.delete(COOKIE_SESSION_TOUCH_KEY);
  console.log('removed user from session');
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
  const rawUser = await redisClient.get(`session:${sessionId}`);

  if (rawUser == null) return null;

  let userObject = null;

  try {
    userObject = JSON.parse(rawUser);
  } catch (error) {
    console.error('Error parsing session raw user', error);
    return null;
  }

  const { success, data: user } = sessionSchema.safeParse(userObject);

  return success ? user : null;
}

export async function getUserFromSession(cookies: Pick<Cookies, 'get'>) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;

  if (sessionId == null) return null;

  return await getUserSessionById(sessionId);
}
