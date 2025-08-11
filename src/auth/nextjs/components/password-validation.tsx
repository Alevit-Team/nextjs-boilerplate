import { CheckIcon, XIcon } from 'lucide-react';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  ValidatedPasswordRule,
  validatePassword,
} from '@/lib/validate-password';

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
    <div className={cn('space-y-3', className)}>
      <ul className='space-y-1'>
        {validatedRules.map((rule) => (
          <PasswordValidationItem key={rule.label} rule={rule} />
        ))}
      </ul>
    </div>
  );
};

const PasswordValidationItem = ({ rule }: { rule: ValidatedPasswordRule }) => {
  return (
    <li
      key={rule.label}
      className={cn(
        'flex items-center text-sm opacity-70 transition-colors duration-200',
        rule.isValid && 'opacity-100'
      )}
    >
      {rule.isValid ? (
        <CheckIcon className={iconClassName} aria-label='Valid' />
      ) : (
        <XIcon className={iconClassName} aria-label='Invalid' />
      )}
      <span className={cn(rule.isValid && 'line-through')}>{rule.label}</span>
    </li>
  );
};

export { PasswordValidation };
