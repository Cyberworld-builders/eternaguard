# EternaGuard Landing Page

Next.js landing page for EternaGuard - an AI-powered property management system tailored for death care businesses.

## 🚀 Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
mmfh-landing-app/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── layout.tsx        # Root layout with metadata
│   ├── globals.css       # Global styles
│   ├── mockups/
│   │   └── page.tsx      # Mockup generator page
│   ├── cms-dashboard/
│   │   └── page.tsx      # CMS Dashboard demo
│   └── crm-dashboard/
│       └── page.tsx      # CRM Dashboard demo
├── public/
│   └── images/
│       ├── eternaguard-logo.png      # Official EternaGuard logo
│       ├── eternaguard-hero.png      # Hero section mockup
│       └── eternaguard-overview.png  # Overview mockup
├── IMAGE-SETUP.md       # Instructions for adding images
├── MOCKUP-INSTRUCTIONS.md  # Mockup generator docs
└── README.md           # This file
```

## 🎨 Features

- ✅ **Modern Design**: Gradient backgrounds, smooth animations, glassmorphism effects
- ✅ **Professional Branding**: Custom EternaGuard logo with shield icon featuring drone, monument, and tree
- ✅ **Fully Responsive**: Mobile-first design that looks great on all devices
- ✅ **SEO Optimized**: Proper metadata and semantic HTML
- ✅ **Accessible**: WCAG compliant with keyboard navigation
- ✅ **Fast**: Built with Next.js 15 and Turbopack for optimal performance
- ✅ **TypeScript**: Fully typed for better development experience
- ✅ **Built-in Mockup Generator**: Live mockup generator at `/mockups` route
- ✅ **CMS Dashboard Demo**: Interactive analytics dashboard at `/cms-dashboard` route
- ✅ **CRM Dashboard Demo**: Customer relationships and work orders at `/crm-dashboard` route

## 📸 Mockups & Images

### Built-in Mockup Generator
Visit **http://localhost:3000/mockups** to access the live mockup generator:
- Generates 5 professional mockups automatically
- One-click download for all images
- Hero section, feature cards, mobile app, drone dashboard, and AR interface
- Fully integrated into the Next.js app with navigation

See [MOCKUP-INSTRUCTIONS.md](./MOCKUP-INSTRUCTIONS.md) for detailed docs.

## 📊 CMS Dashboard Demo

### Interactive Marketing Dashboard
Visit **http://localhost:3000/cms-dashboard** to see the Phase 1 marketing features:
- **Analytics Overview**: Google Analytics-style metrics with trends
- **Social Media Campaigns**: Facebook, LinkedIn, Instagram, Twitter/X performance
- **SEO Metrics**: Organic traffic, keywords, backlinks, domain authority
- **Content Management**: Blog post tracking with status indicators
- **Top Pages**: Performance metrics for key landing pages
- **Lead Generation**: Conversion tracking and cost per lead

Features mock data demonstrating:
- Integration with Google Analytics, Search Console, PageSpeed Insights
- Social media campaign management across major platforms
- Unified dashboard consolidating all marketing metrics
- Real-time performance indicators and trend analysis

## 👥 CRM Dashboard Demo

### Customer Relationship Management
Visit **http://localhost:3000/crm-dashboard** to see the Phase 2 CRM features:
- **Sales Pipeline**: 5-stage funnel with lead tracking and revenue forecasting
- **Contract Management**: Active contracts with customer details and service types
- **Work Orders**: Task tracking with priorities, assignments, and status
- **Customer Tracking**: Relationship management with interaction history
- **Task Management**: Daily tasks with priority levels and due dates
- **Revenue Analytics**: Performance metrics and trend analysis

Features mock data demonstrating:
- Complete sales lifecycle from lead to closed deal
- Integration with property management system
- Automated work order creation from property issues
- 360° customer view with all interactions and contracts

### Adding Static Images
See [IMAGE-SETUP.md](./IMAGE-SETUP.md) for instructions on adding custom images:
1. Save your images as `eternaguard-hero.png` and `eternaguard-overview.png`
2. Place them in `public/images/`
3. The page will automatically display them

## 🎨 Customization

### Branding

**Logo**: The official EternaGuard logo is located at `/public/images/eternaguard-logo.png`
- Shield icon with drone, monument, and tree elements
- Tagline: "SECURE. MAINTAIN. INNOVATE."
- Used consistently across all pages

**Colors**: The site uses a blue-to-emerald gradient color scheme matching the logo:
- Primary: `blue-600` (#2563eb)
- Secondary: `emerald-600` (#059669) 
- Dark slate: `slate-700` (#334155)
- Gold accent: `yellow-600` (#ca8a04)

To change colors, search and replace across pages:
- `blue-600` → your primary color
- `emerald-600` → your secondary color

### Content

All content is in `app/page.tsx`. Each section is clearly commented:
- Hero Section
- Stats Section
- Overview Section
- Features Section
- Use Cases Section
- Future Vision Section
- Integration Section
- Waitlist Section (with email capture)
- Contact Section
- Footer

### Metadata

Update site metadata in `app/layout.tsx`:
- Title
- Description
- Other SEO tags

## 🔧 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans & Geist Mono
- **Build**: Turbopack (development)
- **Node**: Tested with latest Node.js LTS

## 📧 Lead Capture

The waitlist form currently logs emails to console. To connect it to a real backend:

1. Add your email service (e.g., Mailchimp, SendGrid, ConvertKit)
2. Update the `handleSubmit` function in `app/page.tsx`
3. Add API route in `app/api/subscribe/route.ts`

Example services:
- [Mailchimp](https://mailchimp.com/)
- [ConvertKit](https://convertkit.com/)
- [EmailOctopus](https://emailoctopus.com/)
- [Resend](https://resend.com/)

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

- **Netlify**: `npm run build` → Deploy `out/` folder
- **AWS Amplify**: Connect GitHub repository
- **DigitalOcean**: Use App Platform
- **Self-hosted**: Use `npm run build && npm start`

## 📝 License

Proprietary - © 2025 EternaGuard

## 🤝 Support

For questions or support, contact: contact@eternaguard.com
