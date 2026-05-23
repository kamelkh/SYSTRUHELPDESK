# Frank — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS (Israel)
- **Regulatory materials:** `docs/regulatory-materials/dpo/` — DPO reference materials
- **Forms collecting PII:** Contact form (name, phone, email), Diagnostic wizard (company info, industry)
- **Routes needing privacy notices:** `/contact`, `/diagnostic`
- **Routes needing content:** `/privacy`, `/terms`
- **Models with PII:** `Lead` (name, email, phone), `Customer`, `User`

## Privacy Actions Needed

- Add privacy notice to ContactForm component (Phase 1)
- Add consent checkbox to Diagnostic wizard (Phase 2)
- Write privacy policy content for `/privacy` (Phase 1)
- Write terms of service content for `/terms` (Phase 1)
- Define data retention for Lead model (default: 2 years for Israeli law)
- Right-to-erasure: `DELETE /api/leads/:id` (admin only)

## Learnings

