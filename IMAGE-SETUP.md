# Adding Your EternaGuard Images

To complete the landing page setup, you need to add your mockup images to the project.

## 🎨 New! Live Mockup Generator

**Visit the built-in mockup generator at: http://localhost:3000/mockups**

This page automatically generates all five mockups and lets you download them directly. No need for the HTML file anymore - it's all integrated into the Next.js app!

To access it:
1. Make sure the dev server is running (`npm run dev`)
2. Click "Mockups" in the navigation menu, or visit `/mockups` directly
3. Click "Download All Mockups" to get all five images at once

## Steps to Add Images

1. **Save your images** with the following names:
   - `eternaguard-hero.png` - The first mockup image (cemetery scene with form)
   - `eternaguard-overview.png` - The second mockup image (system overview with features)

2. **Copy the images** to this directory:
   ```
   /Users/jaylong/Web/Mmfh/mmfh-landing-app/public/images/
   ```

3. **Recommended image specifications:**
   - Format: PNG or JPG
   - Aspect Ratio: 16:9 (landscape)
   - Resolution: 1920x1080 or higher for best quality
   - File size: Optimized for web (< 500KB each if possible)

## File Locations

The landing page references these images in two locations:

### Hero Section
```tsx
<img src="/images/eternaguard-hero.png" alt="EternaGuard Cemetery Management System" />
```
Located at the top of the page, showcasing the main cemetery visualization.

### Overview Section  
```tsx
<img src="/images/eternaguard-overview.png" alt="EternaGuard System Overview" />
```
Located below the stats section, showing the system features and applications.

## Fallback Behavior

If the images are not found, the page will display elegant fallback placeholders with:
- Gradient backgrounds
- Feature descriptions
- Icons and emojis
- Clean typography

So the page will look good even before you add the images!

## Quick Command

To add the images from your desktop (example):
```bash
cp ~/Desktop/eternaguard-hero.png /Users/jaylong/Web/Mmfh/mmfh-landing-app/public/images/
cp ~/Desktop/eternaguard-overview.png /Users/jaylong/Web/Mmfh/mmfh-landing-app/public/images/
```

## Image Optimization (Optional)

For better performance, you can optimize your images using:
- [TinyPNG](https://tinypng.com/) - Online compression
- [ImageOptim](https://imageoptim.com/) - Mac app
- Or use the Next.js Image component's built-in optimization (already implemented)

The page is already configured to use Next.js's Image component with automatic optimization, lazy loading, and responsive sizing.

