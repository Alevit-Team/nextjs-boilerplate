import { cn } from '@/lib/utils';
import React from 'react';

interface FormStatusProps {
  variant?: 'default' | 'error' | 'success';
  label: string;
}

const FormStatus = ({ label, variant = 'default' }: FormStatusProps) => {
  return (
    <div
      className={cn(
        'bg-muted rounded-md p-2 text-center text-sm',
        variant === 'error' && 'text-destructive bg-destructive/10',
        variant === 'success' && 'bg-green-50 text-green-600'
      )}
    >
      {label}
    </div>
  );
};

export { FormStatus };
