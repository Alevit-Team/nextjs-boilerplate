# 📁 Project Structure

This project follows a **feature-based architecture** with Next.js 13+ App Router. This guide explains the current structure and recommended patterns for scaling your application.

## Current Structure

```
nextjs-boilerplate/
├── .mise.toml              # Tool version management
├── package.json            # Dependencies and scripts
├── next.config.ts          # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── components.json        # Shadcn/ui configuration
├── drizzle.config.ts      # Database configuration
├── docker-compose.yml     # Docker services
├── docs/                  # Documentation (you are here)
└── src/
    ├── app/               # Next.js App Router
    │   ├── (back-end)/    # API routes group
    │   │   └── api/       # API endpoints
    │   │       ├── health/
    │   │       ├── oauth/
    │   │       └── users/
    │   ├── (front-end)/   # Frontend routes group
    │   │   ├── (auth)/    # Authentication pages
    │   │   │   ├── sign-in/
    │   │   │   ├── sign-up/
    │   │   │   ├── forgot-password/
    │   │   │   ├── reset-password/
    │   │   │   └── verify-email/
    │   │   ├── (protected)/ # Protected pages
    │   │   │   ├── admin/
    │   │   │   └── profile/
    │   │   ├── (sample-pages)/ # Demo pages
    │   │   │   ├── design-system-demo/
    │   │   │   └── sample-components/
    │   │   ├── layout.tsx   # Root layout component
    │   │   ├── page.tsx     # Home page
    │   │   ├── globals.css  # Global styles & design tokens
    │   │   └── favicon.ico  # App favicon
    │   └── middleware.ts    # Next.js middleware
    ├── auth/              # Authentication system
    │   ├── core/          # Core auth logic
    │   └── nextjs/        # Next.js auth components
    ├── components/        # Reusable UI components
    │   ├── ui/           # Basic UI components
    │   ├── layout/       # Layout components
    │   └── index.ts      # Barrel exports
    ├── db/               # Database layer
    │   ├── migrations/   # Database migrations
    │   ├── schema.ts     # Database schema
    │   └── seed.ts       # Database seeding
    ├── env/              # Environment configuration
    │   ├── server.ts     # Server-side env vars
    │   └── client.ts     # Client-side env vars
    └── lib/              # Shared utilities
        ├── services/     # Business logic services
        ├── redis/        # Redis client & services
        └── utils.ts      # Utility functions
```

## Recommended Expanded Structure

As your project grows, follow this feature-based architecture:

```
src/
├── app/                   # Next.js 13+ App Router
│   ├── (auth)/           # Route groups for organization
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── api/              # API routes
│   │   └── auth/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── loading.tsx       # Global loading UI
│   ├── error.tsx         # Global error boundary
│   ├── not-found.tsx     # 404 page
│   └── globals.css       # Global styles
│
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── modal.tsx
│   ├── layout/          # Layout-specific components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   └── sidebar.tsx
│   └── index.ts         # Barrel exports
│
├── features/            # Domain-specific modules
│   ├── auth/
│   │   ├── components/  # Auth-specific UI components
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── hooks/       # Auth-specific hooks
│   │   │   ├── use-auth.ts
│   │   │   └── use-login.ts
│   │   ├── services/    # Auth business logic
│   │   │   └── auth-service.ts
│   │   └── types.ts     # Auth-specific types
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types.ts
│   └── user/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types.ts
│
├── lib/                 # Shared libraries and helpers
│   ├── api/            # API clients and helpers
│   │   ├── client.ts
│   │   └── types.ts
│   ├── auth/           # Authentication utilities
│   │   ├── config.ts
│   │   └── providers.tsx
│   ├── database/       # Database utilities (if using)
│   │   └── prisma.ts
│   ├── validations/    # Schema validations
│   │   └── auth.ts
│   └── utils.ts        # General utility functions
│
├── hooks/              # Global reusable hooks
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── index.ts        # Barrel exports
│
├── services/           # Global business logic services
│   ├── api-service.ts
│   ├── analytics-service.ts
│   └── notification-service.ts
│
├── store/              # Global state management
│   ├── auth-store.ts   # Zustand, Redux, etc.
│   ├── ui-store.ts
│   └── index.ts
│
├── types/              # Global TypeScript types
│   ├── api.ts
│   ├── auth.ts
│   └── index.ts        # Barrel exports
│
├── constants/          # App-wide constants
│   ├── api.ts          # API endpoints
│   ├── routes.ts       # Application routes
│   ├── config.ts       # App configuration
│   └── index.ts        # Barrel exports
│
├── assets/             # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── middleware.ts       # Next.js middleware
```

## File Naming Conventions

Follow these naming conventions throughout the project:

### Universal Rule: kebab-case for ALL files

```
✅ DO:
component-name.tsx
user-service.ts
use-auth-hook.ts
api-client.ts

❌ DON'T:
ComponentName.tsx
userService.ts
useAuthHook.ts
ApiClient.ts
```

### Component Files

```typescript
// ✅ File: product-card.tsx
export const ProductCard = () => {
  return <div>Product Card</div>;
};

// ✅ File: modal.tsx
export const Modal = () => {
  return <div>Modal</div>;
};
```

### Hook Files

```typescript
// ✅ File: use-auth.ts
export const useAuth = () => {
  // Hook logic
};

// ✅ File: use-product-filters.ts
export const useProductFilters = () => {
  // Hook logic
};
```

### Service Files

```typescript
// ✅ File: user-service.ts
export const userService = {
  getUser: () => {},
  updateUser: () => {},
};

// ✅ File: api-service.ts
export const apiService = {
  get: () => {},
  post: () => {},
};
```

## Key Architecture Principles

### 1. Feature-First Organization

Group by business domain, not technical type:

```
✅ DO: Feature-based
src/features/auth/
├── components/
├── hooks/
├── services/
└── types.ts

❌ DON'T: Technology-based
src/
├── components/auth/
├── hooks/auth/
├── services/auth/
└── types/auth/
```

### 2. Separation of Concerns

- **Components**: Pure UI presentation
- **Hooks**: Stateful logic and side effects
- **Services**: Business logic and API calls
- **Types**: TypeScript definitions

### 3. Barrel Exports

Use `index.ts` files for clean imports:

```typescript
// src/components/ui/index.ts
export { Button } from './button';
export { Input } from './input';
export { Card } from './card';

// Usage
import { Button, Card } from '@/components/ui';
```

### 4. Path Aliases

Configure TypeScript paths for clean imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

## Next.js App Router Conventions

### Required Files

These files have special meaning in Next.js:

```
app/
├── layout.tsx       # Layout wrapper
├── page.tsx         # Route page
├── loading.tsx      # Loading UI
├── error.tsx        # Error boundary
├── not-found.tsx    # 404 page
└── route.ts         # API route
```

### Route Organization

```
app/
├── (auth)/          # Route groups (doesn't affect URL)
│   ├── login/
│   └── register/
├── dashboard/
│   ├── settings/
│   └── profile/
├── products/
│   └── [id]/        # Dynamic routes
└── api/
    ├── auth/
    └── products/
```

## Component Categories

### UI Components (`src/components/ui/`)

Basic, reusable UI primitives:

- `button.tsx` - Button component
- `input.tsx` - Input field
- `card.tsx` - Card container
- `modal.tsx` - Modal dialog

### Layout Components (`src/components/layout/`)

Layout-specific components:

- `header.tsx` - Site header
- `footer.tsx` - Site footer
- `navigation.tsx` - Main navigation
- `sidebar.tsx` - Sidebar component

### Feature Components (`src/features/*/components/`)

Domain-specific components:

- `auth/components/login-form.tsx`
- `user/components/user-profile.tsx`
- `product/components/product-card.tsx`

## Scaling Guidelines

### When to Create a New Feature

Create a new feature directory when you have:

- 3+ related components
- Specific business logic
- Unique data types
- Dedicated API endpoints

### When to Extract to `/lib`

Move utilities to `/lib` when they're:

- Used by 3+ features
- Framework-agnostic
- Pure functions
- Configuration objects

### When to Create Global Services

Create global services for:

- Cross-feature functionality
- External API integrations
- Caching strategies
- Analytics tracking

## Best Practices

1. **Keep features self-contained** - Each feature should work independently
2. **Use TypeScript everywhere** - Define types for all data structures
3. **Prefer composition over inheritance** - Build complex components from simple ones
4. **Keep components small** - Single responsibility principle
5. **Use barrel exports** - Clean import statements
6. **Follow naming conventions** - Consistent kebab-case files
7. **Document complex logic** - Add comments for business rules
8. **Test feature boundaries** - Unit test services and hooks

## Examples

### Feature Structure Example

```typescript
// src/features/product/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

// src/features/product/services/product-service.ts
export const productService = {
  async getProducts(): Promise<Product[]> {
    // API call logic
  },
};

// src/features/product/hooks/use-products.ts
export const useProducts = () => {
  // Hook logic using productService
};

// src/features/product/components/product-list.tsx
export const ProductList = () => {
  const { products } = useProducts();
  // Component logic
};
```

### Clean Imports Example

```typescript
// With barrel exports
import { Button, Card, Input } from '@/components/ui';
import { useAuth, useProducts } from '@/features/auth/hooks';
import { apiService } from '@/services';

// Instead of
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useProducts } from '@/features/auth/hooks/use-products';
import { apiService } from '@/services/api-service';
```

This structure provides a solid foundation that scales from simple projects to complex applications while maintaining clean, organized code.
