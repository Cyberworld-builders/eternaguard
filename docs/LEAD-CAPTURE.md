# Eternaguard Lead Capture - Implementation Plan

## Overview
This document outlines the architecture and implementation strategy for capturing waitlist signups from the Eternaguard demo (http://10.0.0.201:3000/#waitlist) using Supabase, aligned with the broader Cyberworld Gateway SSO architecture.

---

## Key Architectural Decisions

### 1. Storage Location: Separate Leads Table (Recommended)

**Decision:** Store waitlist emails in a dedicated `public.leads` table, NOT directly in `auth.users`.

**Rationale:**
- **Industry Best Practice:** Lead capture is distinct from user registration. Leads are unverified, low-commitment contacts; users are authenticated identities with access rights.
- **Conversion Funnel:** Allows tracking the lead → user conversion pipeline with proper metrics (signup rate, email verification rate, activation rate).
- **No Premature Auth:** Avoid cluttering `auth.users` with unconfirmed, potentially inactive emails. Supabase Auth is for authenticated identities, not marketing leads.
- **Data Hygiene:** Leads may never convert, be duplicates, or have typos—keeping them separate prevents auth table pollution.
- **Flexibility:** Can capture additional lead metadata (source, campaign, referral) without overloading user profiles.

**Structure:**
```sql
-- Shared schema (public) - accessible across all products
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL, -- e.g., 'eternaguard_waitlist', 'homepage_form'
  product TEXT NOT NULL, -- e.g., 'eternaguard', for multi-product tracking
  metadata JSONB DEFAULT '{}', -- flexible: { utm_source, referral_code, etc. }
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'bounced', 'unsubscribed')),
  converted_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- link after conversion
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT, -- for optional email verification before adding to campaign
  verification_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_product ON public.leads(product);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);

-- Enable RLS (publicly writable for lead capture, admin-readable)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for waitlist form submission)
CREATE POLICY "Allow anonymous lead creation" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can read their own lead (if matched by email)
CREATE POLICY "Users can read own lead" ON public.leads
  FOR SELECT TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Policy: Service role can read/update all (for admin/ETL)
CREATE POLICY "Service role full access" ON public.leads
  FOR ALL TO service_role
  USING (true);

-- Trigger: Update updated_at on modifications
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

---

### 2. Lead → User Conversion Flow

**Two-Stage Approach:**

#### Stage 1: Waitlist Signup (Current Focus)
1. User submits email on `eternaguard.cyberworldbuilders.com/#waitlist`
2. Insert into `public.leads` with:
   - `email`: from form
   - `source`: `'eternaguard_waitlist'`
   - `product`: `'eternaguard'`
   - `status`: `'pending'`
   - `email_verified`: `false` (initially)
3. **No auth identity created yet**
4. Return success message: "You're on the list! Check your email for updates."

#### Stage 2: Conversion to Full User (Future)
When ready to grant product access (e.g., beta launch):
1. **Send invitation email** with magic link or signup prompt
2. User clicks → redirects to full signup flow:
   - Uses Supabase `signUp()` to create `auth.users` entry
   - On successful auth, trigger webhook/function to:
     - Create `eternaguard.profiles` entry (see Product Schema section)
     - Update `public.leads.status = 'converted'` and set `converted_user_id`
3. User now has full SSO identity across Cyberworld products

**Why not create auth identity immediately?**
- **Avoid email verification friction:** Waitlist signup should be 1-click. Forcing email verification upfront reduces conversions by ~30% (industry avg).
- **Prevent spam in auth.users:** Unverified auth entries complicate user management and inflate auth costs (if Supabase pricing scales by users).
- **Decouple marketing from product:** Leads are marketing assets; users are product assets. Keep systems separate until conversion is intentional.

---

### 3. Email Verification Strategy

**Decision:** Optional pre-verification; mandatory at conversion.

**For Waitlist (Stage 1):**
- **Do NOT force verification** for initial signup.
- **Optional:** Send a "Confirm your interest" email with token link:
  - On click, set `email_verified = true` in `public.leads`
  - Helps validate email validity and engagement level
  - Use this to prioritize invites (verified leads get first access)
- **Best Practice:** Use double opt-in for GDPR/CAN-SPAM compliance if adding to email campaigns immediately.

**For Conversion (Stage 2):**
- Supabase Auth's built-in email verification is **mandatory** during `signUp()`.
- This ensures `auth.users` only contains confirmed, valid emails.

**Implementation:**
```typescript
// Waitlist signup handler (no Supabase Auth)
async function handleWaitlistSignup(email: string) {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      email,
      source: 'eternaguard_waitlist',
      product: 'eternaguard'
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') { // Unique violation
      return { success: false, message: 'Email already registered!' };
    }
    throw error;
  }

  // Optional: Send verification email via edge function
  // await sendVerificationEmail(data.id, email);

  return { success: true, message: 'Check your inbox!' };
}
```

---

### 4. Product-Specific Profile Creation

**Decision:** Do NOT create `eternaguard.profiles` until user converts to authenticated identity.

**Rationale:**
- **Profiles require auth.users.id:** The `eternaguard.profiles.id` must reference `auth.users(id)`. Leads don't have this yet.
- **Avoid orphaned data:** If lead never converts, you'd have empty profiles cluttering the product schema.
- **Separation of concerns:** Product profiles are for active users with access rights, not marketing leads.

**When to create profile:**
- **Trigger:** After successful `signUp()` during Stage 2 conversion.
- **Mechanism:** Use Supabase Database Webhook or Auth Hook (on `auth.users` INSERT):
  ```sql
  -- Example: Database function triggered on auth signup
  CREATE OR REPLACE FUNCTION handle_new_user()
  RETURNS TRIGGER AS $$
  BEGIN
    -- Create profile in eternaguard schema
    INSERT INTO eternaguard.profiles (id, created_at)
    VALUES (NEW.id, NOW());

    -- Mark lead as converted (if exists)
    UPDATE public.leads
    SET status = 'converted', converted_user_id = NEW.id
    WHERE email = NEW.email AND status = 'pending';

    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();
  ```

**Eternaguard Profile Schema (Future):**
```sql
CREATE SCHEMA IF NOT EXISTS eternaguard;
-- (Grant statements from GATEWAY-PLAN.md)

CREATE TABLE eternaguard.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_tier TEXT DEFAULT 'free', -- e.g., 'free', 'pro', 'enterprise'
  onboarding_completed BOOLEAN DEFAULT FALSE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE eternaguard.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own profile" ON eternaguard.profiles
  FOR ALL USING (auth.uid() = id);
```

---

### 5. Migration Management Strategy

**Decision:** Centralized migrations in `gateway` repo for shared schemas; product-specific migrations in respective product repos.

**Structure:**
```
gateway/
├── supabase/
│   ├── migrations/
│   │   ├── 00001_create_leads_table.sql       # Shared: public.leads
│   │   ├── 00002_setup_auth_hooks.sql         # Shared: auth triggers
│   │   └── 00003_create_shared_functions.sql  # Shared: utility functions
│   └── config.toml                             # Supabase project config

eternaguard/
├── supabase/
│   └── migrations/
│       ├── 00001_create_eternaguard_schema.sql  # Product-specific
│       ├── 00002_create_profiles_table.sql      # Product-specific
│       └── 00003_add_subscription_fields.sql    # Product-specific
└── docs/
    └── LEAD-CAPTURE.md                          # This file

(Repeat for other products: studio/, legend/, involved-v2/)
```

**Rationale:**
| Location | What Goes Here | Why |
|----------|----------------|-----|
| **gateway/supabase/** | - `public.leads`<br>- Auth hooks/triggers<br>- Shared utility functions<br>- Global RLS policies | - Single source of truth for cross-product infrastructure<br>- Ensures consistency (all products use same leads table)<br>- Simplifies rollout (one migration applies to shared Supabase project) |
| **{product}/supabase/** | - Product schemas (e.g., `eternaguard`)<br>- Product profiles/tables<br>- Product-specific functions/triggers | - Keeps product teams independent<br>- Allows product-specific versioning<br>- Easier to reason about product scope<br>- Aligns with your siloed multi-tenant design |

**Workflow:**
1. **Shared changes:** Commit to `gateway` repo → Run `supabase db push` → Affects all products
2. **Product changes:** Commit to `eternaguard` repo → Run `supabase db push` (using same project ref) → Affects only eternaguard schema
3. **Coordination:** Use Supabase CLI's `supabase db diff` to generate migrations, ensuring no conflicts between teams.

**Trade-offs:**
- **Pro:** Clear ownership, modular, scales to many products.
- **Con:** Must coordinate shared project ref across repos (use environment variables/secrets).

**Alternative (if too complex early on):** Start with all migrations in `gateway` repo, split out later when products mature and need independent velocity.

---

### 6. Email Marketing Integration

**Decision:** Add leads to mail campaign WITHOUT forcing email verification, but track verification status for segmentation.

**Rationale:**
- **Reduce friction:** Waitlist is top-of-funnel—prioritize conversion over validation.
- **Segmentation:** Use `email_verified` field to create tiered campaigns:
  - **Unverified leads:** Send welcome + "Confirm your interest" email (with verification link)
  - **Verified leads:** Priority access announcements, early invites
  - **Converted users:** Product onboarding, feature updates

**Implementation Options:**
1. **Supabase Edge Function:** On `public.leads` INSERT, trigger function to add to Mailchimp/SendGrid/Loops
   ```typescript
   // supabase/functions/sync-lead-to-mailchimp/index.ts
   Deno.serve(async (req) => {
     const { record } = await req.json(); // Webhook payload
     
     await fetch('https://api.mailchimp.com/3.0/lists/YOUR_LIST/members', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${Deno.env.get('MAILCHIMP_API_KEY')}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         email_address: record.email,
         status: 'subscribed', // or 'pending' for double opt-in
         merge_fields: {
           SOURCE: record.source,
           PRODUCT: record.product
         },
         tags: ['eternaguard-waitlist']
       })
     });

     return new Response('OK');
   });
   ```

2. **Database Webhook:** Configure in Supabase Dashboard → Database → Webhooks → On `leads` INSERT

**GDPR/Compliance:**
- Add consent checkbox to form: "I agree to receive product updates" (pre-checked is OK for waitlists in most jurisdictions)
- Store consent in `metadata`: `{ consent_given: true, consent_timestamp: '...' }`
- Honor unsubscribes by updating `status = 'unsubscribed'` and syncing to email provider

---

## Best Practices Checklist

### ✅ Do This
- [x] Store leads separately from auth.users
- [x] Use `public` schema for cross-product lead tracking
- [x] Allow anonymous inserts with RLS for form submissions
- [x] Track lead source/product for attribution
- [x] Make email verification optional for waitlist, mandatory for conversion
- [x] Link converted leads to auth.users via `converted_user_id`
- [x] Use Supabase Database Webhooks for real-time integrations (email tools)
- [x] Index `email`, `status`, `created_at` for query performance
- [x] Set up auth hooks to auto-create profiles on user signup
- [x] Keep shared migrations in gateway repo, product migrations in product repos

### ❌ Don't Do This
- [ ] Don't create auth.users entries for waitlist signups
- [ ] Don't create product profiles before auth identity exists
- [ ] Don't force email verification before adding to waitlist
- [ ] Don't store product-specific lead data in product schemas (use shared `public.leads`)
- [ ] Don't skip RLS policies (even for leads table)
- [ ] Don't forget to update lead status when user converts
- [ ] Don't spam leads without tracking consent

---

## Additional Questions to Answer

Before implementing, clarify these points:

### 1. **Email Service Provider?**
   - **Question:** Which tool for email campaigns? (Mailchimp, SendGrid, Loops, Resend, Postmark?)
   - **Impact:** Determines webhook payload format and API integration
   - **Recommendation:** Use Resend or Loops for developer-friendly APIs; Mailchimp if marketing team needs GUI

### 2. **Invitation Strategy?**
   - **Question:** When/how to convert leads to users? (Open immediately vs. phased rollout vs. manual approval?)
   - **Impact:** Affects whether you need admin dashboard, invite codes, or automated flows
   - **Recommendation:** Start with manual invites (batch send emails with magic links), automate later

### 3. **Lead Deduplication?**
   - **Question:** What if same email signs up for multiple product waitlists?
   - **Current:** UNIQUE constraint on email prevents duplicates
   - **Alternative:** Remove UNIQUE, use composite key (email + product), allow tracking interest across products
   - **Recommendation:** Keep UNIQUE, use `product` field as "first signup," store subsequent products in `metadata.interested_products: []`

### 4. **Analytics Integration?**
   - **Question:** Track waitlist signups in Google Analytics, Mixpanel, PostHog?
   - **Impact:** Requires client-side events or server-side API calls
   - **Recommendation:** Fire event on successful insert: `analytics.track('Waitlist Signup', { product: 'eternaguard', source: 'demo' })`

### 5. **Rate Limiting?**
   - **Question:** How to prevent spam/bot signups?
   - **Options:**
     - Supabase RLS + rate limiting (per IP)
     - reCAPTCHA or hCaptcha on form
     - Edge function with Upstash rate limiting
   - **Recommendation:** Start with Supabase's built-in rate limiting (configurable in Dashboard), add CAPTCHA if abuse detected

### 6. **Admin Dashboard?**
   - **Question:** Do you need a UI to view/manage leads? (Export CSVs, bulk actions, search)
   - **Impact:** Determines if you build custom admin or use Supabase Dashboard/Studio
   - **Recommendation:** Use Supabase Studio's table editor for MVP; build custom admin in gateway later (Retool/AdminJS integration)

### 7. **Lead Nurture Sequence?**
   - **Question:** What emails should leads receive? (Immediate welcome, weekly updates, launch announcement?)
   - **Impact:** Determines email campaign complexity
   - **Recommendation:** Start simple: 
     1. Immediate: "You're on the waitlist" + verification link (optional)
     2. Weekly: Product development updates (if building in public)
     3. Launch: "Beta access available" + signup CTA

### 8. **Error Handling?**
   - **Question:** How to handle form failures? (Duplicate email, invalid email format, network errors)
   - **Client:** Show inline errors, retry button
   - **Server:** Log failures to Sentry/Datadog
   - **Recommendation:** Return clear error messages, store failed attempts in separate `lead_signup_attempts` table for debugging

---

## Implementation Phases

### Phase 1: MVP (This Sprint)
**Goal:** Capture emails, store in Supabase, add to mail campaign

- [ ] Create `public.leads` table (migration in gateway repo)
- [ ] Add RLS policies
- [ ] Update Eternaguard waitlist form to POST to Supabase
- [ ] Test anonymous insert via form
- [ ] (Optional) Set up Database Webhook → Email service
- [ ] Deploy and test on demo site

**Estimated Effort:** 4-6 hours

### Phase 2: Verification (Next Sprint)
**Goal:** Add optional email verification to improve lead quality

- [ ] Add verification token generation
- [ ] Create email template for verification
- [ ] Build verification endpoint (`/api/verify-email?token=...`)
- [ ] Update leads table on verification
- [ ] Track verification rate in analytics

**Estimated Effort:** 6-8 hours

### Phase 3: Conversion Flow (Pre-Launch)
**Goal:** Convert leads to authenticated users

- [ ] Create `eternaguard.profiles` schema/table
- [ ] Set up auth hook to auto-create profiles
- [ ] Build invite email campaign
- [ ] Create signup flow (magic link or email/password)
- [ ] Link converted users to original lead records
- [ ] Test full funnel: waitlist → invite → signup → profile creation

**Estimated Effort:** 8-12 hours

### Phase 4: Admin & Analytics (Post-Launch)
**Goal:** Manage leads at scale

- [ ] Build admin dashboard in gateway (list, search, export leads)
- [ ] Add bulk actions (send invites, mark as contacted)
- [ ] Integrate analytics (conversion funnel, cohort analysis)
- [ ] Set up automated nurture sequences
- [ ] Add lead scoring (verified + engagement = higher priority)

**Estimated Effort:** 12-16 hours

---

## Tech Stack Summary

| Component | Technology | Notes |
|-----------|-----------|-------|
| **Database** | Supabase (Postgres) | Shared project, `public.leads` table |
| **Auth** | Supabase Auth | Used only at conversion stage, not for leads |
| **Email** | TBD (Resend/Loops/Mailchimp) | Integrate via webhook or Edge Function |
| **Form Submission** | Supabase JS Client | Direct insert into `leads` table (anon role) |
| **Migrations** | Supabase CLI | `gateway/supabase/migrations/` for shared, `eternaguard/supabase/migrations/` for product |
| **Rate Limiting** | Supabase built-in | Configure per-endpoint limits in Dashboard |
| **Analytics** | TBD (PostHog/Mixpanel?) | Track signup events client-side |

---

## SQL Migration Template

**File:** `gateway/supabase/migrations/YYYYMMDDHHMMSS_create_leads_table.sql`

```sql
-- Create leads table for cross-product waitlist/lead capture
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  product TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted', 'bounced', 'unsubscribed')),
  converted_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  verification_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_product ON public.leads(product);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow anonymous lead creation" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own lead" ON public.leads
  FOR SELECT TO authenticated
  USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Service role full access" ON public.leads
  FOR ALL TO service_role
  USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Comments for documentation
COMMENT ON TABLE public.leads IS 'Cross-product lead capture table for waitlists and marketing funnels';
COMMENT ON COLUMN public.leads.source IS 'Lead source identifier (e.g., eternaguard_waitlist, homepage_hero)';
COMMENT ON COLUMN public.leads.product IS 'Product identifier (e.g., eternaguard, studio, legend)';
COMMENT ON COLUMN public.leads.metadata IS 'Flexible JSONB for utm params, referrals, consent timestamps, etc.';
COMMENT ON COLUMN public.leads.converted_user_id IS 'Links to auth.users.id after successful conversion to authenticated user';
```

---

## Next Steps

1. **Review & Approve:** Discuss with team, finalize decisions on open questions
2. **Set up Supabase Project:** If not exists, create shared project, configure environment variables
3. **Run Migration:** Apply `create_leads_table.sql` to Supabase project
4. **Update Eternaguard Form:** Modify waitlist form to integrate with Supabase
5. **Test End-to-End:** Submit test email, verify insertion, check RLS policies
6. **Monitor:** Set up logging/alerts for failed inserts or abuse patterns

---

## References
- [GATEWAY-PLAN.md](../../gateway/docs/GATEWAY-PLAN.md) - SSO architecture & schema design
- [Supabase Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks) - Trigger functions on signup
- [Supabase Database Webhooks](https://supabase.com/docs/guides/database/webhooks) - Real-time integrations
- [Row Level Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security) - Securing tables

---

**Document Status:** Draft for review  
**Last Updated:** 2025-11-05  
**Owner:** CyberWorld Gateway Team

