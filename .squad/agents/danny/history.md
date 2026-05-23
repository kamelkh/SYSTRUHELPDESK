# Danny — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SaaS helpdesk for SYSTRU TECHNOLOGY, Israel
- **Stack:** Next.js 16, TypeScript, Tailwind v4, MongoDB 7, NextAuth v5, next-intl (he/en RTL), Docker
- **User:** Kamel (kamelkh)
- **Team hired:** 2026-05-23 — Ocean's Eleven cast

## Roadmap Status

- ✅ Phase 0 — Foundation (complete: DB, auth, i18n, Docker, 9 routes)
- 🟡 Phase 1 — Port landing pages (next)
- ⬜ Phase 2 — Diagnostic wizard
- ⬜ Phase 3 — Admin shell
- ⬜ Phase 4 — CRM (Leads/Customers)
- ⬜ Phase 5 — Quote builder + SMTP + PDF
- ⬜ Phase 6 — DPO/CISO Risk Assessment Engine + PDF Report

## Key Files

- `platform/src/app/[locale]/page.tsx` — home page (uses next-intl translations)
- `platform/src/proxy.ts` — i18n routing + admin guard
- `platform/src/lib/auth.ts` — NextAuth v5 config
- `platform/src/lib/db.ts` — cached Mongoose connection
- `platform/messages/he.json` / `en.json` — translation keys
- `platform/docker-compose.yml` / `docker-compose.prod.yml`

## Learnings

