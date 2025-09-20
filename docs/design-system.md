# Design System Documentation

## Overview

This design system provides a comprehensive set of design tokens, typography scales, and utility classes built on top of Tailwind CSS v4. It follows professional design practices and modern web standards to ensure consistency and maintainability across your application.

## Table of Contents

- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Components](#components)
- [Utilities](#utilities)
- [Animation](#animation)
- [Best Practices](#best-practices)

## Color System

### Semantic Colors

Our color system uses semantic naming for better maintainability and theming support.

#### Primary Colors

```css
/* Usage Examples */
.bg-primary         /* Primary brand color */
.text-primary       /* Primary text */
.border-primary     /* Primary borders */
```

#### Status Colors

```css
.bg-success         /* Success states */
.bg-warning         /* Warning states */
.bg-destructive     /* Error/danger states */
.bg-info           /* Information states */
```

#### Surface Colors

```css
.bg-background      /* Main background */
.bg-card           /* Card backgrounds */
.bg-popover        /* Popover/modal backgrounds */
.bg-muted          /* Muted backgrounds */
```

### OKLCH Color Format

We use the modern OKLCH color format for better perceptual uniformity and wide gamut support:

```css
/* Light theme example */
--primary: oklch(44.18% 0.216 304.15);
/* Lightness: 44.18%, Chroma: 0.216, Hue: 304.15° */

/* Dark theme automatically adjusts */
.dark --primary: oklch(0.922 0 0);
```

## Typography

### Typography Scale

Our typography system provides a comprehensive scale with consistent spacing and hierarchy.

#### Display Typography

Use for hero sections and large headings:

```html
<h1 class="display-2xl">Hero Headline</h1>
<h1 class="display-xl">Large Display</h1>
<h1 class="display-lg">Medium Display</h1>
<h1 class="display-md">Small Display</h1>
<h1 class="display-sm">Smallest Display</h1>
```

#### Headlines

Use for section headers and important content:

```html
<h2 class="headline-xl">Section Title</h2>
<h3 class="headline-lg">Subsection Title</h3>
<h4 class="headline-md">Content Title</h4>
<h5 class="headline-sm">Small Title</h5>
```

#### Titles

Use for card titles and smaller headings:

```html
<h6 class="title-xl">Card Title Large</h6>
<div class="title-lg">Card Title</div>
<div class="title-md">Small Card Title</div>
<div class="title-sm">Tiny Title</div>
```

#### Body Text

Use for main content and descriptions:

```html
<p class="body-xl">Large paragraph text</p>
<p class="body-lg">Large body text</p>
<p class="body-md">Regular body text</p>
<p class="body-sm">Small body text</p>
```

#### Labels

Use for form labels and UI elements:

```html
<label class="label-xl">Form Label Large</label>
<label class="label-lg">Form Label</label>
<label class="label-md">Small Label</label>
<label class="label-sm">Tiny Label</label>
```

#### Captions

Use for supplementary information:

```html
<div class="caption-lg">Large caption text</div>
<div class="caption-md">Regular caption</div>
<div class="caption-sm">Small caption</div>
```

#### Overline

Use for categories and metadata:

```html
<div class="overline">CATEGORY</div>
```

### Font Features

The typography system includes advanced font features:

```css
/* Enabled by default */
font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
font-variant-ligatures: contextual;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### Text Wrapping

Modern CSS text wrapping is applied automatically:

```css
/* Headlines use balanced wrapping */
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

/* Body text uses pretty wrapping */
p {
  text-wrap: pretty;
}
```

## Spacing & Layout

### Spacing Scale

Based on a 4px base unit with consistent mathematical progression:

```css
/* Available spacing values */
.p-1      /* 4px */
.p-2      /* 8px */
.p-4      /* 16px */
.p-6      /* 24px */
.p-8      /* 32px */
.p-12     /* 48px */
.p-16     /* 64px */
.p-24     /* 96px */
.p-32     /* 128px */
/* ... and more */
```

### Container Utilities

Predefined container sizes for different content types:

```html
<!-- Fluid container with responsive padding -->
<div class="container-fluid">Content</div>

<!-- Narrow container for reading content -->
<div class="container-narrow">Article content</div>

<!-- Wide container for dashboards -->
<div class="container-wide">Dashboard content</div>
```

### Grid Utilities

Smart grid layouts that adapt to content:

```html
<!-- Auto-fit: Columns shrink to fit content -->
<div class="grid-auto-fit grid gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
</div>

<!-- Auto-fill: Maintains minimum column width -->
<div class="grid-auto-fill grid gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
</div>
```

### Flex Utilities

Common flex patterns made simple:

```html
<div class="flex-center">Centered content</div>
<div class="flex-between">Space between items</div>
<div class="flex-around">Space around items</div>
<div class="flex-evenly">Even spacing</div>
```

## Components

### Card Variations

Different card styles for various use cases:

```html
<!-- Elevated card with shadow -->
<div class="card-elevated p-6">
  <h3 class="title-lg">Card Title</h3>
  <p class="body-md">Card content</p>
</div>

<!-- Flat card without shadow -->
<div class="card-flat p-6">
  <h3 class="title-lg">Card Title</h3>
  <p class="body-md">Card content</p>
</div>

<!-- Ghost card with hover effect -->
<div class="card-ghost p-6">
  <h3 class="title-lg">Card Title</h3>
  <p class="body-md">Card content</p>
</div>
```

### Glass Effect

Modern glass morphism effects:

```html
<!-- Light glass effect -->
<div class="glass rounded-lg p-6">
  <h3 class="title-lg">Glass Card</h3>
</div>

<!-- Dark glass effect -->
<div class="glass-dark rounded-lg p-6">
  <h3 class="title-lg">Dark Glass Card</h3>
</div>
```

### Button Base

Foundation for all button components:

```html
<button class="btn-base bg-primary text-primary-foreground px-4 py-2">
  Primary Button
</button>
```

## Utilities

### Interactive States

Add polished interactions to any element:

```html
<!-- Element scales on hover/click -->
<div class="interactive bg-card rounded-lg p-4">Interactive card</div>
```

### Focus Management

Consistent focus styles for accessibility:

```html
<button class="focus-ring p-4">Accessible button</button>
```

### Scrollbar Styling

Clean, minimal scrollbars:

```html
<div class="scrollbar-thin h-64 overflow-y-auto">
  Long content that scrolls...
</div>
```

## Animation

### Fade Animations

```html
<div class="fade-in">Fades in on load</div>
<div class="fade-out">Fades out</div>
```

### Slide Animations

```html
<div class="slide-in-up">Slides up from bottom</div>
<div class="slide-in-down">Slides down from top</div>
```

### Scale Animations

```html
<div class="scale-in">Scales in from 95%</div>
```

### Custom Animation Durations

Use CSS custom properties for consistent timing:

```css
/* Available durations */
animation-duration: var(--duration-75); /* 75ms */
animation-duration: var(--duration-150); /* 150ms */
animation-duration: var(--duration-300); /* 300ms */
animation-duration: var(--duration-500); /* 500ms */
```

## Best Practices

### 1. Use Semantic Color Names

```html
<!-- ✅ Good -->
<button class="bg-destructive text-destructive-foreground">Delete</button>

<!-- ❌ Avoid -->
<button class="bg-red-600 text-white">Delete</button>
```

### 2. Follow Typography Hierarchy

```html
<!-- ✅ Good - Clear hierarchy -->
<h1 class="display-lg">Page Title</h1>
<h2 class="headline-xl">Section Title</h2>
<h3 class="headline-lg">Subsection</h3>
<p class="body-md">Body content</p>

<!-- ❌ Avoid - Mixed hierarchy -->
<h1 class="text-sm">Page Title</h1>
<p class="text-4xl">Body content</p>
```

### 3. Consistent Spacing

```html
<!-- ✅ Good - Consistent spacing scale -->
<div class="space-y-6">
  <div class="p-4">Item 1</div>
  <div class="p-4">Item 2</div>
</div>

<!-- ❌ Avoid - Arbitrary spacing -->
<div class="space-y-[13px]">
  <div class="p-[17px]">Item 1</div>
</div>
```

### 4. Responsive Typography

```html
<!-- ✅ Good - Responsive scaling built-in -->
<h1 class="display-lg">Responsive Headline</h1>

<!-- ✅ Also good - Manual responsive scaling -->
<h1 class="text-4xl lg:text-6xl">Manual Responsive</h1>
```

### 5. Dark Mode Considerations

```html
<!-- ✅ Good - Uses semantic colors that adapt -->
<div class="bg-card text-card-foreground">
  Content that works in both themes
</div>

<!-- ❌ Avoid - Hard-coded colors -->
<div class="bg-white text-black">Content that breaks in dark mode</div>
```

### 6. Accessibility

```html
<!-- ✅ Good - Proper focus management -->
<button class="focus-ring btn-base">Accessible Button</button>

<!-- ✅ Good - Sufficient color contrast -->
<div class="bg-muted text-muted-foreground">Text with proper contrast</div>
```

### 7. Animation Performance

```html
<!-- ✅ Good - Use transform and opacity -->
<div class="scale-in">Performant animation</div>

<!-- ❌ Avoid - Animating layout properties -->
<div class="animate-[width_300ms]">Layout thrashing</div>
```

## Design Token Reference

### Colors

- **Background**: `--background`, `--foreground`
- **Primary**: `--primary`, `--primary-foreground`
- **Secondary**: `--secondary`, `--secondary-foreground`
- **Muted**: `--muted`, `--muted-foreground`
- **Accent**: `--accent`, `--accent-foreground`
- **Status**: `--destructive`, `--success`, `--warning`, `--info`
- **Surface**: `--card`, `--popover`, `--border`, `--input`, `--ring`

### Typography

- **Font Families**: `--font-sans`, `--font-mono`, `--font-serif`
- **Font Sizes**: `--font-size-xs` through `--font-size-9xl`
- **Line Heights**: `--line-height-none` through `--line-height-loose`
- **Letter Spacing**: `--letter-spacing-tighter` through `--letter-spacing-widest`
- **Font Weights**: `--font-weight-thin` through `--font-weight-black`

### Spacing

- **Scale**: `--spacing-px` through `--spacing-96`
- **Radius**: `--radius-none` through `--radius-full`
- **Shadows**: `--shadow-sm` through `--shadow-2xl`

### Animation

- **Durations**: `--duration-75` through `--duration-1000`
- **Timing Functions**: `--ease-linear`, `--ease-in`, `--ease-out`, `--ease-in-out`

This design system provides a solid foundation for building consistent, accessible, and beautiful user interfaces. Remember to always consider the user experience and accessibility when implementing these patterns.
