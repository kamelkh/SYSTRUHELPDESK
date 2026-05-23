# Turk — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SYSTRU TECHNOLOGY SaaS
- **Email dep:** `nodemailer` already in `package.json`
- **Contact info in code:** phone `04-885-3184`, WhatsApp `054-325-7788`, email `systru@systru.co.il`
- **SMTP env vars needed:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- **Phase 2 need:** send internal notification email when diagnostic lead is created
- **Phase 5 need:** PDF quote generation, email delivery to customer
- **Phase 6 need:** PDF risk assessment report generation

## Integration Libs to Build

- `platform/src/lib/email.ts` — nodemailer wrapper
- `platform/src/lib/whatsapp.ts` — WhatsApp notification
- `platform/src/lib/pdf.ts` — PDF generation utility

## Learnings

