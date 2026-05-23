# SYSTRU Platform

Next.js 16 + MongoDB + NextAuth full-stack platform for **SYSTRU TECHNOLOGY**.

## 📚 Documentation

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — מבנה הקוד, stack, design patterns
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** — מדריך מלא להעברה לשרת + Nginx + HTTPS + גיבויים
- **[docs/ROADMAP.md](docs/ROADMAP.md)** — תוכנית כל ה-Phases (מה נשאר לבנות)

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** with SYSTRU brand tokens
- **MongoDB 7** + **Mongoose**
- **NextAuth.js v5** (Credentials, JWT, roles: ADMIN / SALES / TECH)
- **next-intl** for `he` (default, RTL) + `en`
- **react-hook-form** + **zod**, **nodemailer**, **lucide-react**

## Quick start

### 1. Start MongoDB locally
```powershell
npm run docker:up
```
Mongo at `localhost:27017`, mongo-express UI at <http://localhost:8081> (admin/admin).

### 2. Configure environment
Copy `.env.example` → `.env.local` and review values. `.env.local` is already populated with safe local defaults.

### 3. Seed the initial admin
```powershell
npm run seed:admin
```
Creates `admin@systru.co.il` / `ChangeMe!123` (override via `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

### 4. Run dev server
```powershell
npm run dev
```
- Public site (Hebrew, default): <http://localhost:3000/>
- Public site (English): <http://localhost:3000/en>
- Login: <http://localhost:3000/login>
- Admin (auth required): <http://localhost:3000/admin>

## Folder structure

```
src/
  app/
    [locale]/
      layout.tsx          # locale layout (RTL/LTR, fonts, providers)
      page.tsx            # public home
      login/page.tsx
      admin/page.tsx
    api/auth/[...nextauth]/route.ts
    globals.css
  components/
    LoginForm.tsx
    Providers.tsx
  i18n/
    routing.ts, navigation.ts, request.ts
  lib/
    db.ts                 # cached Mongoose connection
    auth.ts               # NextAuth config
    utils.ts
  models/
    User.ts, Lead.ts, Customer.ts,
    ServiceCatalog.ts, Quote.ts, Assessment.ts
  proxy.ts                # Next 16 proxy — i18n + auth guard
messages/
  he.json, en.json
scripts/
  seed-admin.ts
docker-compose.yml
```

## Roles

- **ADMIN** — full access
- **SALES** — leads, customers, quotes
- **TECH** — risk assessments (CISO / DPO / ISO 27001)

Customers have **no platform access**. Quotes are delivered exclusively via email.

## Phase status

- [x] **Phase 0** — Foundation
- [ ] Phase 1 — Port landing pages
- [ ] Phase 2 — Diagnostic questionnaire wizard
- [ ] Phase 3 — Admin shell
- [ ] Phase 4 — CRM (Leads / Customers UI)
- [ ] Phase 5 — Quote builder + SMTP email + PDF
- [ ] Phase 6 — DPO / CISO risk assessment engine + PDF report
