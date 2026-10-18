# EternaGuard Agent Instructions

## What This Is

EternaGuard is pre-launch cemetery software with two phases:

1. **Phase 1 (the wedge): Cemetery contract management** — Pre-need and at-need contracts, payment plans, interment rights, plot inventory. Funeral home systems treat cemetery contracts as an afterthought; EternaGuard closes that gap.

2. **Phase 2: Cemetery property management** — Grave mapping, GPS finding, work orders, maintenance. Future roadmap includes drone surveys, AR wayfinding, and autonomous maintenance detection.

**Current state:** Marketing site capturing waitlist signups. No product yet. The `/demo` pages are UI mockups, not working software.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Testing:** Playwright (headless Chromium)
- **Deployment:** Vercel

## Running Locally

```bash
npm ci                 # Install from lockfile
npm run dev            # Dev server with Turbopack
npm run build          # Production build
npm run start          # Production server
npm run test           # Playwright tests (requires build + server)
npm run verify         # Build then test
```

## Verification Standard

Before marking work complete:

1. Clean install: `npm ci`
2. Production build: `npm run build`
3. Start production server: `npm run start`
4. Run Playwright suite: `npm run test`

All tests must pass. Post passing test output and screenshots in the PR.

**Never rely on Vercel preview deployments** — they may be protected. Never create bypass links or disable Deployment Protection. Always verify locally with a production build.

## Copy Rules

This is a **pre-launch product with no customers**.

**Do not invent:**
- Customer names, testimonials, or quotes
- Usage statistics or customer counts
- Claims like "trusted by," "leading," "best," or "#1"
- Pricing (except "pricing to be announced")
- Ratings or reviews

**Do use:**
- "Early access," "waitlist," "coming soon"
- "Built with licensed funeral directors and cemetery sales experience"
- Feature descriptions of what the software will do
- Roadmap items clearly labeled as future

## Waitlist Configuration

Email capture is handled by `/app/api/waitlist/route.ts`.

Provider configuration via environment variables:

| Provider | Variables |
|----------|-----------|
| AWS | `WAITLIST_AWS_URL`, `WAITLIST_AWS_SECRET` |
| Resend | `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` |
| Mailchimp | `MAILCHIMP_API_KEY`, `MAILCHIMP_LIST_ID`, `MAILCHIMP_DC` |
| ConvertKit | `CONVERTKIT_API_KEY`, `CONVERTKIT_FORM_ID` |
| Webhook | `WAITLIST_WEBHOOK_URL` |

Set `EMAIL_PROVIDER` to force a specific provider, or let the API auto-detect from available credentials.

**Production behavior:** If no provider is configured and `VERCEL_ENV=production`, returns 503 with "Signups are temporarily unavailable. Please email contact@eternaguard.com" — no fake success messages.

**Development behavior:** If no provider is configured, logs submission metadata (without email addresses) to console and returns success.

Analytics: Set `NEXT_PUBLIC_GA_ID` for Google Analytics.

## Pull Requests

- Create PRs as **drafts**
- Jay reviews and merges — never merge yourself
- Include test results and screenshots in the PR description
