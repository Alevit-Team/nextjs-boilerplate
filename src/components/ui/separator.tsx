'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';
import { Caption } from './typography';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  label,
  ...rootProps
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & { label?: string }) {
  if (label && orientation === 'horizontal') {
    return (
      <div
        data-slot='separator'
        className={cn('flex w-full items-center', className)}
      >
        <SeparatorPrimitive.Root
          decorative
          orientation='horizontal'
          className={cn('bg-border h-px flex-1 shrink-0')}
        />
        <Caption color='muted-foreground' size='lg' className='px-3'>
          {label}
        </Caption>
        <SeparatorPrimitive.Root
          decorative
          orientation='horizontal'
          className={cn('bg-border h-px flex-1 shrink-0')}
        />
      </div>
    );
  }

  return (
    <SeparatorPrimitive.Root
      data-slot='separator'
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      {...rootProps}
    />
  );
}

export { Separator };
