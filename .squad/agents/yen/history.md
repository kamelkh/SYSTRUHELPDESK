# Yen — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS, Hebrew-first RTL
- **Design system:** Tailwind v4 CSS custom properties (tokens in `platform/src/app/globals.css`)
- **Icons:** lucide-react
- **Fonts:** Check `platform/src/app/[locale]/layout.tsx` for font configuration
- **Current home:** Has Hero gradient section (dark blue → SYSTRU blue) + quick info strip

## Design Priorities by Phase

- Phase 1: Full visual design for all public pages — brand consistency with index.html/saas.html
- Phase 2: Diagnostic wizard UX — step-by-step, progress bar, Hebrew flow
- Phase 3: Admin dashboard UI — clean, data-dense, technician-friendly
- Phase 5: Quote builder — professional, printable design

## RTL Notes

- Hebrew is default (`dir="rtl"`) — all layouts mirror from right
- English is LTR — layout must flip naturally
- Use logical CSS properties where possible (`margin-inline-start` not `margin-left`)
- Test both directions in every component

## Learnings

