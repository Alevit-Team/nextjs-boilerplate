import { ErrorCode } from '@/auth/nextjs/types';

export const getFormErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case ErrorCode.INVALID_FORM:
      return 'Invalid form data';
    case ErrorCode.INVALID_CREDENTIALS:
      return 'Invalid email or password';
    case ErrorCode.EXISTING_EMAIL:
      return 'Account with this email already exists';
    case ErrorCode.USER_NOT_FOUND:
      return 'User not found. Please check your email.';
    case ErrorCode.EMAIL_NOT_VERIFIED:
      return 'Please verify your email address before signing in. Check your inbox for a verification link.';
    case ErrorCode.INVALID_TOKEN:
      return 'Invalid or malformed verification link. Please request a new one.';
    case ErrorCode.EXPIRED_TOKEN:
      return 'This verification link has expired. Please request a new one.';
    case ErrorCode.TOKEN_ALREADY_USED:
      return 'This verification link has already been used or your email is already verified.';
    case ErrorCode.RATE_LIMITED:
      return 'Too many requests. Please wait before trying again.';
    case ErrorCode.UNKNOWN_ERROR:
      return 'An unexpected error occurred. Please try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
};
