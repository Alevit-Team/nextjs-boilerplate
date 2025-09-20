# 🚀 Getting Started

This guide will help you set up and start developing with the Next.js boilerplate.

## Prerequisites

- **Node.js 22.18.0+** (managed automatically with mise)
- **pnpm 10.14.0+** (managed automatically with mise)
- **Git** for version control

## 🔧 Tool Version Management

This project uses [mise](https://mise.jdx.dev/) to automatically manage Node.js and pnpm versions. The tool versions are defined in `.mise.toml` and will be automatically installed when you navigate to the project directory.

### Installing mise

Choose the installation method for your platform:

#### Quick Install (Linux/macOS)

```bash
curl https://mise.run | sh
```

#### Platform-Specific Installation

**macOS:**

```bash
# Via Homebrew (recommended)
brew install mise

# Via MacPorts
sudo port install mise
```

**Linux (Debian/Ubuntu):**

```bash
sudo apt update -y && sudo apt install -y gpg sudo wget curl
sudo install -dm 755 /etc/apt/keyrings
wget -qO - https://mise.jdx.dev/gpg-key.pub | gpg --dearmor | sudo tee /etc/apt/keyrings/mise-archive-keyring.gpg 1> /dev/null
echo "deb [signed-by=/etc/apt/keyrings/mise-archive-keyring.gpg arch=amd64] https://mise.jdx.dev/deb stable main" | sudo tee /etc/apt/sources.list.d/mise.list
sudo apt update
sudo apt install -y mise
```

**Windows:**

```powershell
# Via WinGet (recommended)
winget install jdx.mise

# Via Scoop
scoop install mise

# Via Chocolatey
choco install mise
```

### Activate mise in your shell

After installation, add mise to your shell:

**Bash:**

```bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc
```

**Zsh:**

```bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
```

**PowerShell (Windows):**

```powershell
Add-Content $PROFILE 'mise activate pwsh | Out-String | Invoke-Expression'
```

### Using mise with this project

Once mise is installed and activated:

1. **Navigate to the project directory** - mise will automatically install the required Node.js and pnpm versions
2. **Verify installation:**
   ```bash
   mise doctor  # Check for any issues
   node -v      # Should show Node.js 22.18.0
   pnpm -v      # Should show pnpm 10.14.0
   ```

## 📦 Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start Docker services (PostgreSQL & Redis):**

   ```bash
   pnpm docker:up
   ```

4. **Set up database:**

   ```bash
   pnpm db:push     # Push schema to database
   pnpm db:seed     # Seed with sample data (optional)
   ```

5. **Start development server:**

   ```bash
   pnpm dev
   ```

6. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

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

## 📁 Project Overview

This boilerplate includes:

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **TailwindCSS v4** with inline configuration
- **Radix UI** components with shadcn/ui
- **Lucide React** icons
- **Drizzle ORM** for database management
- **PostgreSQL** database with Docker
- **Redis** for caching and sessions
- **Authentication system** with OAuth support
- **ESLint & Prettier** for code quality
- **Husky** for Git hooks

## 🔍 What's Included

### Core Technologies

- **[Next.js 15](https://nextjs.org/):** React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/):** Static type checking
- **[TailwindCSS](https://tailwindcss.com/):** Utility-first CSS framework
- **[Turbopack](https://turbo.build/pack):** Fast bundler for development

### UI Components

- **[Radix UI](https://www.radix-ui.com/):** Unstyled, accessible components
- **[Lucide React](https://lucide.dev/):** Beautiful & consistent icons
- **[Class Variance Authority](https://cva.style/):** Component variant management
- **[clsx](https://github.com/lukeed/clsx):** Conditional className utility

### Development Tools

- **[ESLint](https://eslint.org/):** Code linting
- **[Prettier](https://prettier.io/):** Code formatting
- **[Husky](https://typicode.github.io/husky/):** Git hooks
- **[mise](https://mise.jdx.dev/):** Tool version management

## 🏗️ Basic Project Structure

```
src/
├── app/           # Next.js App Router with route groups
│   ├── (back-end)/    # API routes
│   └── (front-end)/   # Frontend pages and layouts
├── auth/          # Authentication system
├── components/    # Reusable React components
│   ├── ui/        # UI components (buttons, etc.)
│   └── layout/    # Layout components
├── db/            # Database schema and migrations
├── env/           # Environment configuration
└── lib/           # Utility functions and services
```

For detailed structure information, see [Project Structure](./project-structure.md).

## 🎯 Next Steps

1. **Explore the codebase:** Familiarize yourself with the project structure
2. **Add your content:** Replace the default page content in `src/app/page.tsx`
3. **Create components:** Use the existing patterns in `src/components/`
4. **Configure styling:** Customize TailwindCSS in `tailwind.config.ts`
5. **Set up your development environment:** Configure your editor for TypeScript and Prettier

## 🆘 Troubleshooting

### mise Issues

If mise doesn't automatically install the correct versions:

```bash
# Force installation of tools
mise install

# Check what mise is managing
mise list

# Verify mise is working
mise doctor
```

### Development Server Issues

If the development server won't start:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Start development server
pnpm dev
```

### TypeScript Errors

If you see TypeScript errors:

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript server in VS Code
# Command Palette: "TypeScript: Restart TS Server"
```

Need more help? Check the [Development Guide](./development.md) for advanced configuration and troubleshooting.
