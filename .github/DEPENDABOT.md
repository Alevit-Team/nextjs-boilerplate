# Dependabot Configuration Documentation

This document explains the Dependabot setup for this Next.js project, highlighting the latest features and best practices implemented.

## Overview

Our Dependabot configuration uses the latest features available in 2024/2025 to maintain dependencies efficiently while minimizing noise and ensuring stability.

## Key Features Implemented

### 🚀 Latest Dependabot Features Used

#### 1. **Dependency Groups** (Latest Feature)

- **Frontend Group**: Groups React, Next.js, TypeScript, and development tools
- **UI/Styling Group**: Groups Radix UI, Tailwind CSS, and related styling dependencies
- **Major Updates Group**: Separates major version updates for careful review

#### 2. **Cooldown Periods** (New Feature)

- **Default**: 7 days cooldown for most dependencies
- **Major Updates**: 30 days cooldown to allow proper testing
- **Minor Updates**: 7 days cooldown
- **Patch Updates**: 3 days cooldown for faster security fixes

#### 3. **Advanced Scheduling**

- **Weekly Updates**: Every Monday at 9:00 AM UTC
- **GitHub Actions**: Separate schedule on Mondays at 10:00 AM UTC
- **Timezone Aware**: Explicit UTC timezone configuration

### 📦 Package Ecosystems Configured

#### NPM Ecosystem

- **Package Manager**: Supports pnpm (via npm ecosystem)
- **Directory**: Root directory (`/`)
- **Versioning Strategy**: `increase-if-necessary` (preserves existing constraints when possible)
- **Dependencies**: Both direct and indirect dependencies monitored

#### GitHub Actions Ecosystem

- **Workflow Files**: Monitors `.github/workflows/` directory
- **Auto-updates**: Action versions in workflow files
- **Grouping**: All action updates grouped together

### 🎯 Smart Dependency Management

#### Dependency Groups Benefits

1. **Reduced PR Noise**: Related dependencies updated together
2. **Easier Review**: Logically grouped changes
3. **Faster Merging**: Less context switching between similar updates

#### Update Type Segregation

- **Patch & Minor**: Grouped together for safer automatic updates
- **Major Updates**: Separate PRs requiring manual review
- **Security Updates**: Still processed immediately (not affected by cooldown)

### 🛡️ Safety Measures

#### Ignore Patterns

- **Beta/Canary Versions**: React 18+ and 19+ pre-release versions ignored
- **Major Version Control**: Critical packages (Next.js, TypeScript) major updates handled separately

#### Rate Limiting

- **NPM Dependencies**: Max 10 open PRs
- **GitHub Actions**: Max 5 open PRs
- **Prevents**: Repository flooding with update PRs

### 📝 Commit & PR Customization

#### Commit Messages

- **Prefix**: `deps` for dependencies, `deps-dev` for dev dependencies, `ci` for actions
- **Scope**: Includes dependency type in commit message
- **Format**: `deps: update frontend dependencies`

#### Labels

- **Automatic Labeling**: `dependencies`, `javascript`, `github-actions`, `ci`
- **Better Organization**: Easy filtering and automation

## Configuration Details

### Weekly Schedule Rationale

- **Balance**: Frequent enough for security, not overwhelming
- **Timing**: Monday morning (UTC) aligns with start of work week
- **Predictable**: Consistent schedule for team planning

### Cooldown Strategy

```yaml
cooldown:
  default-days: 7 # Standard updates
  semver-major-days: 30 # Major versions need more testing time
  semver-minor-days: 7 # Minor versions relatively safe
  semver-patch-days: 3 # Security patches should be fast
```

### Dependency Groups Strategy

```yaml
# Example: Frontend group
frontend:
  applies-to: version-updates
  patterns:
    - 'react*'
    - 'next*'
    - '@types/react*'
    - 'typescript'
    - 'eslint*'
    - 'prettier*'
  update-types:
    - 'minor'
    - 'patch'
```

## Benefits for This Project

### 1. **Pnpm Workspace Support**

- Configuration works seamlessly with pnpm workspaces
- Handles monorepo-style dependency management

### 2. **Next.js Optimized**

- Groups Next.js with related React dependencies
- Separates framework updates from UI library updates

### 3. **TypeScript Project Ready**

- Groups TypeScript with related type definitions
- Handles `@types/*` packages appropriately

### 4. **Modern UI Stack**

- Tailwind CSS and Radix UI grouped together
- Lucide React icons included in UI group

## Monitoring and Maintenance

### Checking Dependabot Status

1. Visit repository **Insights** → **Dependency graph** → **Dependabot** tab
2. View last check times and configuration status
3. Monitor for any configuration errors

### Manual Triggers

- Push changes to `dependabot.yml` triggers immediate check
- Use repository **Insights** → **Dependency graph** → **Dependabot** → **Check for updates**

### Troubleshooting

- Check GitHub Security tab for any Dependabot errors
- Verify pnpm workspace configuration doesn't conflict
- Review ignored patterns if expected updates are missing

## Future Enhancements

### Planned Improvements

1. **Multi-ecosystem Groups**: When feature becomes stable
2. **Custom Registries**: If private packages are added
3. **Security-only Mode**: For production branches

### Monitoring Opportunities

1. **PR Metrics**: Track merge rates and update frequency
2. **Security Response**: Monitor time-to-merge for security updates
3. **Dependency Health**: Regular audits of dependency age and vulnerabilities

## Best Practices Followed

✅ **Latest Dependabot Features**: Using 2024/2025 feature set  
✅ **Reduced PR Noise**: Smart grouping strategy  
✅ **Security First**: Fast patch updates, slower major updates  
✅ **Team Workflow**: Predictable Monday morning updates  
✅ **Customized for Stack**: Next.js + TypeScript + Tailwind optimized  
✅ **Workspace Compatible**: Works with pnpm workspaces  
✅ **Documentation**: Comprehensive setup documentation

## Related Files

- `.github/dependabot.yml` - Main configuration file
- `package.json` - Dependencies monitored
- `pnpm-workspace.yaml` - Workspace configuration
- `.github/workflows/` - GitHub Actions monitored (when created)

---

_This configuration follows GitHub's latest Dependabot best practices and includes the newest features available as of 2024/2025._
