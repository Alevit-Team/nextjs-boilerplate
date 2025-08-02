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

## 🔧 Using mise (Recommended)

This project is configured to use [mise](https://mise.jdx.dev/) for managing tool versions (Node.js, pnpm, etc.).

### Setup with mise

1. **Install mise** (if not already installed):

   **macOS/Linux:**

   ```bash
   # Via install script
   curl https://mise.jdx.dev/install.sh | sh

   # Or via package manager
   brew install mise
   ```

   **Windows:**

   ```powershell
   # Via Scoop (recommended)
   scoop install mise

   # Or via Chocolatey
   choco install mise

   # Or via WinGet
   winget install jdx.mise

   # Manual installation: Download from GitHub releases
   # https://github.com/jdx/mise/releases
   ```

2. **Activate mise** in your shell:

   **Unix/Linux/macOS:**

   ```bash
   # For bash
   echo 'eval "$(mise activate bash)"' >> ~/.bashrc

   # For zsh
   echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

   # For fish
   echo 'mise activate fish | source' >> ~/.config/fish/config.fish
   ```

   **Windows:**

   ```powershell
   # For PowerShell
   Add-Content $PROFILE 'Invoke-Expression (&mise activate powershell)'

   # For Command Prompt (requires manual setup each session)
   # mise activate cmd
   ```

3. **Install project tools** automatically:

   ```bash
   cd nextjs-boilerplate
   mise install  # Installs Node.js 22 and pnpm automatically
   ```

4. **Run setup task**:
   ```bash
   mise run setup  # Installs dependencies and sets up the project
   ```

### mise Commands

```bash
# Install all tools defined in .mise.toml
mise install

# Run development server
mise run dev

# Build project
mise run build

# Format code
mise run format

# Show current tool versions
mise list
```

### VSCode Integration

The project includes VSCode settings for seamless mise integration:

- **Debugging**: Uses mise-managed Node.js automatically (via PATH)
- **Terminal**: Uses system PowerShell with mise activation
- **Zero setup**: Works immediately after `mise install` - no symlinks needed

**Configuration in `.vscode/settings.json`:**

- ✅ Portable across all team members
- ✅ No manual symlink creation required
- ✅ Automatic Node.js version detection via mise

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
