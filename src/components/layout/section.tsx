import * as React from 'react';

import { cn } from '@/lib/utils';

interface SectionProps<T extends React.ElementType = 'section'> {
  as?: T;
}

function Section<T extends React.ElementType = 'section'>({
  className,
  children,
  as,
  ...props
}: SectionProps<T> & Omit<React.ComponentProps<T>, keyof SectionProps<T>>) {
  const Component = as || 'section';

  return (
    <Component
      data-slot='section'
      className={cn('w-full py-8 sm:py-12 lg:py-16', className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Section };
