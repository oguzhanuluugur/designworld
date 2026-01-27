# Design World - Luxury Architecture Portfolio Website
## Project Plan & Implementation Strategy

---

## 🎯 Project Overview

**Client:** Design World Architecture Firm  
**Type:** Single-Page Portfolio Website (B2B Focus)  
**Design Philosophy:** Minimalist, Cinematic, Digital Art Gallery  
**Target Audience:** High-end clients, real estate developers, luxury property investors

---

## 📋 Phase Breakdown

### **PHASE 1: Setup & Configuration**

#### 1.1 Project Initialization
- [ ] Initialize Next.js 14+ project with TypeScript and App Router
- [ ] Configure `package.json` with required dependencies:
  - `next` (latest 14.x)
  - `react` & `react-dom`
  - `typescript`
  - `tailwindcss` & `postcss` & `autoprefixer`
  - `framer-motion` (animations)
  - `swiper` or `embla-carousel-react` (slider)
  - `next-themes` (optional, for theme management)
  - `@next/font` or `next/font` (font optimization)

#### 1.2 Tailwind CSS Configuration
- [ ] Create `tailwind.config.ts` with custom theme:
  - **Gold Palette:** Primary (#C5A059), Secondary variations
  - **Dark Grays:** Background (#0A0A0A, #1A1A1A), Text (#E5E5E5, #CCCCCC)
  - **Typography Scale:** Custom font sizes for luxury feel
  - **Spacing:** Extended scale for generous whitespace
  - **Animation:** Custom keyframes for Ken Burns effect
- [ ] Configure `postcss.config.js`
- [ ] Set up `globals.css` with base styles and custom utilities

#### 1.3 Typography Setup
- [ ] Integrate Google Fonts:
  - **Headings:** Playfair Display or Cinzel (serif, elegant)
  - **Body:** Inter or Lato (sans-serif, clean)
- [ ] Configure `next/font` for optimal loading
- [ ] Create typography utility classes in Tailwind config

#### 1.4 Project Structure
```
designworld/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main single-page component
│   ├── loading.tsx         # Optional loading state
│   └── globals.css         # Global styles
├── components/
│   ├── Preloader/
│   │   ├── Preloader.tsx
│   │   └── LogoAnimation.tsx
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Navigation.tsx
│   ├── Hero/
│   │   ├── HeroSlider.tsx
│   │   ├── HeroSlide.tsx
│   │   └── KenBurnsEffect.tsx
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Hero slide data, etc.
├── public/
│   ├── images/
│   │   ├── hero/           # Hero slider images
│   │   └── logo/           # Logo assets
│   └── favicon.ico
├── types/
│   └── index.ts            # TypeScript types
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

### **PHASE 2: Component Architecture**

#### 2.1 Preloader Component (`components/Preloader/`)
**Purpose:** The "Grand Entrance" animation sequence

**Components:**
- **`Preloader.tsx`** (Main container)
  - State management for animation phases
  - Timeline: Blank screen → Logo appears → Logo animates to header → Reveal hero
  - Uses Framer Motion for orchestration
  - Handles cleanup and unmounting

- **`LogoAnimation.tsx`** (Logo drawing/fade-in)
  - SVG path animation (if logo is SVG) OR
  - Fade-in with scale animation
  - Gold gradient effect (#C5A059)
  - Centered positioning during preload

**Animation Sequence:**
1. Initial: Blank screen (dark background)
2. 0-1s: Logo fades in + scales up (center)
3. 1-2s: Logo holds (pulse or subtle animation)
4. 2-3s: Logo scales down + moves to header position
5. 3s+: Background fades in, hero slider appears

**Technical Requirements:**
- Use Framer Motion `AnimatePresence` for smooth transitions
- `useState` + `useEffect` for timing control
- Portal or layout shift for logo position transition

#### 2.2 Header Component (`components/Header/`)
**Purpose:** Navigation bar with animated logo entry

**Components:**
- **`Header.tsx`** (Main header container)
  - Fixed or sticky positioning
  - Transparent → Solid background on scroll (optional)
  - Receives logo from preloader animation

- **`Navigation.tsx`** (Menu items)
  - Minimal navigation: Home, Projects, About, Contact
  - Smooth scroll anchors (single-page)
  - Hover effects with gold accent
  - Mobile hamburger menu (responsive)

**Design Specs:**
- Height: 80-100px
- Background: Dark with slight transparency
- Logo: Positioned left, animated entry
- Navigation: Right-aligned, elegant typography

#### 2.3 Hero Slider Component (`components/Hero/`)
**Purpose:** Full-screen image slider with Ken Burns effect

**Components:**
- **`HeroSlider.tsx`** (Main slider container)
  - Full viewport height (`h-screen`)
  - Swiper.js or Embla Carousel integration
  - Autoplay with pause on hover
  - Navigation dots (minimal, gold accent)
  - Smooth transitions between slides

- **`HeroSlide.tsx`** (Individual slide)
  - Full-screen background image
  - Overlay text (heading + optional subtitle)
  - Typography: Large serif heading, elegant positioning
  - Responsive text scaling

- **`KenBurnsEffect.tsx`** (Image animation)
  - Slow zoom-in effect on images
  - CSS keyframes or Framer Motion
  - Duration: 15-20 seconds per image
  - Smooth, cinematic feel

**Slider Data Structure:**
```typescript
interface HeroSlide {
  id: string;
  image: string;
  heading: string;
  subtitle?: string;
  overlayOpacity?: number;
}
```

**Technical Requirements:**
- Optimized images (Next.js `Image` component or `next/image`)
- Lazy loading for performance
- Responsive image sizes
- Accessibility: ARIA labels, keyboard navigation

---

### **PHASE 3: Implementation Steps**

#### 3.1 Core Layout & Metadata
- [ ] Create `app/layout.tsx`:
  - SEO metadata (title, description, Open Graph)
  - Font imports (next/font)
  - Global providers (if needed)
  - Root HTML structure

- [ ] Create `app/page.tsx`:
  - Single-page structure
  - Section components in order
  - Smooth scroll behavior

#### 3.2 Preloader Implementation
- [ ] Build `Preloader.tsx` with animation timeline
- [ ] Implement `LogoAnimation.tsx` with gold gradient
- [ ] Integrate Framer Motion animations
- [ ] Test animation sequence and timing
- [ ] Handle logo transition to header

#### 3.3 Header Implementation
- [ ] Build `Header.tsx` with fixed positioning
- [ ] Create `Navigation.tsx` with smooth scroll
- [ ] Integrate logo from preloader
- [ ] Add responsive mobile menu
- [ ] Implement scroll-based background change (optional)

#### 3.4 Hero Slider Implementation
- [ ] Set up Swiper/Embla in `HeroSlider.tsx`
- [ ] Create `HeroSlide.tsx` component
- [ ] Implement `KenBurnsEffect.tsx` with CSS/Tailwind
- [ ] Add slide data to `lib/constants.ts`
- [ ] Optimize images (Next.js Image component)
- [ ] Add navigation dots and controls
- [ ] Implement responsive breakpoints

#### 3.5 Styling & Polish
- [ ] Apply Tailwind utility classes throughout
- [ ] Fine-tune typography hierarchy
- [ ] Adjust spacing and whitespace
- [ ] Test color contrast (accessibility)
- [ ] Add hover states and micro-interactions

#### 3.6 Performance Optimization
- [ ] Image optimization (WebP, sizes, lazy loading)
- [ ] Code splitting (if needed)
- [ ] Font loading optimization
- [ ] Reduce JavaScript bundle size
- [ ] Test Lighthouse scores (LCP, FID, CLS)

#### 3.7 Accessibility & SEO
- [ ] Add semantic HTML5 tags
- [ ] Implement ARIA labels
- [ ] Keyboard navigation support
- [ ] Screen reader testing
- [ ] Meta tags and Open Graph
- [ ] Structured data (JSON-LD) for business

#### 3.8 Responsive Design
- [ ] Mobile-first breakpoints
- [ ] Tablet optimization
- [ ] Desktop refinement
- [ ] Test on multiple devices
- [ ] Touch gesture support for slider

#### 3.9 Testing & Refinement
- [ ] Cross-browser testing
- [ ] Animation performance check
- [ ] Load time optimization
- [ ] User experience review
- [ ] Final design polish

---

## 🎨 Design Specifications

### Color Palette
- **Primary Gold:** `#C5A059`
- **Gold Light:** `#D4B575`
- **Gold Dark:** `#A68A4A`
- **Background Dark:** `#0A0A0A`
- **Background Medium:** `#1A1A1A`
- **Text Light:** `#E5E5E5`
- **Text Medium:** `#CCCCCC`
- **Text Dark:** `#999999`

### Typography
- **Headings:** Playfair Display (serif, elegant)
  - Hero: 4xl-6xl (responsive)
  - Section: 3xl-4xl
- **Body:** Inter (sans-serif, clean)
  - Base: 16px
  - Line height: 1.6-1.8

### Spacing
- Generous whitespace (luxury feel)
- Section padding: 80-120px (desktop)
- Mobile: 40-60px

### Animation Principles
- Smooth, cinematic transitions
- Slow, deliberate movements
- Gold accent on interactions
- No jarring or fast animations

---

## 📦 Dependencies Summary

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "swiper": "^11.0.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

---

## ✅ Success Criteria

1. **Visual:** Matches luxury, minimalist, cinematic aesthetic
2. **Performance:** Lighthouse score > 90 (all metrics)
3. **Accessibility:** WCAG 2.1 AA compliance
4. **Responsive:** Flawless on mobile, tablet, desktop
5. **Animation:** Smooth, premium feel, no jank
6. **SEO:** Proper metadata, semantic HTML, fast LCP

---

## 🚀 Next Steps

**After approval, we will:**
1. Start with Phase 1 (Setup & Configuration)
2. Initialize Next.js project
3. Configure Tailwind with custom theme
4. Set up typography and project structure
5. Proceed systematically through each phase

---

**Ready to begin?** Please confirm to proceed with Phase 1 implementation.
