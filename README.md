# Ultimate Graphics® — Official Next.js & React (TypeScript) Architecture

> **Established in 2014.** Commercial architectural signage, illuminated channel letters, 5-axis CNC routing, 12kW fiber laser cutting, and commercial fleet branding. Engineered and manufactured entirely in-house in London, UK.

---

## ⚡ Next.js 14 + React 18 + TypeScript

The codebase is built as a pure, idiomatic **Next.js 14 App Router + React + TypeScript** project with zero raw HTML strings and zero bloated minified chunks. Page sizes are ~197 bytes with instant sub-50ms hot-reloads.

- **Production Server**: `next start -p 5174` (Port `http://localhost:5174/`)
- **Development Server**: `npm run dev`
- **Build Command**: `npm run build`
- **10-Strip Reloading Curtain**: Rotating single solid palettes (Red, Yellow, Pink, Blue, Orange, Emerald, Purple) with center `main-logo.png`
- **Type Safety**: 100% strict TypeScript across all components and data models

---

## 📁 Clean Project Structure

```text
e:\mattis\
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout with Curtain, Navbar, Footer & Favicon
│   ├── page.tsx                # Homepage composed of clean React components
│   ├── globals.css             # Dark theme styles, tokens & typography
│   ├── about/page.tsx          # 24,000 sq ft facility & in-house machinery
│   ├── work/
│   │   ├── page.tsx            # Portfolio grid
│   │   └── [slug]/page.tsx     # Dynamic case study pages (SSG)
│   ├── blog/
│   │   ├── page.tsx            # Technical insights & knowledge base
│   │   └── [slug]/page.tsx     # Technical article reader (SSG)
│   ├── contact/page.tsx        # Direct contact, phone, email & 2-hr quote SLA
│   ├── legal/
│   │   ├── privacy-policy/page.tsx
│   │   └── terms-of-service/page.tsx
│   └── not-found.tsx           # Custom 404 page
├── components/                 # Reusable, modular React TSX components
│   ├── Navbar.tsx              # Header with official symbol-logo.jpeg & mobile drawer
│   ├── Footer.tsx              # Footer with wide footer-logo.png banner & quote form
│   ├── ReloadingCurtain.tsx    # 10-strip stagger wipe curtain with rotating solid color
│   ├── Hero.tsx                # "Engineering before fabrication" hero section
│   ├── ValueProposition.tsx    # Physical credibility signature orange block
│   ├── ServicesSection.tsx     # In-house machinery & capabilities grid
│   └── FeaturedProjects.tsx    # Recent installations showcase
├── config/
│   └── site.ts                 # Central studio info: phone, email, address, hours, SLA, logos
├── data/                       # Typed content data files
│   ├── projects.ts             # Portfolio case studies (slugs, metrics, tags, imagery)
│   ├── services.ts             # In-house fabrication & signage capabilities
│   └── blog.ts                 # Technical guides & articles
└── public/
    └── logos/
        ├── main-logo.png       # Primary logo with symbol + wordmark (Curtain center)
        ├── footer-logo.png     # Architectural wide banner logo (Footer)
        └── symbol-logo.jpeg    # High-res emblem (Navbar & Favicon)
```

---

## ✏️ Making Quick Changes

- **Update company info, phone, address, or hours**: Edit [`config/site.ts`](file:///e:/mattis/config/site.ts)
- **Add or edit a portfolio project**: Edit [`data/projects.ts`](file:///e:/mattis/data/projects.ts)
- **Add or edit a service or capability**: Edit [`data/services.ts`](file:///e:/mattis/data/services.ts)
- **Add or edit a blog article**: Edit [`data/blog.ts`](file:///e:/mattis/data/blog.ts)
- **Adjust header navigation or buttons**: Edit [`components/Navbar.tsx`](file:///e:/mattis/components/Navbar.tsx)
- **Adjust footer or quote form**: Edit [`components/Footer.tsx`](file:///e:/mattis/components/Footer.tsx)

---

## 🛠️ CLI Commands

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm start
```
