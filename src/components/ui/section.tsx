import * as React from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  as?: 'section' | 'div' | 'article' | 'main' | 'header' | 'footer';
}

function Section({
  className,
  children,
  ...props
}: React.ComponentProps<'section'> & SectionProps) {
  return (
    <section
      data-slot='section'
      className={cn('w-full py-8 sm:py-12 lg:py-16', className)}
      {...props}
    >
      {children}
    </section>
  );
}

export { Section };
