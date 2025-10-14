# Using the EternaGuard Mockup Generator

## Overview
The `mockup-generator.html` file creates five professional mockups for the EternaGuard platform using HTML5 Canvas. These mockups can be used for presentations, marketing materials, and the landing page.

## Generated Mockups

1. **Hero Section** - Main landing page hero with gradient branding
2. **Feature Cards** - Three feature cards showcasing core functionality
3. **Mobile App Interface** - Phone mockup with map navigation
4. **Drone Monitoring Dashboard** - Live feed with stats and detection boxes
5. **AR Interface Concept** - Augmented reality view with overlay markers

## How to Generate Images

### Method 1: Browser Download
1. Open `mockup-generator.html` in any modern browser
2. Click "Download All Mockups" button at the bottom
3. Five PNG files will download automatically:
   - `eternaguard-hero-section.png`
   - `eternaguard-feature-cards.png`
   - `eternaguard-mobile-app.png`
   - `eternaguard-drone-dashboard.png`
   - `eternaguard-ar-interface.png`

### Method 2: Quick Access
```bash
# From the project root
open mmfh-landing-app/mockup-generator.html
```

Or visit the file directly in your browser:
```
file:///Users/jaylong/Web/Mmfh/mmfh-landing-app/mockup-generator.html
```

## Adding Generated Images to Landing Page

After generating the images:

1. **Save the downloaded images** to the public/images directory:
```bash
mv ~/Downloads/eternaguard-*.png /Users/jaylong/Web/Mmfh/mmfh-landing-app/public/images/
```

2. **The landing page already references these paths**:
   - Hero section uses: `/images/eternaguard-hero.png`
   - Overview section uses: `/images/eternaguard-overview.png`

3. **Optional**: Rename specific mockups to match landing page expectations:
```bash
cd /Users/jaylong/Web/Mmfh/mmfh-landing-app/public/images/
mv eternaguard-hero-section.png eternaguard-hero.png
mv eternaguard-mobile-app.png eternaguard-overview.png
```

## Customization

The mockups use EternaGuard branding with:
- **Primary Color**: Blue (#3b82f6)
- **Secondary Color**: Emerald (#10b981) 
- **Dark Backgrounds**: (#0a0a0f, #1a1a2e)
- **Modern Design**: Rounded corners, glassmorphism, gradients

To customize:
1. Open `mockup-generator.html` in a text editor
2. Search for color hex codes and replace with your brand colors
3. Modify text content in the JavaScript section
4. Refresh browser and re-download

## Image Specifications

All generated mockups are:
- **Dimensions**: 1400x800px (hero), 1400x600px (features), 1400x800px (others)
- **Format**: PNG with transparency where applicable
- **Quality**: High-resolution, suitable for web and print
- **File Size**: ~50-200KB each (depending on complexity)

## Using in Landing Page

The mockups are designed to slot directly into the landing page:

### Hero Mockup
Replace the hero section image placeholder with the generated hero mockup for a cohesive brand experience.

### Feature Cards Mockup  
Can be used as a screenshot showing the three core features in an attractive card layout.

### Mobile App Mockup
Perfect for showcasing the mobile interface with GPS navigation and grave location features.

### Drone Dashboard Mockup
Demonstrates the admin/staff dashboard with live feed and monitoring capabilities.

### AR Interface Mockup
Shows the future vision of AR capabilities with overlay markers and real-time detection.

## Tips

1. **Regenerate Anytime**: Click the "Regenerate" button to create fresh mockups
2. **Batch Download**: Use "Download All" to get all five mockups at once
3. **High Quality**: Mockups are vector-based and scale well
4. **Edit Further**: Import PNGs into Figma, Sketch, or Photoshop for additional editing

## Next Steps

1. Generate the mockups using the HTML file
2. Move them to `/public/images/` directory
3. Refresh the landing page at http://localhost:3000
4. See the mockups integrated into the live site!

## Alternative Uses

These mockups can also be used for:
- Investor pitch decks
- Social media posts
- Blog articles
- Email marketing campaigns
- Partner presentations
- Trade show materials

The consistent branding across all mockups creates a professional, cohesive look for the EternaGuard platform.

