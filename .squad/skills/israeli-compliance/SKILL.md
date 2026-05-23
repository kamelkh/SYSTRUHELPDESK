# israeli-compliance

## Purpose
Use when reviewing or writing content, forms, API routes, or features that handle personal data or security for Israeli business context.

## Confidence: high

## Patterns

### Israeli Privacy Protection Law 2017 — minimum requirements
- Every form collecting PII (name, email, phone) must show a privacy notice
- Users must be able to request deletion of their data
- Data may not be transferred outside Israel without consent (or legal basis)
- Retention: define and enforce a retention period for all PII models (default suggestion: 2 years)

### GDPR (applies to EU visitors)
- Legal basis for processing: legitimate interest or consent
- Right of erasure: `DELETE /api/leads/:id` (admin only, logged)
- Data minimization: only collect fields actually needed

### Required privacy notice wording (Hebrew)
```
"המידע שתמסור ישמש לצורך יצירת קשר בלבד ולא יועבר לצד שלישי ללא הסכמתך."
```

### Forms with consent
- Contact form: checkbox "קראתי ואני מסכים/ה למדיניות הפרטיות"
- Diagnostic wizard: consent before submitting answers
- Link to `/privacy` from every form

### CISO risk scoring buckets (Phase 6)
- Critical: data breach risk, unauthorized access
- High: missing controls, exposed APIs
- Medium: misconfiguration, outdated software
- Low: documentation gaps, minor process issues

### Israeli phone format validation
```ts
// Valid: 05X-XXXXXXX (mobile), 0X-XXXXXXX (landline), +972...
const IL_PHONE = /^(\+972|0)(5[0-9]|[23489])-?\d{7}$/;
```

## Applies to
Frank, Saul, Tess, Linus, Danny
