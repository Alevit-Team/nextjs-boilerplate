# 🚀 Using this Boilerplate Template

This guide shows you how to create a new project from the `Alevit-Team/nextjs-boilerplate` template, keep it in sync, and contribute improvements back upstream.

## Quick Start — Create a Project from Template

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
git config alias.sync-template '!git fetch upstream && git merge upstream/main --allow-unrelated-histories'
```

Now `git sync-template` pulls the latest boilerplate in one go.

## Why These Steps Work

1. **Template repositories** let anyone create a fresh repo with no shared Git history—perfect for boilerplates
2. The GitHub CLI's `gh repo create --template` flag performs that creation (and `--clone` pulls it locally)
3. Adding `upstream` with `git remote add` is the standard way to track the original source of a fork or template
4. A normal `git fetch` + `git merge` (or `rebase`) pulls updates whenever you want

## Alternative: Manual Template Usage

If you prefer not to use the GitHub CLI:

1. **Use GitHub's template button:**
   - Go to [Alevit-Team/nextjs-boilerplate](https://github.com/Alevit-Team/nextjs-boilerplate)
   - Click "Use this template" → "Create a new repository"
   - Fill in your repository details

2. **Clone your new repository:**

   ```bash
   git clone https://github.com/your-username/your-new-project.git
   cd your-new-project
   ```

3. **Add upstream remote:**

   ```bash
   git remote add upstream https://github.com/Alevit-Team/nextjs-boilerplate.git
   ```

4. **Install and start:**
   ```bash
   pnpm install
   pnpm dev
   ```

## Next Steps

After creating your project from the template:

1. **Read the documentation:** Check out the [Getting Started guide](./getting-started.md)
2. **Understand the structure:** Review [Project Structure](./project-structure.md)
3. **Set up development tools:** Follow the [Development Guide](./development.md)
4. **Customize for your needs:** Modify components, add features, update branding
