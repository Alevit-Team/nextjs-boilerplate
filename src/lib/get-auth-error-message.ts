import { ErrorCode } from '@/auth/nextjs/types';

export const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case ErrorCode.INVALID_FORM:
      return 'Invalid form data';
    case ErrorCode.EXISTING_EMAIL:
      return 'Account with this email already exists';
    default:
      return 'Something went wrong. Please try again.';
  }
};
