import * as React from 'react';

import { cn } from '@/lib/utils';

interface ContainerProps extends React.ComponentProps<'div'> {
  fullWidth?: boolean;
}

function Container({ className, fullWidth, ...props }: ContainerProps) {
  return (
    <div
      data-slot='container'
      className={cn(
        'px-4 sm:px-6 lg:px-8',
        fullWidth && 'w-full',
        !fullWidth && 'mx-auto max-w-5xl',
        className
      )}
      {...props}
    />
  );
}

export { Container };
