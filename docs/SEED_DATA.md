# EternaGuard Seed Data - Demo Organizations

**Created:** 2025-11-13  
**Purpose:** Create intuitive, memorable demo data for testing RBAC

## Organizations

### 1. Cyberdyne Systems (Terminator Universe)
**Organization:**
- Name: "Cyberdyne Systems"
- Website: "https://cyberdyne.systems"
- Location: "Los Angeles, CA"

**Users:**
- **Miles Dyson** - Administrator
  - Email: `miles.dyson@cyberdyne.systems`
  - Role: Administrator (manages Skynet development, full access)
  
- **Sarah Connor** - Auditor
  - Email: `sarah.connor@resistance.net`
  - Role: Auditor (monitoring Cyberdyne, invisible to others)
  
- **T-800** - Viewer
  - Email: `t800@cyberdyne.systems`
  - Role: Viewer (security guard, read-only access)

### 2. Weyland-Yutani Corporation (Alien/Aliens Universe)
**Organization:**
- Name: "Weyland-Yutani Corporation"
- Website: "https://weyland-yutani.corp"
- Location: "Tokyo, Japan"

**Users:**
- **Carter Burke** - Administrator
  - Email: `carter.burke@weyland-yutani.corp`
  - Role: Administrator (corporate liaison, manages operations)
  
- **Ellen Ripley** - Auditor
  - Email: `ellen.ripley@uscm.mil`
  - Role: Auditor (investigating company, invisible to Burke)
  
- **Bishop** - Viewer
  - Email: `bishop@weyland-yutani.corp`
  - Role: Viewer (synthetic, technical support, read-only)

### 3. Interdimensional Cable (Rick and Morty Universe)
**Organization:**
- Name: "Interdimensional Cable"
- Website: "https://interdimensional.cable"
- Location: "Dimension C-137"

**Users:**
- **Rick Sanchez** - Administrator
  - Email: `rick@interdimensional.cable`
  - Role: Administrator (runs the show, full access)
  
- **Morty Smith** - Viewer
  - Email: `morty@interdimensional.cable`
  - Role: Viewer (assistant, can view but not touch)
  
- **Mr. Meeseeks** - Auditor
  - Email: `meeseeks@existence.pain`
  - Role: Auditor (quality control, invisible observer)

## Role Alignment Logic

### Administrators
- **Miles Dyson** - Manages Skynet project (high authority)
- **Carter Burke** - Corporate decision maker (full control)
- **Rick Sanchez** - Genius scientist (does whatever he wants)

### Viewers (Read-only)
- **T-800** - Security/protection role (observes, doesn't manage)
- **Bishop** - Support role (assists, doesn't command)
- **Morty** - Assistant/sidekick (helps but doesn't lead)

### Auditors (Stealth observers)
- **Sarah Connor** - Infiltrating/monitoring Cyberdyne
- **Ellen Ripley** - Investigating corporate malfeasance
- **Mr. Meeseeks** - Quality control (exists to observe and report)

## Seed Script Structure

```typescript
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Organizations
  const cyberdyne = await prisma.organization.create({
    data: {
      name: 'Cyberdyne Systems',
      website: 'https://cyberdyne.systems',
      location: 'Los Angeles, CA',
    },
  });

  const weylandYutani = await prisma.organization.create({
    data: {
      name: 'Weyland-Yutani Corporation',
      website: 'https://weyland-yutani.corp',
      location: 'Tokyo, Japan',
    },
  });

  const interdimensionalCable = await prisma.organization.create({
    data: {
      name: 'Interdimensional Cable',
      website: 'https://interdimensional.cable',
      location: 'Dimension C-137',
    },
  });

  console.log('✅ Created 3 organizations');

  // Note: We'll create user_profiles after users sign up via invitations
  // The seed script will generate invitation tokens for each user

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## Usage

### Run Seed Script
```bash
# Development
npm run db:seed:dev

# Production (if needed)
npm run db:seed:prod
```

### Package.json Scripts
```json
{
  "scripts": {
    "db:seed:dev": "dotenv -e .env.local -- npx prisma db seed",
    "db:seed:prod": "dotenv -e .env.production -- npx prisma db seed"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

## Testing Workflow

1. **System Admin (You)** promotes yourself in Supabase
2. **Run seed script** to create 3 organizations
3. **Invite demo users** via system admin dashboard
4. **Test each role:**
   - Login as Miles Dyson → verify Administrator permissions
   - Login as T-800 → verify Viewer restrictions
   - Login as Sarah Connor → verify Auditor invisibility
5. **Test cross-org isolation:**
   - Miles can't see Weyland-Yutani data
   - Rick can't see Cyberdyne data
6. **Test system admin:**
   - You can see all organizations
   - You can access any org's data

## Future Enhancements

### More Organizations
- **Aperture Science** (Portal) - GLaDOS, Chell, Wheatley
- **Stark Industries** (Marvel) - Tony Stark, Pepper Potts, JARVIS
- **Umbrella Corporation** (Resident Evil) - Albert Wesker, Ada Wong, HUNK

### Realistic Data
- Add contracts, customers, projects for each org
- Demonstrate data isolation
- Show role-based access in action

## Notes

- Email addresses are fictional (won't receive actual emails)
- Passwords will be set during invitation acceptance
- Use these accounts for demos and testing
- Can be reset/recreated anytime with seed script
- Intuitive character/role alignment makes testing easier

---

**Ready to seed!** Run after migrations are deployed.

