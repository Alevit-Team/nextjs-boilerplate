import React from 'react';
import { cn } from '@/lib/utils';

interface FormBadgeProps {
  iconSize?: 'sm' | 'md' | 'lg';
}

const iconSizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
};

const FormBadge = ({
  children,
  iconSize = 'md',
  className,
  ...props
}: React.ComponentProps<'div'> & FormBadgeProps) => {
  return (
    <div
      className={cn(
        'border-primary/2 flex items-center justify-center rounded-full border-6 bg-[#F4EEFE] p-2',
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const existingClassName =
            (child.props as unknown as { className?: string })?.className || '';
          return React.cloneElement(
            child as React.ReactElement<{ className?: string }>,
            {
              className: cn(
                'text-primary',
                iconSizeClasses[iconSize],
                existingClassName
              ),
            }
          );
        }
        return child;
      })}
    </div>
  );
};

export { FormBadge };
export type { FormBadgeProps };
