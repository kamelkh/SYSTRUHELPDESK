# Linus — History

## Project Knowledge

- **Project:** SYSTRUHELPDESK — SaaS, SYSTRU TECHNOLOGY
- **DB:** MongoDB 7 at `localhost:27017` (Docker), mongo-express at `:8081`
- **Connection:** `src/lib/db.ts` — cached Mongoose connection via `global._mongoose`
- **Auth:** `src/lib/auth.ts` — NextAuth v5, credentials + JWT, roles: ADMIN/SALES/TECH
- **Admin seed:** `scripts/seed-admin.ts` → `admin@systru.co.il` / `ChangeMe!123`
- **Models location:** `platform/src/models/`
  - `User.ts` — users with role field
  - `Lead.ts` — leads from website/diagnostic
  - `Customer.ts` — converted customers
  - `Quote.ts` — service quotes
  - `Assessment.ts` — CISO/DPO risk assessments
  - `ServiceCatalog.ts` — service catalog

## API Routes Needed (by Phase)

- Phase 1: `POST /api/leads` — contact form → Lead with `source=WEBSITE`
- Phase 2: `POST /api/diagnostic` — wizard → Lead with `source=DIAGNOSTIC`, answers, recommendation
- Phase 3: Admin CRUD routes
- Phase 5: `POST /api/quotes`
- Phase 6: `POST /api/assessments`

## Learnings

