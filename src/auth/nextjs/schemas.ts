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

const errorMessages = {
  email: {
    invalid: 'Please enter a valid email',
    required: 'Email is required',
  },
  password: {
    tooShort: `Password must be at least ${validation.password.min} characters`,
    required: 'Password is required',
    mismatch: 'Passwords do not match',
    noNumber: 'Password must contain at least one number',
    noUppercase: 'Password must contain at least one uppercase letter',
    noSpecialChar: 'Password must contain at least one special character',
  },
  name: {
    tooShort: `Name must be at least ${validation.name.min} characters`,
    required: 'Name is required',
  },
};

const emailValidation = z
  .email({
    message: errorMessages.email.invalid,
  })
  .min(1, errorMessages.email.required);

const passwordValidation = z
  .string()
  .min(1, errorMessages.password.required)
  .min(validation.password.min, errorMessages.password.tooShort)
  .regex(/(?=.*[0-9])/, errorMessages.password.noNumber)
  .regex(/(?=.*[A-Z])/, errorMessages.password.noUppercase)
  .regex(
    /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
    errorMessages.password.noSpecialChar
  );

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

export const forgotPasswordSchema = z.object({
  email: emailValidation,
});

export const resetPasswordSchema = z.object({
  password: passwordValidation,
});

export const resendVerificationSchema = z.object({
  email: emailValidation,
});

export { validation, errorMessages };
