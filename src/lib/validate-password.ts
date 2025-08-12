export interface PasswordValidationRule {
  label: string;
  test: (password: string) => boolean;
}

export interface ValidatedPasswordRule extends PasswordValidationRule {
  isValid: boolean;
}

export const passwordValidationRules: PasswordValidationRule[] = [
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    label: 'At least one uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'At least one lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'At least one number',
    test: (password) => /[0-9]/.test(password),
  },
  {
    label: 'At least one special character',
    test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  },
];

export function validatePassword(password: string): ValidatedPasswordRule[] {
  return passwordValidationRules.map((rule) => ({
    ...rule,
    isValid: rule.test(password),
  }));
}

export function isPasswordValid(password: string): boolean {
  return passwordValidationRules.every((rule) => rule.test(password));
}
