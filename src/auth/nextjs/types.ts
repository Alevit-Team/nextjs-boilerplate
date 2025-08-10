export const ErrorCode = {
  INVALID_FORM: 'INVALID_FORM',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EXISTING_EMAIL: 'EXISTING_EMAIL',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type ActionResult = { ok: true } | { ok: false; errorCode: ErrorCode };
