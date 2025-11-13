# EternaGuard Organization & RBAC (Role-Based Access Control) Plan

**Created:** 2025-11-13  
**Status:** Planning Phase  
**Priority:** HIGH - Foundation for multi-tenant architecture

## Overview

EternaGuard needs a multi-tenant organization structure with role-based access control (RBAC). Users belong to organizations, and their permissions are determined by their role within that organization.

## Core Concepts

### 1. System Admin
- Special user type that exists outside the organization structure
- Can create and manage organizations
- Can invite users to any organization
- Not scoped to any single organization
- Full system access

### 2. Organizations
- Tenant/company entity
- Users belong to one organization
- Data is scoped to organization (row-level security)
- Simple company information for demo purposes

### 3. Roles (within Organization)
- **Viewer** (Read-only) - Low-level employees, customer service
  - Can view most resources
  - Cannot create, edit, or delete
  - Visible to other users in the organization
  
- **Administrator** (Read/Write) - Managers, data entry
  - Can view all resources
  - Can create, edit, and delete resources
  - Manages contracts and customer data
  - Visible to other users in the organization
  
- **Auditor** (Read-only + Hidden) - Compliance, oversight
  - Can view everything
  - Cannot make any changes
  - **Invisible to other users** (stealth mode)
  - For compliance and oversight purposes

## Database Schema

### New Tables in `eternaguard` Schema

```prisma
// Organization entity
model Organization {
  id          String   @id @default(uuid()) @db.Uuid
  
  // Basic company info (keep simple for now)
  name        String
  website     String?
  location    String?  // City, State or Country
  
  // Metadata
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamptz
  
  // Relations
  users       UserProfile[]
  
  @@map("organizations")
  @@schema("eternaguard")
  @@index([name])
}

// Updated UserProfile with organization and role
model UserProfile {
  id             String        @id @default(uuid()) @db.Uuid
  userId         String        @unique @map("user_id") @db.Uuid
  
  // Profile information
  displayName    String?       @map("display_name")
  bio            String?
  avatarUrl      String?       @map("avatar_url")
  
  // Organization & Role
  organizationId String?       @map("organization_id") @db.Uuid
  organization   Organization? @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  role           String?       // 'viewer', 'administrator', 'auditor', or null for system_admin
  
  // System Admin flag
  isSystemAdmin  Boolean       @default(false) @map("is_system_admin")
  
  // EternaGuard-specific settings
  preferences    Json          @default("{}")
  
  // Metadata
  createdAt      DateTime      @default(now()) @map("created_at") @db.Timestamptz
  updatedAt      DateTime      @updatedAt @map("updated_at") @db.Timestamptz
  
  @@map("user_profiles")
  @@schema("eternaguard")
  @@index([userId])
  @@index([organizationId])
  @@index([role])
  @@index([isSystemAdmin])
}
```

### Key Design Decisions

1. **System Admin Identification**
   - `isSystemAdmin` boolean flag on UserProfile
   - System admins have `organizationId = null` and `role = null`
   - They operate outside the organization structure

2. **Organization Simplicity**
   - Only 3 fields: name, website, location
   - Enough to demonstrate concept without overwhelming
   - Easy to add more fields later

3. **Role Storage**
   - Simple string field: 'viewer', 'administrator', 'auditor'
   - Could be enum, but string is more flexible for future roles
   - Null role + isSystemAdmin = true means system admin

4. **Company Info Source**
   - Company, website, location come from Organization
   - NOT editable by regular users on their profile
   - Only system admins can edit organization info

## Implementation Priority

### Phase 1: Database Schema (Do First)
1. Create migration for `organizations` table
2. Update `user_profiles` table with organization fields
3. Add indexes for performance
4. Deploy to local and production

### Phase 2: Organization Management (System Admin Only)
1. Create organization CRUD API routes
2. Build system admin dashboard
3. Organization list/view/create/edit pages
4. User invitation system

### Phase 3: Role-Based Access Control
1. Create RBAC middleware/utilities
2. Implement permission checking functions
3. Add role-based UI rendering
4. Test all role combinations

### Phase 4: User Profile (Updated)
1. Update profile page to show organization info (read-only)
2. Remove company/website/location edit fields
3. Display user's role
4. Show organization details

## API Structure

### Organization Management (System Admin Only)

#### `POST /api/admin/organizations`
Create new organization
```typescript
Request: {
  name: string;
  website?: string;
  location?: string;
}
Response: {
  success: boolean;
  organization?: Organization;
  error?: string;
}
```

#### `GET /api/admin/organizations`
List all organizations (paginated)
```typescript
Response: {
  organizations: Organization[];
  total: number;
  page: number;
  pageSize: number;
}
```

#### `GET /api/admin/organizations/:id`
Get organization details
```typescript
Response: {
  organization: Organization;
  users: UserProfile[];  // Users in this org
}
```

#### `PUT /api/admin/organizations/:id`
Update organization
```typescript
Request: {
  name?: string;
  website?: string;
  location?: string;
}
Response: {
  success: boolean;
  organization?: Organization;
  error?: string;
}
```

#### `DELETE /api/admin/organizations/:id`
Delete organization (cascade deletes user associations)

### User Management (System Admin Only)

#### `POST /api/admin/organizations/:id/users`
Invite user to organization
```typescript
Request: {
  email: string;
  role: 'viewer' | 'administrator' | 'auditor';
  displayName?: string;
}
Response: {
  success: boolean;
  invitation?: {
    id: string;
    email: string;
    organizationId: string;
    role: string;
    expiresAt: string;
  };
  error?: string;
}
```

#### `PUT /api/admin/users/:userId/role`
Update user's role
```typescript
Request: {
  role: 'viewer' | 'administrator' | 'auditor';
}
Response: {
  success: boolean;
  user?: UserProfile;
  error?: string;
}
```

#### `PUT /api/admin/users/:userId/organization`
Move user to different organization
```typescript
Request: {
  organizationId: string;
}
Response: {
  success: boolean;
  user?: UserProfile;
  error?: string;
}
```

## RBAC Middleware & Utilities

### Permission Checking Functions

```typescript
// lib/rbac.ts

export type Role = 'viewer' | 'administrator' | 'auditor' | 'system_admin';

export type Permission = 
  | 'read'
  | 'write'
  | 'delete'
  | 'audit'
  | 'manage_organization'
  | 'manage_users';

// Role to permissions mapping
const rolePermissions: Record<Role, Permission[]> = {
  viewer: ['read'],
  administrator: ['read', 'write', 'delete'],
  auditor: ['read', 'audit'],
  system_admin: ['read', 'write', 'delete', 'audit', 'manage_organization', 'manage_users'],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function canRead(role: Role): boolean {
  return hasPermission(role, 'read');
}

export function canWrite(role: Role): boolean {
  return hasPermission(role, 'write');
}

export function canDelete(role: Role): boolean {
  return hasPermission(role, 'delete');
}

export function isSystemAdmin(profile: UserProfile): boolean {
  return profile.isSystemAdmin === true;
}

export function isAuditor(profile: UserProfile): boolean {
  return profile.role === 'auditor';
}

// Check if user can access resource in organization
export function canAccessOrganization(
  userProfile: UserProfile,
  resourceOrganizationId: string
): boolean {
  // System admins can access any organization
  if (userProfile.isSystemAdmin) return true;
  
  // Regular users can only access their own organization
  return userProfile.organizationId === resourceOrganizationId;
}
```

### API Middleware

```typescript
// lib/middleware/rbac.ts

export function requireSystemAdmin() {
  return async (req: NextRequest) => {
    const profile = await getCurrentUserProfile(req);
    
    if (!profile?.isSystemAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: System admin access required' },
        { status: 403 }
      );
    }
    
    return null; // Continue
  };
}

export function requireRole(allowedRoles: Role[]) {
  return async (req: NextRequest) => {
    const profile = await getCurrentUserProfile(req);
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userRole = profile.isSystemAdmin 
      ? 'system_admin' 
      : (profile.role as Role);
    
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }
    
    return null; // Continue
  };
}

export function requireOrganizationAccess(organizationId: string) {
  return async (req: NextRequest) => {
    const profile = await getCurrentUserProfile(req);
    
    if (!profile) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!canAccessOrganization(profile, organizationId)) {
      return NextResponse.json(
        { error: 'Forbidden: Cannot access this organization' },
        { status: 403 }
      );
    }
    
    return null; // Continue
  };
}
```

## UI Components

### System Admin Dashboard

**Route:** `/admin` (protected, system admin only)

```
┌─────────────────────────────────────────────┐
│ System Admin Dashboard                      │
├─────────────────────────────────────────────┤
│                                             │
│  Organizations                              │
│  ┌─────────────────────────────────────┐   │
│  │ [+ New Organization]                │   │
│  │                                     │   │
│  │ ┌─────────────────────────────┐    │   │
│  │ │ Acme Corp                   │    │   │
│  │ │ 15 users • Created 2 days ago│   │   │
│  │ │ [View] [Edit] [Delete]      │    │   │
│  │ └─────────────────────────────┘    │   │
│  │                                     │   │
│  │ ┌─────────────────────────────┐    │   │
│  │ │ TechStart Inc               │    │   │
│  │ │ 8 users • Created 1 week ago│    │   │
│  │ │ [View] [Edit] [Delete]      │    │   │
│  │ └─────────────────────────────┘    │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

### Organization Detail Page

**Route:** `/admin/organizations/:id`

```
┌─────────────────────────────────────────────┐
│ Acme Corp                                   │
│ [Edit Organization]                         │
├─────────────────────────────────────────────┤
│                                             │
│  Organization Details                       │
│  Name:     Acme Corp                        │
│  Website:  https://acme.com                 │
│  Location: San Francisco, CA                │
│  Created:  2025-11-11                       │
│                                             │
│  Users (15)                    [+ Invite]   │
│  ┌─────────────────────────────────────┐   │
│  │ Name          Role          Actions │   │
│  ├─────────────────────────────────────┤   │
│  │ John Doe      Administrator [Edit]  │   │
│  │ Jane Smith    Viewer        [Edit]  │   │
│  │ Bob Johnson   Auditor       [Edit]  │   │
│  │ ...                                 │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

### Updated User Profile Page

**Route:** `/profile`

```
┌─────────────────────────────────────────────┐
│ Profile                                     │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────┐  John Doe                   │
│  │  Avatar   │  john@acme.com              │
│  └───────────┘  Administrator               │
│                                             │
│  Personal Information                       │
│  Display Name: [____________]               │
│  Bio:          [____________]               │
│                                             │
│  Organization (Read-only)                   │
│  Company:   Acme Corp                       │
│  Website:   https://acme.com                │
│  Location:  San Francisco, CA               │
│                                             │
│  [Save Changes]                             │
│                                             │
└─────────────────────────────────────────────┘
```

## Row-Level Security (RLS) Considerations

Since we're using Prisma with separate schemas, we'll handle data scoping at the application level rather than database RLS policies.

### Data Scoping Rules

1. **System Admins**
   - Can query any organization's data
   - No WHERE clause restrictions

2. **Regular Users**
   - All queries must include: `WHERE organizationId = user.organizationId`
   - Enforced in API routes and Prisma queries

3. **Auditors**
   - Same data access as regular users
   - UI hides them from user lists (filtered in application)

### Example Prisma Queries

```typescript
// For regular users - always scope to their organization
const contracts = await prisma.contract.findMany({
  where: {
    organizationId: userProfile.organizationId, // CRITICAL
  },
});

// For system admins - no scoping needed
const contracts = await prisma.contract.findMany({
  // No where clause - can see all
});

// Helper function to build scoped query
function buildOrgScopedQuery<T>(
  userProfile: UserProfile,
  additionalWhere?: T
): T & { organizationId?: string } {
  if (userProfile.isSystemAdmin) {
    return additionalWhere || {} as T;
  }
  
  return {
    ...additionalWhere,
    organizationId: userProfile.organizationId,
  } as T & { organizationId: string };
}
```

## Migration Strategy

### Migration 1: Add Organizations Table

```sql
-- Create organizations table
CREATE TABLE IF NOT EXISTS "eternaguard"."organizations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "website" TEXT,
    "location" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "organizations_name_idx" ON "eternaguard"."organizations"("name");
```

### Migration 2: Update UserProfiles Table

```sql
-- Add organization and role fields to user_profiles
ALTER TABLE "eternaguard"."user_profiles"
  ADD COLUMN "organization_id" UUID,
  ADD COLUMN "role" TEXT,
  ADD COLUMN "is_system_admin" BOOLEAN NOT NULL DEFAULT false;

-- Add foreign key constraint
ALTER TABLE "eternaguard"."user_profiles"
  ADD CONSTRAINT "user_profiles_organization_id_fkey"
  FOREIGN KEY ("organization_id")
  REFERENCES "eternaguard"."organizations"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

-- Add indexes
CREATE INDEX "user_profiles_organization_id_idx" ON "eternaguard"."user_profiles"("organization_id");
CREATE INDEX "user_profiles_role_idx" ON "eternaguard"."user_profiles"("role");
CREATE INDEX "user_profiles_is_system_admin_idx" ON "eternaguard"."user_profiles"("is_system_admin");

-- Remove company, website, location from user_profiles (they're now in organizations)
-- We'll do this after testing to avoid data loss
```

## Testing Plan

### Test Scenarios

1. **System Admin**
   - [ ] Create organization
   - [ ] Edit organization
   - [ ] Delete organization
   - [ ] Invite user to organization
   - [ ] Change user's role
   - [ ] Move user between organizations
   - [ ] View all organizations
   - [ ] Access any organization's data

2. **Administrator Role**
   - [ ] View organization data
   - [ ] Create resources
   - [ ] Edit resources
   - [ ] Delete resources
   - [ ] Cannot access other organizations
   - [ ] Cannot see auditors in user list

3. **Viewer Role**
   - [ ] View organization data
   - [ ] Cannot create resources
   - [ ] Cannot edit resources
   - [ ] Cannot delete resources
   - [ ] Cannot see auditors in user list

4. **Auditor Role**
   - [ ] View all organization data
   - [ ] Cannot create resources
   - [ ] Cannot edit resources
   - [ ] Cannot delete resources
   - [ ] Invisible to other users

## Security Considerations

1. **Always verify organizationId** in API routes
2. **Never trust client-sent organizationId** - always get from user's profile
3. **System admin checks** must be server-side only
4. **Auditor invisibility** enforced in queries, not just UI
5. **Role changes** must be logged for audit trail (future enhancement)

## Implementation Order

1. ✅ Plan completed
2. Create Prisma migration for organizations table
3. Create Prisma migration to update user_profiles table
4. Deploy migrations to local and production
5. Create RBAC utility functions (`lib/rbac.ts`)
6. Create system admin middleware
7. Implement organization CRUD API routes
8. Build system admin dashboard UI
9. Implement user invitation system
10. Update user profile page (remove editable company fields)
11. Test all roles and permissions
12. Deploy to production

---

**Next Steps:** Create the Prisma migrations and start building the system admin functionality.

