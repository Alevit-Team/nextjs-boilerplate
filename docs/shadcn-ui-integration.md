# shadcn/ui Integration Guide

## Overview

Our design system is fully compatible with **shadcn/ui** components. All existing and future shadcn/ui components will automatically inherit our design tokens without any additional configuration.

## How It Works

### 1. **Standard CSS Custom Properties**

Our design system defines colors using the standard CSS custom properties that shadcn/ui expects:

```css
:root {
  /* Core Colors */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.4418 0.216 304.15);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.92 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.88 0.02 304.15);
  --accent-foreground: oklch(0.205 0 0);

  /* Status Colors */
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --success: oklch(0.6 0.15 142);
  --warning: oklch(0.8 0.15 85);
  --info: oklch(0.6 0.15 220);

  /* Surface Colors */
  --card: oklch(0.99 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(0.985 0 0);
  --popover-foreground: oklch(0.145 0 0);

  /* Interactive */
  --border: oklch(0.85 0 0);
  --input: oklch(0.85 0 0);
  --ring: oklch(0.4418 0.216 304.15);
}
```

### 2. **Automatic Dark Mode**

Dark mode is handled automatically through the `.dark` class:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.65 0.19 304.15);
  /* ... all other colors adjusted for dark theme */
}
```

## Component Examples

### Buttons

All button variants automatically use our design tokens:

```tsx
import { Button } from '@/components/ui/button';

// These all use our design system colors
<Button>Primary</Button>                    // bg-primary
<Button variant="secondary">Secondary</Button>  // bg-secondary
<Button variant="outline">Outline</Button>     // border + bg-background
<Button variant="ghost">Ghost</Button>         // hover:bg-accent
<Button variant="destructive">Delete</Button>  // bg-destructive
```

### Using Design System Colors

You can use our design system colors directly in any component:

```tsx
// Background colors
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>
<div className="bg-accent text-accent-foreground">Accent</div>
<div className="bg-muted text-muted-foreground">Muted</div>

// Status colors
<div className="bg-destructive text-destructive-foreground">Error</div>
<div className="bg-success text-success-foreground">Success</div>
<div className="bg-warning text-warning-foreground">Warning</div>
<div className="bg-info text-info-foreground">Info</div>

// Surface colors
<div className="bg-card text-card-foreground">Card</div>
<div className="bg-popover text-popover-foreground">Popover</div>

// Borders and interactions
<div className="border-border">Border</div>
<input className="border-input focus:ring-ring" />
```

## Installing New shadcn/ui Components

When you install new shadcn/ui components, they will automatically work with our design system:

```bash
# Install any shadcn/ui component
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

No additional configuration needed! The components will use our:

- ✅ **Brand colors** (purple primary)
- ✅ **Typography scale**
- ✅ **Border radius** (`--radius: 0.625rem`)
- ✅ **Light/dark themes**
- ✅ **Focus styles** (purple ring)

## Customization

### Override Individual Components

If you need to customize a specific component, you can override CSS custom properties:

```tsx
// Custom button with different primary color
<Button
  style={{
    '--primary': 'oklch(0.5 0.2 120)', // Green instead of purple
    '--primary-foreground': 'oklch(1 0 0)',
  }}
>
  Green Button
</Button>
```

### Component-Specific Theming

Create themed variants by extending our base colors:

```tsx
// components/ui/success-button.tsx
const successButtonVariants = cva(
  'bg-success text-success-foreground hover:bg-success/90'
);

export function SuccessButton({ children, ...props }) {
  return (
    <button className={successButtonVariants()} {...props}>
      {children}
    </button>
  );
}
```

## Best Practices

### 1. **Use Semantic Colors**

```tsx
// ✅ DO: Use semantic color names
<div className="bg-primary text-primary-foreground">
<div className="text-muted-foreground">
<div className="border-border">

// ❌ DON'T: Use arbitrary colors
<div className="bg-purple-600 text-white">
<div className="text-gray-500">
<div className="border-gray-300">
```

### 2. **Respect Color Pairs**

```tsx
// ✅ DO: Use proper foreground/background pairs
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-destructive text-destructive-foreground">Error</div>

// ❌ DON'T: Mix mismatched pairs
<div className="bg-primary text-secondary-foreground">Wrong</div>
```

### 3. **Test in Both Themes**

Always test components in both light and dark mode to ensure proper contrast and readability.

## Migration from Existing Components

If you have existing shadcn/ui components that aren't using our design system:

1. **No changes needed** - they should automatically inherit our colors
2. **Check focus styles** - ensure they use `focus:ring-ring`
3. **Verify contrast** - test in both light and dark modes
4. **Update custom colors** - replace hardcoded colors with semantic ones

## Troubleshooting

### Component Not Using Design System Colors

If a component isn't picking up our colors:

1. **Check CSS specificity** - ensure our variables aren't being overridden
2. **Verify class names** - make sure you're using standard shadcn/ui classes
3. **Check for hardcoded colors** - replace with semantic color classes
4. **Ensure proper imports** - make sure globals.css is imported

### Dark Mode Issues

If dark mode isn't working properly:

1. **Check HTML class** - ensure `<html class="dark">` is applied
2. **Verify color definitions** - check both `:root` and `.dark` sections
3. **Test color pairs** - ensure foreground/background combinations work in dark mode

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Design System Demo](/design-system-demo) - See all integrations in action
- [Color System Guide](./design-system.md#colors) - Understanding our color tokens
