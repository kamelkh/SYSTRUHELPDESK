# Livingston — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS
- **Test framework:** Check `platform/package.json` — likely Vitest (Next.js 16 default tooling)
- **Critical paths:** login, contact form → Lead creation, diagnostic wizard → Lead, admin RBAC
- **Auth roles:** ADMIN / SALES / TECH + unauthenticated public
- **i18n routes:** `/he/*` (default) and `/en/*` must both work
- **Lighthouse targets:** Performance > 90, Accessibility > 95

## Test Priority Order

1. NextAuth login (credentials + JWT, role enforcement)
2. `POST /api/leads` — contact form validation + DB write
3. `POST /api/diagnostic` — wizard scoring + Lead creation
4. Admin page RBAC (ADMIN only, redirect if SALES/TECH/unauth)
5. RTL rendering of public pages
6. Lighthouse audit on home and helpdesk pages

## Learnings

