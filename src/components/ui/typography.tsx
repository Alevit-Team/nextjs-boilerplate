import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Typography Component using Tailwind v4 utility classes
 * Clean approach that leverages fluid responsive utilities defined in globals.css
 * Single source of truth - no duplicate styles between CSS and component
 */
const typographyVariants = cva('', {
  variants: {
    variant: {
      // Display variants - Direct CSS class usage from globals.css
      'display-2xl': 'display-2xl',
      'display-xl': 'display-xl',
      'display-lg': 'display-lg',
      'display-md': 'display-md',
      'display-sm': 'display-sm',

      // Headline variants - Direct CSS class usage from globals.css
      'headline-xl': 'headline-xl',
      'headline-lg': 'headline-lg',
      'headline-md': 'headline-md',
      'headline-sm': 'headline-sm',

      // Title variants - Direct CSS class usage from globals.css
      'title-xl': 'title-xl',
      'title-lg': 'title-lg',
      'title-md': 'title-md',
      'title-sm': 'title-sm',

      // Body variants - Direct CSS class usage from globals.css
      'body-xl': 'body-xl',
      'body-lg': 'body-lg',
      'body-md': 'body-md',
      'body-sm': 'body-sm',

      // Label variants - Direct CSS class usage from globals.css
      'label-xl': 'label-xl',
      'label-lg': 'label-lg',
      'label-md': 'label-md',
      'label-sm': 'label-sm',

      // Caption variants - Direct CSS class usage from globals.css
      'caption-lg': 'caption-lg',
      'caption-md': 'caption-md',
      'caption-sm': 'caption-sm',

      // Overline variant - Direct CSS class usage from globals.css
      overline: 'overline',
    },
  },
  defaultVariants: {
    variant: 'body-md',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

/**
 * Typography component with automatic semantic element selection
 * Provides full IntelliSense support and type safety
 */
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, children, ...props }, ref) => {
    // Automatic semantic element selection based on variant
    const getDefaultElement = (
      variant: string | null | undefined
    ): React.ElementType => {
      if (!variant) return 'p';

      if (variant.startsWith('display')) return 'h1';
      if (variant.startsWith('headline')) return 'h2';
      if (variant.startsWith('title')) return 'h3';
      if (variant.startsWith('body')) return 'p';
      if (variant.startsWith('label')) return 'label';
      if (variant.startsWith('caption')) return 'span';
      if (variant === 'overline') return 'div';

      return 'p';
    };

    const Component = as || getDefaultElement(variant);

    return (
      <Component
        className={cn(typographyVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

// Specific typography components for better developer experience
export const Display = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'> & {
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  }
>(({ size = 'lg', ...props }, ref) => (
  <Typography variant={`display-${size}` as any} ref={ref} {...props} />
));
Display.displayName = 'Display';

export const Headline = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ size = 'lg', ...props }, ref) => (
  <Typography variant={`headline-${size}` as any} ref={ref} {...props} />
));
Headline.displayName = 'Headline';

export const Title = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ size = 'md', ...props }, ref) => (
  <Typography variant={`title-${size}` as any} ref={ref} {...props} />
));
Title.displayName = 'Title';

export const Body = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ size = 'md', ...props }, ref) => (
  <Typography variant={`body-${size}` as any} ref={ref} {...props} />
));
Body.displayName = 'Body';

export const Label = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ size = 'md', ...props }, ref) => (
  <Typography variant={`label-${size}` as any} ref={ref} {...props} />
));
Label.displayName = 'Label';

export const Caption = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' }
>(({ size = 'md', ...props }, ref) => (
  <Typography variant={`caption-${size}` as any} ref={ref} {...props} />
));
Caption.displayName = 'Caption';

export const Overline = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'>
>((props, ref) => <Typography variant='overline' ref={ref} {...props} />);
Overline.displayName = 'Overline';

export { Typography, typographyVariants };
export type { VariantProps as TypographyVariantProps } from 'class-variance-authority';
