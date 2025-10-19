# Humanforce Workforce Management — Landing Page

> A modern landing page prototype built with **Next.js 15 (App Router)** and **Tailwind CSS v4**, featuring CMS-driven content architecture and integrated A/B testing for CTA performance optimization.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
[![Edge Runtime](https://img.shields.io/badge/Runtime-Edge-orange)](https://vercel.com/docs/concepts/functions/edge-functions)

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Architecture Overview](#-architecture-overview)
- [Performance & Optimization](#-performance--optimization)
- [A/B Testing](#-ab-testing)
- [Deployment](#-deployment)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Shanti-PL/Humanforce-test.git
cd humanforce-test

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Architecture Overview

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: Edge Runtime for low-latency rendering
- **Styling**: Tailwind CSS v4
- **Content**: JSON-based CMS (mimicking Storyblok schema)
- **Analytics**: Built-in A/B test tracking

### Directory Structure

```
humanforce-test/
├── app/
│   ├── layout.js           # Root layout with JSON-LD metadata
│   ├── page.js             # Main landing page
│   └── globals.css         # Global styles & animations
├── components/
│   ├── sections/
│   │   ├── Header.jsx      # Fixed navigation bar
│   │   ├── Hero_A.jsx      # Control variant
│   │   ├── Hero_B.jsx      # Test variant (animated CTA)
│   │   ├── Features.jsx    # Slick carousel showcase
│   │   ├── Testimonials.jsx # Customer reviews with "View More"
│   │   ├── Contact.jsx     # Contact form
│   │   └── Footer.jsx      # Site footer
│   └── ABTestHero.jsx      # A/B test wrapper component
├── lib/
│   ├── loadContent.js      # Edge-optimized content fetcher
│   └── abTestTracking.js   # Analytics tracking utilities
└── public/
    ├── content/
    │   ├── landing.json    # Page content
    │   └── general.json    # Global settings
    └── images/             # Static assets
```

### Content Flow

```
JSON Files (landing.json, general.json)
    ↓
lib/loadContent.js (Edge fetch with caching)
    ↓
app/page.js (Server Component)
    ↓
Section Components (Hero, Features, etc.)
```

Each section is modular and maps 1-to-1 with its JSON content structure.

---

## ⚡ Performance & Optimization

### Performance Features

| Feature                | Implementation                        | Benefit                               |
| ---------------------- | ------------------------------------- | ------------------------------------- |
| **Edge Runtime**       | Vercel global edge network            | Ultra-low latency rendering           |
| **Static Caching**     | `revalidate: 60` on JSON fetch        | Reduced server load                   |
| **Image Optimization** | WebP format + responsive lazy loading | Faster page loads & reduced bandwidth |
| **CLS Prevention**     | Fixed aspect ratios & min-heights     | Better Core Web Vitals                |
| **Code Splitting**     | Dynamic imports for A/B test          | Smaller initial bundle                |

### Accessibility (WCAG 2.1 AA)

✅ Semantic HTML structure (`<header>`, `<main>`, `<section>`, `<footer>`)  
✅ Comprehensive alt text for all images  
✅ Keyboard-navigable CTAs and forms  
✅ Sufficient color contrast ratios  
✅ Logical heading hierarchy (h1 → h2 → h3)  
✅ ARIA labels where appropriate

### SEO & Structured Data

- **Dynamic Metadata**: Title and description from JSON
- **JSON-LD Schema**: Valid structured data injected in `<head>`

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Humanforce Workforce Management",
  "description": "Optimise scheduling, time & attendance, and labour costs.",
  "publisher": { "@type": "Organization", "name": "Humanforce" }
}
```

Validated via [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 🧪 A/B Testing

### Test Setup

The A/B test compares two Hero section variants to measure CTA engagement:

| Variant    | Description                                    |
| ---------- | ---------------------------------------------- |
| **Hero A** | Standard design with static CTAs               |
| **Hero B** | Enhanced with jittery animation on primary CTA |

### Implementation

**Component**: `components/ABTestHero.jsx`

**Assignment Logic**:

- 50/50 random split on first visit
- Persisted in `localStorage` (key: `hero_ab_test_variant`)
- Consistent experience across page reloads

### Tracking Events

```javascript
// Automatic tracking via lib/abTestTracking.js

// When variant is shown
trackVariantView("B");

// When CTA is clicked
trackCTAClick("B", "Book a demo");
```

**Analytics Integration** (ready for GA4):

```javascript
window.gtag("event", "ab_test_cta_click", {
  variant: "B",
  test_name: "hero_cta",
  cta_label: "Book a demo",
});
```

### Testing Locally

```javascript
// In browser console

// Check current variant
localStorage.getItem("hero_ab_test_variant"); // Returns 'A' or 'B'

// Reset to test different variant
resetABTest(); // Then reload page

// Force specific variant (testing only)
localStorage.setItem("hero_ab_test_variant", "B");
```

### Metrics to Track

| Metric                  | Description                      | Data Source          |
| ----------------------- | -------------------------------- | -------------------- |
| **Variant Impressions** | Users assigned to each version   | `trackVariantView()` |
| **CTA Clicks**          | Primary CTA engagement rate      | `trackCTAClick()`    |
| **Conversion Rate**     | Form submissions, sign-ups, etc. | GA4 goal tracking    |

### Analysis Steps

1. **Collect Data**: Run test for minimum 1-2 weeks with sufficient traffic
2. **Filter Events**: Segment by variant in analytics platform
3. **Calculate Metrics**: CTR and conversion rate per variant
4. **Statistical Significance**: Use p-value < 0.05 for confidence
5. **Deploy Winner**: Roll out winning variant or iterate further

> **Note**: A p-value below 0.05 means less than 5% chance the observed difference is random, indicating statistical significance.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Features**:

- ✅ Edge caching and global CDN
- ✅ Incremental revalidation for JSON content
- ✅ Automatic builds on Git push
- ✅ Zero-config deployment

### Environment Variables

No environment variables required for basic deployment. For analytics integration, add:

```env
NEXT_PUBLIC_GA_ID=your_ga_tracking_id
```

---

## 📝 Key Features

- ✨ **Edge-First Architecture**: Sub-100ms response times globally
- 🎨 **Modern UI/UX**: Tailwind CSS v4 with custom animations
- 🎪 **Interactive Elements**: Slick carousels, animated CTAs
- 📊 **A/B Testing Ready**: Built-in experimentation framework
- 🔄 **CMS-Ready**: JSON-based content, easy migration to Storyblok/Contentful
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 🚀 **Optimized**: Core Web Vitals focused

---

## 🛠️ Development Notes

### Code Quality

- ESLint configuration for Next.js
- Consistent component structure
- Modular section-based architecture

### Future Enhancements

- [ ] Integration with real CMS (Storyblok, Sanity)
- [ ] Advanced analytics dashboard for A/B tests
- [ ] Multi-language support (i18n)
- [ ] More interactive animations and micro-interactions

---

## 📄 License

This project is developed for the Humanforce Developer Technical Exercise.

---

## 👤 Author

**Jack Fan**  
📅 October 2025  
🎯 Humanforce Developer Technical Exercise

**Tech Stack**: Next.js • Tailwind CSS • Edge Runtime • JSON CMS • A/B Testing

---

## 🤝 Contributing

This is a technical exercise project. For questions or feedback, please reach out to the author.
