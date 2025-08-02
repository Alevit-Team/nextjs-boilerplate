# Next.js Boilerplate

A modern Next.js boilerplate with TypeScript, TailwindCSS, and essential development tools.

## 🚀 Quick Setup

1. **Clone and install dependencies:**

   ```bash
   git clone <your-repo-url>
   cd nextjs-boilerplate
   pnpm install
   ```

2. **Start development server:**

   ```bash
   pnpm dev
   ```

3. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 What's Included

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Radix UI** components
- **Lucide React** icons
- **ESLint & Prettier** for code quality

## 🛠️ Development Commands

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

## 📁 Project Structure

```
src/
├── app/           # App Router pages and layouts
├── components/    # Reusable React components
│   └── ui/        # UI components (buttons, etc.)
└── lib/           # Utility functions
```

## 🔧 Maintenance

- **Update dependencies:** `pnpm update`
- **Check for outdated packages:** `pnpm outdated`
- **Format code:** `pnpm format` (runs automatically on save)
- **Lint code:** `pnpm lint` (runs before commits)

## 🚀 Deployment

Deploy easily on [Vercel](https://vercel.com/new) or any hosting platform that supports Node.js.

```bash
pnpm build    # Build for production
pnpm start    # Start production server
```
