# Docker Development Setup

This project includes a complete Docker Compose setup for local development with PostgreSQL and Redis, integrated with Drizzle ORM and T3 Env for type-safe environment management.

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start the services:**

   ```bash
   pnpm docker:up
   ```

3. **Set up the database:**

   ```bash
   pnpm db:push
   pnpm db:seed
   ```

4. **Start developing:**
   ```bash
   pnpm dev
   ```

## 📦 Services

### PostgreSQL 17

- **Image:** `postgres:17-alpine`
- **Port:** `5432`
- **Database:** `nextjs_dev`
- **User:** `postgres`
- **Password:** `password`

### Redis 7

- **Image:** `redis:7-alpine`
- **Port:** `6379`
- **Persistence:** RDB snapshots enabled

## 🛠️ Available Commands

### Docker Management

```bash
pnpm docker:up      # Start PostgreSQL + Redis in background
pnpm docker:down    # Stop and remove containers
pnpm docker:logs    # View service logs
```

### Database Operations

```bash
pnpm db:generate    # Generate migrations from schema changes
pnpm db:migrate     # Apply migrations to database
pnpm db:push        # Push schema directly (development only)
pnpm db:studio      # Launch Drizzle Studio GUI
pnpm db:seed        # Seed database with sample data
```

### Direct Database Access

```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U postgres -d nextjs_dev

# Connect to Redis
docker compose exec redis redis-cli

# View PostgreSQL logs
docker compose logs postgres

# View Redis logs
docker compose logs redis
```

## 🗄️ Database Schema

The project includes a sample schema with:

- **Users table**: Basic user information
- **Posts table**: Blog posts with author relationships

### Example Usage

```typescript
import { db } from '@/db';
import { users, posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Get all users
const allUsers = await db.select().from(users);

// Get user by email
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, 'john@example.com'));

// Get posts with authors
const postsWithAuthors = await db
  .select()
  .from(posts)
  .leftJoin(users, eq(posts.authorId, users.id));
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and adjust as needed:

```bash
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/nextjs_dev"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
POSTGRES_DB="nextjs_dev"

# Redis Configuration
REDIS_URL="redis://localhost:6379"
REDIS_PASSWORD=""
```

### T3 Env Integration

Environment variables are validated using T3 Env in `src/env/server.ts`:

```typescript
import { env } from '@/env/server';

// Type-safe access to environment variables
const dbUrl = env.DATABASE_URL;
const redisUrl = env.REDIS_URL;
```

## 🔄 Migration Workflow

### Development Workflow

1. Modify schema in `src/db/schema.ts`
2. Generate migration: `pnpm db:generate`
3. Apply migration: `pnpm db:migrate`

### Quick Prototyping

For rapid development, you can push schema changes directly:

```bash
pnpm db:push
```

⚠️ **Warning:** `db:push` is destructive and should only be used in development.

## 🎨 Drizzle Studio

Launch the visual database browser:

```bash
pnpm db:studio
```

Access at: http://localhost:4983

## 🐳 Docker Details

### Volumes

- `postgres_data`: Persistent PostgreSQL data
- `redis_data`: Persistent Redis data

### Networks

- `app-network`: Bridge network for service communication

### Health Checks

Both services include health checks to ensure they're ready before your application starts.

## 🔍 Troubleshooting

### Services won't start

```bash
# Check service status
docker compose ps

# View logs
pnpm docker:logs

# Restart services
pnpm docker:down && pnpm docker:up
```

### Database connection issues

```bash
# Test PostgreSQL connection
docker compose exec postgres pg_isready -U postgres

# Test Redis connection
docker compose exec redis redis-cli ping
```

### Reset everything

```bash
# Stop services and remove volumes
docker compose down -v

# Remove all data and start fresh
pnpm docker:up
pnpm db:push
pnpm db:seed
```

## 📚 Additional Resources

- Drizzle ORM Documentation: https://orm.drizzle.team/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Redis Documentation: https://redis.io/documentation
- Docker Compose Documentation: https://docs.docker.com/compose/
