# 🚀 Deployment Guide

This guide covers deploying your Next.js application to various hosting platforms.

## Production Build

Before deploying, always test your production build locally:

```bash
# Build for production
pnpm build

# Start production server locally
pnpm start

# Verify it works at http://localhost:3000
```

## Deployment Platforms

### Vercel (Recommended)

[Vercel](https://vercel.com) is the easiest way to deploy Next.js applications, created by the same team that builds Next.js.

#### Quick Deploy

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Next.js and configures everything

3. **Configure build settings (if needed):**
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`
   - Output Directory: `.next`

#### Custom Configuration

Create `vercel.json` for advanced configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install",
  "devCommand": "pnpm dev",
  "outputDirectory": ".next"
}
```

#### Environment Variables

1. Go to your Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add your variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.yourapp.com
   DATABASE_URL=your-production-database-url
   NEXTAUTH_SECRET=your-production-secret
   ```

### Netlify

Deploy to [Netlify](https://netlify.com):

1. **Connect repository:**
   - Login to Netlify
   - New site from Git → Choose your repository

2. **Build settings:**

   ```
   Build command: pnpm build && pnpm export
   Publish directory: out
   ```

3. **Create `netlify.toml`:**

   ```toml
   [build]
     command = "pnpm build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"

   [build.environment]
     NPM_FLAGS = "--version"
   ```

### AWS Amplify

Deploy to [AWS Amplify](https://aws.amazon.com/amplify/):

1. **Connect repository:**
   - AWS Console → Amplify → Host web app
   - Connect your Git repository

2. **Build settings:**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install -g pnpm
           - pnpm install
       build:
         commands:
           - pnpm build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Railway

Deploy to [Railway](https://railway.app):

1. **Connect repository:**
   - Railway dashboard → New Project → From GitHub

2. **Railway will auto-detect Next.js**

3. **Environment variables:**
   - Add in Railway dashboard under Variables tab

### Digital Ocean App Platform

Deploy to [Digital Ocean](https://www.digitalocean.com/products/app-platform):

1. **Create app spec:**
   ```yaml
   name: nextjs-app
   services:
     - build_command: pnpm build
       environment_slug: node-js
       github:
         branch: main
         deploy_on_push: true
         repo: your-username/your-repo
       http_port: 3000
       instance_count: 1
       instance_size_slug: basic-xxs
       name: web
       run_command: pnpm start
       source_dir: /
   ```

## Environment Variables

### Required Environment Variables

```bash
# Public variables (accessible in browser)
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_APP_URL=https://yourapp.com

# Server-only variables
DATABASE_URL=your-database-connection-string
NEXTAUTH_SECRET=your-super-secret-key
API_SECRET_KEY=your-api-secret

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Platform-Specific Setup

**Vercel:**

- Dashboard → Project → Settings → Environment Variables

**Netlify:**

- Dashboard → Site → Site settings → Environment variables

**Railway:**

- Dashboard → Project → Variables tab

**Others:**

- Check platform documentation for environment variable setup

## Domain Configuration

### Custom Domain on Vercel

1. **Add domain:**
   - Project dashboard → Domains
   - Add your domain (e.g., `yourapp.com`)

2. **Configure DNS:**
   - Add CNAME record: `www` → `cname.vercel-dns.com`
   - Add A record: `@` → `76.76.19.61`

3. **SSL automatically handled by Vercel**

### Custom Domain on Other Platforms

Most platforms provide similar domain configuration:

- Add domain in platform dashboard
- Update DNS records as instructed
- SSL certificates are usually automatic

## Performance Optimization

### Image Optimization

```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### Caching Headers

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate',
          },
        ],
      },
    ];
  },
};
```

### Bundle Analysis

```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true pnpm build
```

## Database Deployment

### PostgreSQL Options

**Vercel Postgres:**

```bash
# Install Vercel CLI
npm install -g vercel

# Create database
vercel postgres create
```

**Railway PostgreSQL:**

- Add PostgreSQL service in Railway dashboard
- Use provided connection string

**Supabase:**

- Create project at [supabase.com](https://supabase.com)
- Use provided connection string

**PlanetScale (MySQL):**

- Create database at [planetscale.com](https://planetscale.com)
- Use provided connection string

### Database Migration

```bash
# Using Prisma (if applicable)
npx prisma migrate deploy

# Or run your migration scripts
npm run migrate
```

## Monitoring and Analytics

### Vercel Analytics

```bash
# Install Vercel Analytics
pnpm add @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Monitoring

**Sentry:**

```bash
# Install Sentry
pnpm add @sentry/nextjs

# Configure in sentry.client.config.ts
```

**LogRocket:**

```bash
# Install LogRocket
pnpm add logrocket
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Security Considerations

### Security Headers

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### Environment Security

1. **Never commit secrets to Git**
2. **Use different secrets for different environments**
3. **Regularly rotate API keys and secrets**
4. **Use platform-specific secret management**

## Deployment Checklist

### Pre-deployment

- [ ] All environment variables configured
- [ ] Database migrations ready
- [ ] Production build tested locally
- [ ] Security headers configured
- [ ] Error monitoring set up
- [ ] Analytics tracking implemented

### Post-deployment

- [ ] Domain configured and SSL working
- [ ] Database connected and accessible
- [ ] All environment variables working
- [ ] Error monitoring receiving data
- [ ] Performance monitoring active
- [ ] Backup strategy in place

### Monitoring

- [ ] Uptime monitoring configured
- [ ] Performance metrics tracked
- [ ] Error rates monitored
- [ ] Database performance monitored
- [ ] Cost monitoring enabled

## Troubleshooting

### Common Deployment Issues

**1. Build Failures:**

```bash
# Check build locally
pnpm build

# Check for TypeScript errors
npx tsc --noEmit
```

**2. Environment Variable Issues:**

```bash
# Verify environment variables are set
console.log(process.env.NEXT_PUBLIC_API_URL);
```

**3. Database Connection:**

```bash
# Test database connection
# Add temporary logging in your API routes
```

**4. Import/Export Errors:**

```bash
# Check for missing dependencies
pnpm install

# Verify import paths
```

### Platform-Specific Issues

**Vercel:**

- Check function logs in dashboard
- Verify build logs for errors
- Check environment variable configuration

**Netlify:**

- Review build logs in dashboard
- Check function limits
- Verify redirects and headers

## Support and Resources

- **Next.js Deployment Docs:** [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Railway Docs:** [docs.railway.app](https://docs.railway.app)

For more advanced deployment scenarios and custom infrastructure, consult the platform-specific documentation and consider infrastructure-as-code solutions like Terraform or AWS CDK.
