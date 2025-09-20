# 🗄️ Database Setup Guide

This guide covers setting up and working with the database layer in this Next.js boilerplate.

## Overview

This project uses:

- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe SQL ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Docker** - Local development environment

## Quick Start

### 1. Start Database Services

```bash
# Start PostgreSQL and Redis with Docker
pnpm docker:up

# Check services are running
pnpm docker:logs
```

### 2. Configure Environment

Create `.env.local` with database configuration:

```bash
# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/nextjs_boilerplate
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=nextjs_boilerplate

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=optional-password
REDIS_TOKEN=optional-token
```

### 3. Set Up Database Schema

```bash
# Push schema to database
pnpm db:push

# Or generate and run migrations
pnpm db:generate
pnpm db:migrate

# Seed with sample data (optional)
pnpm db:seed
```

### 4. Verify Setup

```bash
# Test database connection
pnpm db:test

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

## Database Schema

The database schema is defined in `src/db/schema.ts` using Drizzle ORM:

```typescript
// Example schema structure
import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

## Available Commands

### Database Management

```bash
# Generate new migration
pnpm db:generate

# Run pending migrations
pnpm db:migrate

# Push schema changes directly (development)
pnpm db:push

# Open Drizzle Studio
pnpm db:studio

# Seed database with sample data
pnpm db:seed

# Test database connection
pnpm db:test

# Debug environment variables
pnpm db:debug
```

### Docker Management

```bash
# Start all services
pnpm docker:up

# Stop all services
pnpm docker:down

# View logs
pnpm docker:logs

# Start services in background
docker compose up -d

# View specific service logs
docker compose logs postgres
docker compose logs redis
```

## Working with the Database

### Database Client

The database client is configured in `src/db/index.ts`:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/env/server';

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client);
```

### Example Usage

```typescript
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Create user
const newUser = await db
  .insert(users)
  .values({
    email: 'user@example.com',
    name: 'John Doe',
  })
  .returning();

// Find user by email
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, 'user@example.com'))
  .limit(1);

// Update user
await db.update(users).set({ name: 'Jane Doe' }).where(eq(users.id, userId));

// Delete user
await db.delete(users).where(eq(users.id, userId));
```

## Redis Configuration

Redis is used for caching and session storage. Configuration is in `src/lib/redis/`:

```typescript
// src/lib/redis/redis-client.ts
import Redis from 'ioredis';
import { env } from '@/env/server';

export const redis = new Redis(env.REDIS_URL, {
  password: env.REDIS_PASSWORD,
  // Additional configuration
});
```

### Redis Usage

```typescript
import { redis } from '@/lib/redis/redis-client';

// Set value with expiration
await redis.setex('key', 3600, 'value'); // 1 hour

// Get value
const value = await redis.get('key');

// Delete key
await redis.del('key');

// Set JSON data
await redis.setex('user:123', 3600, JSON.stringify(userData));

// Get JSON data
const userData = JSON.parse((await redis.get('user:123')) || '{}');
```

## Migrations

### Creating Migrations

1. **Modify schema** in `src/db/schema.ts`
2. **Generate migration**:
   ```bash
   pnpm db:generate
   ```
3. **Review generated migration** in `src/db/migrations/`
4. **Run migration**:
   ```bash
   pnpm db:migrate
   ```

### Migration Files

Migrations are stored in `src/db/migrations/` with:

- SQL migration files
- Metadata in `meta/` directory
- Journal tracking in `meta/_journal.json`

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DB=your-database

# Redis
REDIS_URL=redis://host:port
REDIS_PASSWORD=optional-password  # If Redis requires auth
REDIS_TOKEN=optional-token        # Alternative auth method
```

### Environment Validation

Environment variables are validated using `@t3-oss/env-nextjs` in:

- `src/env/server.ts` - Server-side variables
- `src/env/client.ts` - Client-side variables

## Production Deployment

### Database Providers

**Recommended providers:**

- **[Vercel Postgres](https://vercel.com/storage/postgres)** - Serverless PostgreSQL
- **[Railway](https://railway.app/)** - PostgreSQL + Redis
- **[Supabase](https://supabase.com/)** - PostgreSQL with additional features
- **[PlanetScale](https://planetscale.com/)** - MySQL alternative

### Redis Providers

**Recommended providers:**

- **[Vercel KV](https://vercel.com/storage/kv)** - Serverless Redis
- **[Upstash](https://upstash.com/)** - Serverless Redis
- **[Railway](https://railway.app/)** - Redis hosting

### Migration in Production

```bash
# Set production DATABASE_URL
export DATABASE_URL="your-production-url"

# Run migrations
pnpm db:migrate

# Or push schema (be careful in production)
pnpm db:push
```

## Troubleshooting

### Common Issues

**1. Connection refused**

```bash
# Check if Docker services are running
docker compose ps

# Restart services
pnpm docker:down
pnpm docker:up
```

**2. Migration errors**

```bash
# Reset database (development only)
pnpm docker:down
docker volume rm nextjs-boilerplate_postgres_data
pnpm docker:up
pnpm db:push
```

**3. Environment variable errors**

```bash
# Debug environment variables
pnpm db:debug

# Check if .env.local exists and has correct values
cat .env.local
```

**4. Redis connection issues**

```bash
# Test Redis connection
docker compose exec redis redis-cli ping

# Check Redis logs
docker compose logs redis
```

### Performance Tips

1. **Use connection pooling** in production
2. **Index frequently queried columns**
3. **Use Redis for caching** expensive queries
4. **Monitor query performance** with Drizzle Studio
5. **Use prepared statements** for repeated queries

## Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
