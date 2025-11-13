# EternaGuard User Profile Page - Implementation Plan

**Created:** 2025-11-13  
**Status:** Planning Phase  
**Database:** `eternaguard.user_profiles` table (already deployed)

## Overview

Create a user profile page where authenticated users can view and edit their profile information stored in the `eternaguard.user_profiles` table.

## Database Schema (Already Deployed)

```prisma
model UserProfile {
  id          String   @id @default(uuid()) @db.Uuid
  userId      String   @unique @map("user_id") @db.Uuid
  
  // Profile information
  displayName String?  @map("display_name")
  bio         String?
  avatarUrl   String?  @map("avatar_url")
  company     String?
  website     String?
  location    String?
  
  // EternaGuard-specific settings
  preferences Json     @default("{}")
  
  // Metadata
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamptz
  
  @@map("user_profiles")
  @@schema("eternaguard")
}
```

## Page Structure

### Route: `/profile`

**Access:** Protected (requires authentication via CyberWorld OAuth)

**Layout:**
```
┌─────────────────────────────────────────────┐
│ Header (with logo, logout)                  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────┐  Profile Information        │
│  │           │                              │
│  │  Avatar   │  Display Name               │
│  │           │  Email (from auth.users)    │
│  └───────────┘                              │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ Edit Profile Form                   │   │
│  │                                     │   │
│  │ Display Name: [____________]        │   │
│  │ Bio:          [____________]        │   │
│  │               [____________]        │   │
│  │ Company:      [____________]        │   │
│  │ Website:      [____________]        │   │
│  │ Location:     [____________]        │   │
│  │                                     │   │
│  │ [Cancel] [Save Changes]             │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  Account Information                        │
│  - Member since: [date]                     │
│  - Last updated: [date]                     │
│                                             │
└─────────────────────────────────────────────┘
```

## Implementation Steps

### 1. Create Profile API Routes

**File:** `app/api/profile/route.ts`

**Endpoints:**

#### GET `/api/profile`
- Fetch the current user's profile from `eternaguard.user_profiles`
- If profile doesn't exist, create one automatically (using the trigger we set up)
- Return profile data + user data from auth

```typescript
Response: {
  profile: {
    id: string;
    displayName: string | null;
    bio: string | null;
    company: string | null;
    website: string | null;
    location: string | null;
    preferences: object;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    email: string;
    created_at: string;
  };
}
```

#### PUT `/api/profile`
- Update the current user's profile
- Validate input data
- Use Prisma to update `eternaguard.user_profiles`

```typescript
Request Body: {
  displayName?: string;
  bio?: string;
  company?: string;
  website?: string;
  location?: string;
}

Response: {
  success: boolean;
  profile?: UserProfile;
  error?: string;
}
```

### 2. Create Profile Page Components

**File:** `app/profile/page.tsx` (Server Component)
- Fetch user session
- Redirect to home if not authenticated
- Fetch profile data from API
- Render ProfileView component

**File:** `app/profile/ProfileView.tsx` (Client Component)
- Display profile information
- Handle edit mode toggle
- Form for editing profile
- Submit updates to API
- Display success/error messages

**File:** `components/ProfileAvatar.tsx` (Client Component)
- Display user avatar (placeholder for now, can add upload later)
- Show initials if no avatar

### 3. Update Navigation

**Update:** `app/page.tsx` (marketing landing page)
- Add "Profile" link in header for authenticated users

**Update:** `app/dashboard/page.tsx`
- Add "Edit Profile" link/button

**Update:** `components/LoginButton.tsx`
- Add dropdown menu with "Profile" and "Logout" options

### 4. Create Prisma Client Utilities

**File:** `lib/prisma.ts`
- Singleton Prisma Client instance
- Proper connection pooling for serverless

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**File:** `lib/profile.ts`
- Helper functions for profile operations
- `getOrCreateProfile(userId: string)`
- `updateProfile(userId: string, data: ProfileUpdateData)`

### 5. Form Validation

**File:** `lib/validation.ts`
- Validate display name (max length, no special chars)
- Validate bio (max length)
- Validate website URL format
- Validate company/location (max length)

```typescript
export const profileSchema = {
  displayName: {
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_]+$/,
  },
  bio: {
    maxLength: 500,
  },
  website: {
    pattern: /^https?:\/\/.+/,
  },
  company: {
    maxLength: 100,
  },
  location: {
    maxLength: 100,
  },
};
```

## UI/UX Considerations

### Design Consistency
- Use the same EternaGuard branding (slate/emerald color scheme)
- Match the style of the marketing page and dashboard
- Responsive design (mobile-friendly)

### User Experience
- Auto-save draft to localStorage (optional enhancement)
- Confirm before discarding changes
- Show loading states during save
- Display success/error toasts
- Optimistic UI updates

### Accessibility
- Proper form labels
- ARIA attributes
- Keyboard navigation
- Focus management
- Error announcements

## Security Considerations

1. **Authentication Check**
   - Verify user is authenticated before showing profile
   - Use middleware or page-level auth check

2. **Authorization**
   - Users can only view/edit their own profile
   - API routes must verify `userId` from session matches profile owner

3. **Input Validation**
   - Server-side validation (never trust client)
   - Sanitize all user input
   - Prevent XSS attacks

4. **Rate Limiting**
   - Limit profile update frequency (e.g., max 10 updates per minute)
   - Prevent abuse

## Future Enhancements

### Phase 2 (Future)
- [ ] Avatar upload to Supabase Storage
- [ ] Image cropping/resizing
- [ ] Social media links
- [ ] Privacy settings (public/private profile)
- [ ] Profile visibility controls

### Phase 3 (Future)
- [ ] Activity history
- [ ] Connected accounts
- [ ] Two-factor authentication settings
- [ ] Email notification preferences
- [ ] Data export (GDPR compliance)

## Testing Plan

### Manual Testing
1. **Profile Creation**
   - New user logs in → profile auto-created
   - Verify default values

2. **Profile Viewing**
   - Load profile page
   - Verify all fields display correctly
   - Check responsive layout

3. **Profile Editing**
   - Update each field individually
   - Update multiple fields at once
   - Submit empty values (should clear fields)
   - Cancel editing (should revert changes)

4. **Validation**
   - Try invalid website URL
   - Try display name with special characters
   - Try exceeding max lengths
   - Verify error messages

5. **Edge Cases**
   - No internet connection
   - API errors
   - Session expiry during edit
   - Concurrent edits (multiple tabs)

### Automated Testing (Future)
- Unit tests for validation functions
- Integration tests for API routes
- E2E tests for profile flow

## Implementation Order

1. ✅ Database schema (already done)
2. Create Prisma client utilities (`lib/prisma.ts`)
3. Create profile helper functions (`lib/profile.ts`)
4. Create validation utilities (`lib/validation.ts`)
5. Implement GET `/api/profile` endpoint
6. Implement PUT `/api/profile` endpoint
7. Create `ProfileView` component (read-only view first)
8. Add edit mode to `ProfileView`
9. Create profile page (`app/profile/page.tsx`)
10. Update navigation (add profile links)
11. Test thoroughly
12. Deploy to production

## Files to Create/Modify

### New Files
- `app/api/profile/route.ts` - Profile API endpoints
- `app/profile/page.tsx` - Profile page (server component)
- `app/profile/ProfileView.tsx` - Profile view/edit component
- `components/ProfileAvatar.tsx` - Avatar display component
- `lib/prisma.ts` - Prisma client singleton
- `lib/profile.ts` - Profile helper functions
- `lib/validation.ts` - Form validation utilities
- `docs/PROFILE_PAGE_PLAN.md` - This file

### Modified Files
- `app/page.tsx` - Add profile link for authenticated users
- `app/dashboard/page.tsx` - Add "Edit Profile" button
- `components/LoginButton.tsx` - Add profile dropdown menu

## Environment Variables

No new environment variables needed. Uses existing:
- `DATABASE_URL` - Already configured
- Session management via `lib/auth.ts` - Already implemented

## Dependencies

No new dependencies needed. Uses existing:
- `@prisma/client` - Already installed
- `next` - Already installed
- `react` - Already installed

## Notes

- The `eternaguard.create_profile_for_user()` trigger already handles automatic profile creation when a user signs up
- Profile data is completely separate from auth data (auth.users)
- Each product (eternaguard, studio, etc.) will have its own user_profiles table
- The profile page should feel like a natural extension of the EternaGuard brand

---

**Ready to implement!** Let me know when you want to start building this out.

