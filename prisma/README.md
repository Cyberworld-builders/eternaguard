# EternaGuard Database Schema (Prisma)

This directory contains the Prisma schema and migrations for EternaGuard-specific database tables.

## Environment Setup

### Local Development (.env.local)
```env
# Supabase (for auth, realtime, storage)
NEXT_PUBLIC_SUPABASE_URL=https://oicdjmhfzjevtjaysdhq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Prisma - Local Supabase instance
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres

# Gateway API
NEXT_PUBLIC_GATEWAY_API_URL=http://localhost:3000
```

### Production (.env.production)
```env
# Supabase (for auth, realtime, storage)
NEXT_PUBLIC_SUPABASE_URL=https://oicdjmhfzjevtjaysdhq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Prisma - Remote Supabase instance
# Get from: Supabase Dashboard → Settings → Database → Connection String (Direct connection)
DATABASE_URL=postgresql://postgres.oicdjmhfzjevtjaysdhq:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

# Gateway API
NEXT_PUBLIC_GATEWAY_API_URL=https://gateway.cyberworldbuilders.com
```

## Available Commands

### Development (Local Supabase)

```bash
# Create a new migration
npm run db:migrate:dev -- --name migration_name

# Push schema changes without creating migration (for prototyping)
npm run db:push:dev

# Open Prisma Studio to view/edit data
npm run db:studio:dev

# Generate Prisma Client
npm run db:generate
```

### Production (Remote Supabase)

```bash
# Apply migrations to production
npm run db:migrate:prod

# Push schema directly to production (use with caution)
npm run db:push:prod

# View production data
npm run db:studio:prod
```

## Workflow

### 1. Local Development

1. Start local Supabase (from gateway):
   ```bash
   cd ../gateway && npm run supabase:start
   ```

2. Create/modify schema in `schema.prisma`

3. Create migration:
   ```bash
   npm run db:migrate:dev -- --name add_new_feature
   ```

4. Test locally with Prisma Studio:
   ```bash
   npm run db:studio:dev
   ```

### 2. Deploy to Production

1. Commit migration files to git

2. Apply migrations to production:
   ```bash
   npm run db:migrate:prod
   ```

3. Verify in production (optional):
   ```bash
   npm run db:studio:prod
   ```

## Schema Overview

### UserProfile Model

Stores EternaGuard-specific user profile data. Links to Supabase `auth.users` via `userId`.

**Fields:**
- `id` - UUID primary key
- `userId` - Foreign key to `auth.users.id` (CyberWorld identity)
- `displayName` - User's display name
- `bio` - User biography
- `avatarUrl` - Profile picture URL
- `company` - Company name
- `website` - Personal website
- `location` - User location
- `preferences` - JSON object for user settings
- `createdAt` - Timestamp of profile creation
- `updatedAt` - Timestamp of last update

## Row Level Security (RLS)

Prisma respects RLS policies but doesn't create them. RLS policies are managed via SQL migrations or manually.

Current policies:
- Users can view their own profile
- Users can insert their own profile
- Users can update their own profile
- Users can delete their own profile

## Notes

- Each product (eternaguard, studio, etc.) maintains its own Prisma schema
- All products connect to the same Supabase database
- Migrations are tracked independently per product
- Always test migrations locally before deploying to production

