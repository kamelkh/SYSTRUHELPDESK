# Saul — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS (Israel)
- **Regulatory materials:** `docs/regulatory-materials/ciso/` — contains SCF (Secure Controls Framework)
- **Auth:** NextAuth v5, JWT, roles: ADMIN/SALES/TECH — needs brute-force protection
- **Phase 6 scope:** DPO/CISO Risk Assessment Engine + PDF report
- **Assessment model:** `platform/src/models/Assessment.ts` — already scaffolded

## Security Concerns to Audit

1. All API routes: validate inputs with zod before any DB operation
2. Admin route: verify `getServerSession` + role check on every request
3. MongoDB connection string: must not appear in client bundle
4. JWT secret: check `AUTH_SECRET` env var is set and strong
5. Rate limiting: `/api/leads` and `/api/diagnostic` need rate limiting to prevent spam

## Regulatory Frameworks in Scope

- Israeli Privacy Protection Law 2017 (mandatory)
- GDPR (for EU visitors)
- ISO 27001 (customer requirement — enterprise B2B)
- SOC2 Type II (roadmap)

## Learnings

