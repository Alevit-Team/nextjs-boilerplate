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
