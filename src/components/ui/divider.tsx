import React from 'react';

import { cn } from '@/lib/utils';

interface DividerProps {
  label: string;
}

const Divider = ({
  label,
  className,
  ...props
}: React.ComponentProps<'div'> & DividerProps) => {
  return (
    <div
      data-slot='divider'
      className={cn('flex w-full items-center', className)}
      {...props}
    >
      <div className='bg-muted-foreground/20 h-px flex-1'></div>
      <span className='text-muted-foreground px-3 text-sm'>{label}</span>
      <div className='bg-muted-foreground/20 h-px flex-1'></div>
    </div>
  );
};

export { Divider };
