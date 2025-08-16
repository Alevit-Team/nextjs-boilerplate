# **APP_NAME** (Next.js Starter)

## Quick start

```bash
pnpm install
pnpm run init:project <your-app-name>
pnpm dev
```

## Upstream updates

- Weekly PRs labeled `template-sync` bring changes from `Alevit-Team/nextjs-boilerplate`.
- This template ships with a default `.templatesyncignore` excluding `docs/**` and legacy READMEs from child repos. Adjust in the child if needed.
- Optional: define an Actions secret `TEMPLATE_SYNC_TOKEN` (org-level recommended). If present, the workflow will use it; otherwise it falls back to the built-in `GITHUB_TOKEN`.

### Optional: Personal Access Token for template sync

Use a PAT only if you need broader permissions (e.g., syncing from a private upstream).

1. Create a PAT
   - Prefer a Fine‑grained PAT with:
     - Access to this repository: Contents (Read/Write), Pull requests (Read/Write)
     - Access to the upstream (if private): Contents (Read)
   - Or a classic PAT with `repo` scope.
2. Add it as a secret named `TEMPLATE_SYNC_TOKEN`
   - Recommended at the organization level; repository-level also works.
3. Enable PAT usage (optional)
   - Edit `.github/workflows/template-sync.yml` and replace the `source_gh_token: ${{ github.token }}` line with `source_gh_token: ${{ secrets.TEMPLATE_SYNC_TOKEN }}`.
   - Commit the change. The workflow will now use the PAT.

## Scripts

- dev
- build
- start
- lint
- typecheck

## Documentation

- Detailed docs live in `docs/` within this template. They are excluded from child repos by default; copy what you need.
