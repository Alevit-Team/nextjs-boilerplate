import React from 'react';
import { cn } from '@/lib/utils';

interface IconBadgeProps {
  iconSize?: 'sm' | 'md' | 'lg';
}

const iconSizeClasses = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
};

const IconBadge = ({
  children,
  iconSize = 'md',
  className,
  ...props
}: React.ComponentProps<'div'> & IconBadgeProps) => {
  return (
    <div
      className={cn(
        'bg-primary/10 border-primary/5 inline-flex items-center justify-center rounded-full border-2 p-2',
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

export { IconBadge };
export type { IconBadgeProps };
