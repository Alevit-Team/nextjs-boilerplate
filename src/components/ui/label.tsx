'use client';

import * as React from 'react';
import { Label as TypographyLabel, TypographyProps } from './typography';

import { cn } from '@/lib/utils';

function Label({
  className,
  ...props
}: Omit<TypographyProps, 'variant' | 'as'> &
  React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <TypographyLabel
      data-slot='label'
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Label };
