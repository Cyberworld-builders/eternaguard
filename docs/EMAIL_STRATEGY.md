# EternaGuard Email Strategy

**Created:** 2025-11-13  
**Status:** Planning Phase

## Current Needs

### Immediate (RBAC Implementation)
- User invitation emails (system admin invites users to organizations)
- Simple, functional, transactional emails

### Future (Post-MVP)
- Marketing campaigns
- Lead nurturing
- Product updates
- Billing notifications

## Short-term Solution: Mailgun (Free Tier)

### Why Mailgun for Now?
- **Free tier:** 5,000 emails/month for 3 months, then $35/month
- **Simple API:** Easy integration
- **Transactional focus:** Perfect for invitations
- **No credit card required:** For initial testing
- **Industry standard:** Well-documented, reliable

### Integration Plan
1. Sign up for Mailgun free tier
2. Verify domain (or use sandbox for testing)
3. Create simple email templates
4. Implement sending via API route
5. Store email logs in database (optional)

### Email Templates Needed (Phase 1)
1. **Organization Invitation**
   - Subject: "You've been invited to join [Organization Name] on EternaGuard"
   - Content: Invitation link, organization info, role assignment
   - CTA: "Accept Invitation"

2. **Welcome Email** (after signup via invitation)
   - Subject: "Welcome to [Organization Name] on EternaGuard"
   - Content: Getting started guide, role explanation
   - CTA: "Go to Dashboard"

## Medium-term Solution: Supabase Pro

### When to Upgrade
- When we need more than 5,000 emails/month
- When we want integrated auth emails (password reset, email verification)
- When we're ready to invest in the product

### Supabase Pro Benefits
- **$25/month** - Reasonable for early stage
- **Integrated with auth** - Password resets, email verification
- **Custom SMTP** - Can still use Mailgun or switch to SendGrid
- **Better support** - Priority support for issues

### Migration Path
Mailgun → Supabase Pro (with Mailgun SMTP) → AWS SES (when scaling)

## Long-term Solution: AWS SES + Custom Infrastructure

### When to Move
- Approaching Supabase Enterprise pricing
- Need more control over infrastructure
- Ready to manage our own Terraform/AWS setup
- Email volume justifies dedicated solution

### AWS SES Benefits
- **$0.10 per 1,000 emails** - Extremely cost-effective at scale
- **Full control** - Custom templates, tracking, analytics
- **Terraform managed** - Infrastructure as code
- **Integrates with other AWS services** - Lambda, S3, etc.

### Infrastructure Stack (Future)
```
EternaGuard Product
├── AWS RDS (PostgreSQL)
├── AWS SES (Email sending)
├── AWS S3 (File storage)
├── AWS Lambda (Background jobs)
├── AWS CloudFront (CDN)
└── Managed via Terraform
```

## Implementation for RBAC (Now)

### Mailgun Setup
```bash
npm install mailgun.js form-data
```

### Environment Variables
```env
MAILGUN_API_KEY=your_api_key
MAILGUN_DOMAIN=your_domain.mailgun.org
MAILGUN_FROM_EMAIL=noreply@eternaguard.com
```

### Simple Email Service
```typescript
// lib/email.ts
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export async function sendInvitationEmail({
  to,
  organizationName,
  role,
  invitationToken,
}: {
  to: string;
  organizationName: string;
  role: string;
  invitationToken: string;
}) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invitationToken}`;
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>You've been invited to join ${organizationName}</h1>
      <p>You've been invited to join <strong>${organizationName}</strong> on EternaGuard as a <strong>${role}</strong>.</p>
      <p>Click the button below to accept your invitation:</p>
      <a href="${inviteUrl}" style="display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px;">
        Accept Invitation
      </a>
      <p style="color: #666; font-size: 14px;">This invitation will expire in 7 days.</p>
      <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="color: #999; font-size: 12px;">Powered by EternaGuard</p>
    </div>
  `;

  await mg.messages.create(process.env.MAILGUN_DOMAIN || '', {
    from: process.env.MAILGUN_FROM_EMAIL || 'noreply@eternaguard.com',
    to: [to],
    subject: `You've been invited to join ${organizationName} on EternaGuard`,
    html,
  });
}
```

### Invitation Token System
- Generate secure random token
- Store in database with expiration (7 days)
- Link to organization + role
- Single-use token (deleted after acceptance)

## Email Templates Philosophy

### Keep It Simple (For Now)
- Plain HTML emails (no fancy templates)
- Clear call-to-action
- Minimal styling
- Mobile-responsive
- EternaGuard branding (subtle footer)

### Future Enhancement
- React Email for type-safe templates
- Email preview system
- A/B testing
- Email analytics
- Unsubscribe management

## Marketing Email Strategy (Post-MVP)

### Lead Management
- Leads captured in `gateway.leads` table
- Segment by product interest
- Drip campaigns for nurturing
- Product launch announcements

### Tool Selection (Future)
Will depend on marketing strategy, but likely candidates:
- **Mailchimp** - If we want marketing automation
- **SendGrid** - If we want unified transactional + marketing
- **Customer.io** - If we want behavior-based campaigns
- **Custom solution** - If we want full control

### Decision Point
Wait until MVP is complete and we have:
- Clear product-market fit
- Understanding of customer journey
- Budget for marketing tools
- Time to implement properly

## Summary

**Now:** Mailgun (free tier) for simple invitation emails  
**Soon:** Supabase Pro when we need more features  
**Later:** AWS SES when we're scaling and managing our own infrastructure  
**Marketing:** Decide after MVP based on strategy

---

**Next Steps:**
1. Sign up for Mailgun
2. Implement invitation email system
3. Test with sandbox domain
4. Verify domain when ready for production

