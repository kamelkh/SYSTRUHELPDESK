# Isabel — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS
- **Domain:** systru.co.il
- **Target queries (Hebrew):** "שירות helpdesk לעסקים", "CISO חיצוני", "אבטחת מידע לעסקים קטנים", "IT מנוהל ישראל"
- **Target queries (English):** "managed IT Israel", "external CISO Israel", "helpdesk software Israel"
- **Next.js Metadata:** Use `generateMetadata()` in every `page.tsx`

## SEO Implementation Checklist

- [ ] `platform/src/app/sitemap.ts` — generate sitemap for all locale/page combinations
- [ ] `platform/src/app/robots.ts` — robots.txt
- [ ] JSON-LD LocalBusiness on home page
- [ ] JSON-LD FAQPage on FAQ component
- [ ] `hreflang` for he/en alternates
- [ ] OG image for each page (1200x630)
- [ ] `generateMetadata()` on every `page.tsx`
- [ ] Canonical URLs for locale variants

## Core Web Vitals Focus

- Use `next/image` for all images (already in stack)
- RSC by default = faster TTFB
- Minimize client-side JS bundle
- Lazy-load below-the-fold sections (Suspense boundaries)

## Learnings

