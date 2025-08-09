import { z } from 'zod';

const validation = {
  password: {
    min: 8,
    max: 100,
  },
  name: {
    min: 2,
    max: 100,
  },
};

// Concise, user-friendly error messages following UX best practices
const errorMessages = {
  email: {
    invalid: 'Please enter a valid email',
    required: 'Email is required',
  },
  password: {
    tooShort: `Password must be at least ${validation.password.min} characters`,
    required: 'Password is required',
  },
  name: {
    tooShort: `Name must be at least ${validation.name.min} characters`,
    required: 'Name is required',
  },
};

// Enhanced email validation with better error messages
const emailValidation = z
  .email({
    message: errorMessages.email.invalid,
  })
  .min(1, errorMessages.email.required);

// Enhanced password validation with helpful messaging and security checks
const passwordValidation = z
  .string()
  .min(1, errorMessages.password.required)
  .min(validation.password.min, errorMessages.password.tooShort);

// Enhanced name validation
const nameValidation = z
  .string()
  .min(1, errorMessages.name.required)
  .min(validation.name.min, errorMessages.name.tooShort);

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

// Export validation constants for use in components
export { validation, errorMessages };
