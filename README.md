# EternaGuard

Cemetery contract management software. Pre-need and at-need contracts, payment plans, plot inventory, and work orders — built for the way cemeteries actually work.

**Live site:** https://eternaguard.cyberworldbuilders.com

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the site.

### Build & Production

```bash
npm run build
npm start
```

### Verify (Tests)

```bash
npm run verify
```

Runs Playwright tests covering page rendering, SEO tags, form validation, and responsive screenshots.

## Project Structure

```
app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout with metadata and analytics
├── sitemap.ts                  # Dynamic sitemap
├── robots.ts                   # Robots.txt rules
├── contracts/page.tsx          # Contract management landing page
├── work-orders/page.tsx        # Work orders landing page
├── mapping/page.tsx            # Mapping & GPS landing page
├── ai-cemetery/page.tsx        # AI features landing page
├── api/waitlist/route.ts       # Waitlist signup API
├── components/
│   ├── Navigation.tsx          # Site navigation
│   ├── Footer.tsx              # Site footer
│   └── WaitlistForm.tsx        # Email capture form
└── demo/                       # Product preview (noindexed)
    ├── layout.tsx
    ├── page.tsx
    ├── mockups/
    ├── cms-dashboard/
    └── crm-dashboard/
```

## Environment Variables

### Required for Email Capture

Set `EMAIL_PROVIDER` to specify which provider to use. If not set, the API auto-detects based on which credentials are present.

| Variable | Description |
|----------|-------------|
| `EMAIL_PROVIDER` | Provider name: `resend`, `mailchimp`, `convertkit`, or `webhook` |

#### Resend

```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_AUDIENCE_ID=aud_xxxxxxxxxxxxx
```

Create an audience in [Resend](https://resend.com/audiences) and get the API key from your dashboard.

#### Mailchimp

```env
EMAIL_PROVIDER=mailchimp
MAILCHIMP_API_KEY=xxxxxxxxxx-us21
MAILCHIMP_LIST_ID=xxxxxxxxxx
MAILCHIMP_DC=us21
```

The `DC` (data center) is the suffix of your API key (e.g., `us21`). Get the list ID from Audience > Settings > Audience name and defaults.

#### ConvertKit

```env
EMAIL_PROVIDER=convertkit
CONVERTKIT_API_KEY=xxxxxxxxxxxxx
CONVERTKIT_FORM_ID=1234567
```

Create a form in ConvertKit and get the form ID from the form settings.

#### Generic Webhook

```env
EMAIL_PROVIDER=webhook
WAITLIST_WEBHOOK_URL=https://your-endpoint.com/webhook
```

The webhook receives a POST with JSON:

```json
{
  "email": "user@example.com",
  "role": "cemetery_manager",
  "organization": "Example Cemetery",
  "region": "Texas",
  "headache": "Tracking pre-need payments",
  "source": "eternaguard_waitlist",
  "timestamp": "2024-01-15T12:00:00.000Z"
}
```

#### AWS (API Gateway + Lambda + DynamoDB)

```env
EMAIL_PROVIDER=aws
WAITLIST_AWS_URL=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/waitlist
WAITLIST_AWS_SECRET=your-secret-key
```

The AWS provider POSTs JSON to Jay's shared backend (API Gateway → Lambda → DynamoDB). Phase 1 is capture only: SES confirmation emails are deferred; addresses stay pending/unverified.

**Request headers:**
- `x-waitlist-secret`: Authentication secret
- `X-Waitlist-Client-IP`: Server-generated client IP from Vercel's trusted headers
- `X-Waitlist-User-Agent`: User's browser user-agent (when available)

**Payload:**
```json
{
  "email": "user@example.com",
  "role": "cemetery_manager",
  "organization": "Example Cemetery",
  "region": "Texas",
  "headache": "Tracking pre-need payments",
  "source_page": "/contracts",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "cemetery-software",
  "consent": false,
  "consent_text_version": null
}
```

**Field limits:** headache 2000 chars, UTM values 200 chars each.

**Phase 1 consent:** No marketing checkbox on form, so `consent` is always `false`. Never send `consent: true` without an approved `consent_text_version`.

**Response:** Backend must return `{ "ok": true }` on success. Errors 400/429/503 are propagated to the client with meaningful messages. A 429 response's `Retry-After` header is forwarded.

#### Fallback Behavior

- **Development/preview:** Signups are logged to the server console (without email addresses) and return success.
- **Production (`VERCEL_ENV=production`):** If no provider is configured, returns 503 with "Signups are temporarily unavailable. Please email contact@eternaguard.com". This prevents fake success messages when leads would be lost.

### Analytics

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID (e.g., `G-XXXXXXXXXX`) |

Analytics script only loads when this variable is set.

## SEO

- Each landing page has unique title, description, and canonical URL
- Open Graph and Twitter Card tags for social sharing
- JSON-LD structured data (Organization, WebSite, SoftwareApplication)
- Sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Demo pages are noindexed but crawlable

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Testing:** Playwright
- **Deployment:** Vercel

## Demo Pages

The `/demo` section contains interactive product previews:

- `/demo` — Feature overview with AR/drone vision concepts
- `/demo/mockups` — UI mockup generator
- `/demo/cms-dashboard` — Marketing dashboard demo
- `/demo/crm-dashboard` — CRM and sales pipeline demo
- `/demo/crm-dashboard/new-contract` — Contract creation wizard

These pages are excluded from search indexing (`noindex`) but remain accessible for product demonstrations.

## License

Proprietary — © 2025 EternaGuard
