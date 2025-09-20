import { CheckIcon, XIcon } from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  ValidatedPasswordRule,
  validatePassword,
} from '@/lib/validate-password';
import { Typography } from '@/components/ui/typography';

interface PasswordValidationProps {
  password: string;
  className?: string;
}
const iconClassName = 'mr-2 h-3 w-3 flex-shrink-0';

const PasswordValidation = ({
  password,
  className,
}: PasswordValidationProps) => {
  const validatedRules = useMemo(() => validatePassword(password), [password]);

  return (
    <ul className={cn('space-y-1', className)}>
      {validatedRules.map((rule) => (
        <PasswordValidationItem key={rule.label} rule={rule} />
      ))}
    </ul>
  );
};

const PasswordValidationItem = ({ rule }: { rule: ValidatedPasswordRule }) => {
  return (
    <Typography
      key={rule.label}
      as='li'
      className={cn(
        rule.isValid && 'line-through',
        'flex items-center opacity-70 transition-colors duration-200',
        rule.isValid && 'opacity-100'
      )}
    >
      {rule.isValid ? (
        <CheckIcon className={iconClassName} aria-label='Valid' />
      ) : (
        <XIcon className={iconClassName} aria-label='Invalid' />
      )}
      {rule.label}
    </Typography>
  );
};

export { PasswordValidation };
