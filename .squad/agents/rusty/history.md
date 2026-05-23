# Rusty — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — Hebrew-first RTL SaaS, SYSTRU TECHNOLOGY
- **Stack:** Next.js 16, React 19, Tailwind v4, next-intl (he default, en secondary)
- **Design tokens:** `--color-accent`, `--color-brand`, `--color-surface`, `--color-line`, `--color-muted`, `--color-text`
- **i18n pattern:** `import { Link } from "@/i18n/navigation"` — NOT `next/link`
- **Translation:** `const t = await getTranslations()` (RSC) or `useTranslations()` (client)
- **Locale layout:** `platform/src/app/[locale]/layout.tsx`
- **Current home page:** `platform/src/app/[locale]/page.tsx` — has Hero, quick info strip
- **Static HTML to port:** `index.html`, `saas.html` (workspace root)

## Phase 1 Components Needed

- `src/components/public/Header.tsx`
- `src/components/public/Footer.tsx`
- `src/components/public/MobileBar.tsx` — bottom action bar (phone/WhatsApp/quote)
- `src/components/public/Hero.tsx`
- `src/components/public/ServicesGrid.tsx`
- `src/components/public/LogoStrip.tsx`
- `src/components/public/TestimonialsGrid.tsx`
- `src/components/public/PricingTiers.tsx`
- `src/components/public/FAQ.tsx`
- `src/components/public/ContactForm.tsx`
- `src/components/public/CTABanner.tsx`

## Learnings

