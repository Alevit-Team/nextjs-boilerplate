export const ErrorCode = {
  INVALID_FORM: 'INVALID_FORM',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EXISTING_EMAIL: 'EXISTING_EMAIL',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  RATE_LIMITED: 'RATE_LIMITED',
  TOKEN_ALREADY_USED: 'TOKEN_ALREADY_USED',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type ActionResult = { ok: true } | { ok: false; errorCode: ErrorCode };
