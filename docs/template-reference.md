# Next.js Boilerplate

A modern, production-ready Next.js boilerplate with TypeScript, TailwindCSS, and essential development tools. Perfect for rapid application development and team projects.

## 🚀 Create a Project from this Template

```bash
# 1 · Create a brand-new repo based on the template and clone it
gh repo create <your-new-project> \
  --template Alevit-Team/nextjs-boilerplate \
  --private --clone

# 2 · Navigate to your new project and wire the boilerplate as "upstream"
cd <your-new-project>
git remote add upstream https://github.com/Alevit-Team/nextjs-boilerplate.git
```

That's it! Your project is now ready to run:

```bash
# You're already in <your-new-project> from step 2
pnpm install           # Install dependencies
pnpm dev              # Start development server
```

Open [http://localhost:3000](http://localhost:3000) to see your new project.

## 🔄 Pull Template Updates Later

Whenever the boilerplate ships improvements:

```bash
git fetch upstream
git merge upstream/main          # or: git merge upstream/v1.3.0
```

> **Tip:** We tag stable releases (`v1.2.0`, `v1.3.0`…), so you can merge a known-good state instead of whatever is on `main`.

## ⬆️ Send Fixes Back Upstream (Optional)

If you improve something that belongs in the template:

```bash
# Commit your changes first, then
git push upstream HEAD:main    # Opens a PR on the boilerplate repo
```

## One-liner Alias (Optional Quality-of-Life)

```bash
git config alias.sync-template '!git fetch upstream && git diff --quiet HEAD upstream/main && echo "Already up to date" || git merge upstream/main --allow-unrelated-histories'
```

Now `git sync-template` pulls the latest boilerplate in one go.

---

## 📦 What's Included

- **[Next.js 15](https://nextjs.org/)** with App Router and Turbopack
- **[TypeScript](https://www.typescriptlang.org/)** for type safety
- **[TailwindCSS](https://tailwindcss.com/)** for styling
- **[Radix UI](https://www.radix-ui.com/)** components
- **[Lucide React](https://lucide.dev/)** icons
- **[ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)** for code quality
- **[mise](https://mise.jdx.dev/)** for tool version management
- **Feature-based architecture** for scalability

## 🏃 Quick Start (Alternative to Template)

If you prefer to clone directly:

```bash
git clone https://github.com/Alevit-Team/nextjs-boilerplate.git my-project
cd my-project
pnpm install
pnpm dev
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` folder:

- Template Usage – Using this repo as a template
- Getting Started – Complete setup guide
- Project Structure – Architecture and organization
- Development Guide – Development workflow and tools
- Deployment Guide – Production deployment

## 🛠️ Development Commands

```bash
pnpm dev      # Start development server with Turbopack
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run linting
pnpm format   # Format code with Prettier
```

## 🔧 Tool Version Management

This project uses mise to automatically manage Node.js and pnpm versions:

- Node.js: 22.18.0
- pnpm: 10.14.0

See the Getting Started guide for mise installation instructions.

## 🏗️ Project Structure

```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # Reusable React components
│   └── ui/        # UI components (buttons, etc.)
└── lib/           # Utility functions
```

This follows a feature-based architecture designed to scale from simple projects to complex applications.

## 🚀 Deploy

Deploy easily to any hosting platform that supports Node.js:

**Vercel (Recommended):**

- Connect your GitHub repository to Vercel
- Automatic deployment on every push

**Other platforms:**

- Build: `pnpm build`
- Start: `pnpm start`
- Port: `3000`

## 🤝 Contributing

We welcome contributions to improve this boilerplate!

## 📄 License

MIT
