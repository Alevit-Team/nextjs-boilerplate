import { ErrorCode } from '@/auth/nextjs/types';

export const getFormErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case ErrorCode.INVALID_FORM:
      return 'Invalid form data';
    case ErrorCode.EXISTING_EMAIL:
      return 'Account with this email already exists';
    case ErrorCode.USER_NOT_FOUND:
      return 'User not found. Please check your email.';
    default:
      return 'Something went wrong. Please try again.';
  }
};
