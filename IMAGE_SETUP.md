# Image Setup Instructions

## 🖼️ Required Images

To fix the 400 Bad Request errors, you need to add your hero slider images.

### Step 1: Create the Directory (if needed)
The directory `/public/slides/` should already exist. If not, create it.

### Step 2: Add Your Images

Place **3 high-quality luxury interior images** in the following location:

```
/public/slides/
  ├── 1.jpg  (Required)
  ├── 2.jpg  (Required)
  └── 3.jpg  (Required)
```

### Image Specifications

**Recommended:**
- **Resolution:** 1920x1080 or larger (for full-screen display)
- **Format:** JPG, PNG, or WebP
- **Quality:** High-resolution for luxury feel
- **Aspect Ratio:** 16:9 or similar (landscape orientation)
- **File Size:** Optimize for web (under 2MB per image recommended)

### Step 3: Verify

After adding the images:
1. Restart your dev server: `npm run dev`
2. The 400 errors should disappear
3. The slider should display your images with the Ken Burns effect

## 🎨 Logo Setup

Also ensure your logo is placed at:
```
/public/images/logo/de.png
```

**Note:** The current logo file is `de.png`. Make sure this file exists in the logo directory.

**Logo Specifications:**
- Format: PNG with transparent background (recommended) or SVG
- Size: High resolution (will be scaled down)
- Aspect Ratio: Maintain original logo proportions

## ⚠️ Current Status

Until images are added:
- The slider will show a gradient fallback background
- A message will indicate "Image not found"
- The slider functionality will still work, but without images

---

**Note:** The error handling has been added to gracefully handle missing images, so the site won't crash. However, you'll need to add the actual images to see the full hero slider effect.
