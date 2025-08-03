# 🛠️ Development Guide

This guide covers development workflows, tools, and best practices for working with this Next.js boilerplate.

## Development Commands

### Core Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Format code with Prettier
pnpm format
```

### Advanced Commands

```bash
# Install new dependency
pnpm add <package-name>

# Install dev dependency
pnpm add -D <package-name>

# Update all dependencies
pnpm update

# Check for outdated packages
pnpm outdated

# Remove unused dependencies
pnpm prune

# Check project health
mise doctor
```

## Development Tools

### mise - Tool Version Management

This project uses [mise](https://mise.jdx.dev/) to ensure consistent tool versions across all environments.

**Configuration:** `.mise.toml`

```toml
[tools]
node = "22.18.0"
pnpm = "10.14.0"
```

**Useful mise commands:**

```bash
# Show current tool versions
mise current

# Install all tools for project
mise install

# Update tools to latest versions
mise upgrade

# Check for issues
mise doctor
```

### TypeScript

**Configuration:** `tsconfig.json`

Key features:

- Strict mode enabled
- Path aliases configured (`@/*`)
- Next.js optimizations
- Incremental compilation

**Useful TypeScript commands:**

```bash
# Check types without compilation
npx tsc --noEmit

# Watch mode for type checking
npx tsc --noEmit --watch
```

### ESLint

**Configuration:** `eslint.config.mjs`

Features:

- Next.js recommended rules
- TypeScript support
- Prettier integration
- Custom rules for consistency

**Run linting:**

```bash
# Check all files
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix

# Lint specific files
npx eslint src/components/**/*.tsx
```

### Prettier

**Configuration:** `prettier.config.mjs`

Features:

- TailwindCSS class sorting
- Consistent formatting
- Automatic formatting on save

**Run formatting:**

```bash
# Format all files
pnpm format

# Check formatting without fixing
npx prettier --check .

# Format specific files
npx prettier --write src/app/page.tsx
```

### TailwindCSS

**Configuration:** `tailwind.config.ts`

Features:

- CSS variables for theming
- Custom animations
- Responsive design utilities
- Dark mode support (ready to enable)

**Useful commands:**

```bash
# Build CSS and watch for changes
npx tailwindcss -i ./src/app/globals.css -o ./dist/output.css --watch

# Generate Tailwind classes for autocomplete
npx tailwindcss --init
```

## Development Workflow

### 1. Starting Development

```bash
# Navigate to project
cd your-project

# Install dependencies (if not done)
pnpm install

# Start development server
pnpm dev
```

### 2. Creating New Components

Follow the established patterns:

```bash
# Create a new UI component
touch src/components/ui/new-component.tsx

# Create a feature component
mkdir -p src/features/feature-name/components
touch src/features/feature-name/components/feature-component.tsx
```

**Component template:**

```typescript
// src/components/ui/new-component.tsx
import { cn } from '@/lib/utils';

interface NewComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const NewComponent = ({
  className,
  children
}: NewComponentProps) => {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  );
};
```

### 3. Adding New Pages

```bash
# Create a new page in app router
mkdir src/app/new-page
touch src/app/new-page/page.tsx
```

**Page template:**

```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">New Page</h1>
    </div>
  );
}
```

### 4. Adding Dependencies

```bash
# Add a new dependency
pnpm add <package-name>

# Update package.json and install
pnpm install

# Commit the changes
git add package.json pnpm-lock.yaml
git commit -m "Add <package-name> dependency"
```

## Code Quality

### Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) for Git hooks:

- **pre-commit:** Runs linting and formatting
- **commit-msg:** Validates commit message format

**Setup Husky:**

```bash
# Install Husky (done automatically with pnpm install)
pnpm prepare

# Add a new hook
npx husky add .husky/pre-push "pnpm build"
```

### Code Style Guidelines

1. **Use TypeScript for everything** - Avoid `any` types
2. **Follow naming conventions** - kebab-case for files, PascalCase for components
3. **Prefer functional components** - Use hooks for state management
4. **Keep components small** - Single responsibility principle
5. **Use Tailwind classes** - Avoid custom CSS when possible
6. **Write descriptive commit messages** - Follow conventional commits

### Type Safety

```typescript
// ✅ DO: Define clear interfaces
interface UserProps {
  id: string;
  name: string;
  email: string;
}

// ✅ DO: Use proper return types
const getUser = async (id: string): Promise<UserProps> => {
  // Implementation
};

// ❌ DON'T: Use any
const userData: any = await getUser();

// ✅ DO: Use type guards
const isUser = (obj: unknown): obj is UserProps => {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
};
```

## Environment Configuration

### Environment Variables

Create `.env.local` for local development:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=postgresql://user:password@localhost:5432/db
NEXTAUTH_SECRET=your-secret-key
```

**Usage in code:**

```typescript
// Public variables (accessible in browser)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Server-side only variables
const dbUrl = process.env.DATABASE_URL;
```

### Next.js Configuration

**File:** `next.config.ts`

```typescript
const nextConfig = {
  // Enable experimental features
  experimental: {
    turbo: {
      loaders: {
        // Custom loaders
      },
    },
  },
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};
```

## Performance Optimization

### Development Performance

```bash
# Use Turbopack for faster builds
pnpm dev --turbo

# Analyze bundle size
npx @next/bundle-analyzer
```

### Code Splitting

```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('@/components/heavy-component'),
  { loading: () => <p>Loading...</p> }
);
```

### Image Optimization

```typescript
import Image from 'next/image';

// Optimized images
<Image
  src="/hero-image.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority // For above-the-fold images
/>
```

## Testing Setup

### Add Testing Libraries

```bash
# Install testing dependencies
pnpm add -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Create test setup
touch jest.config.js
touch jest.setup.js
```

### Test Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

## Debugging

### Next.js Debugging

```bash
# Debug mode
NODE_OPTIONS='--inspect' pnpm dev

# Verbose logging
DEBUG=* pnpm dev
```

### VS Code Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

## Troubleshooting

### Common Issues

**1. TypeScript errors after adding dependencies**

```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

**2. Styling not updating**

```bash
# Clear browser cache or use hard refresh
# Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

**3. mise version issues**

```bash
# Reinstall tools
mise install --force
```

**4. pnpm installation issues**

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Performance Issues

**1. Slow development server**

```bash
# Use Turbopack
pnpm dev --turbo

# Check for large dependencies
npx bundlephobia <package-name>
```

**2. Memory issues**

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm dev
```

## Maintenance

### Regular Maintenance Tasks

```bash
# Weekly
pnpm outdated          # Check for updates
pnpm update            # Update dependencies
pnpm lint              # Check code quality

# Monthly
npm audit              # Security audit
mise upgrade           # Update tools
```

### Dependency Updates

```bash
# Check what's outdated
pnpm outdated

# Update specific package
pnpm add package-name@latest

# Update all dependencies
pnpm update

# Check for breaking changes
npx npm-check-updates
```

### Security

```bash
# Security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Check for known issues
npx better-npm-audit audit
```

This development guide should help you maintain a productive and efficient development workflow. For deployment information, see the [Deployment Guide](./deployment.md).
