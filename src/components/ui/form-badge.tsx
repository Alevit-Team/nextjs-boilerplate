import React from 'react';
import { cn } from '@/lib/utils';

interface FormBadgeProps {
  children: React.ReactNode;
  iconSize?: 'sm' | 'md' | 'lg';
}

const iconSizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
};

const FormBadge = ({ children, iconSize = 'md' }: FormBadgeProps) => {
  return (
    <div className='border-primary/2 flex items-center justify-center rounded-full border-6 bg-[#F4EEFE] p-2'>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const existingClassName = (child.props as any)?.className || '';
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(
              'text-primary',
              iconSizeClasses[iconSize],
              existingClassName
            ),
          });
        }
        return child;
      })}
    </div>
  );
};

export { FormBadge };
export type { FormBadgeProps };
