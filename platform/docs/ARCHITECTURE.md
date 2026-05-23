# SYSTRU Platform — Architecture

מסמך טכני: מה נבנה, איפה כל דבר, ולמה.

---

## Stack סופי

| שכבה | טכנולוגיה | גרסה |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.6 |
| Runtime UI | React | 19.2 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) | ^4 |
| Database | MongoDB | 7 |
| ODM | Mongoose | latest |
| Auth | NextAuth.js (Auth.js) Credentials + JWT | v5 beta |
| i18n | next-intl | latest |
| Forms | react-hook-form + zod + @hookform/resolvers | latest |
| Email | nodemailer | latest |
| Icons | lucide-react | latest |
| Hashing | bcryptjs | latest |
| Dev tooling | tsx, dotenv | latest |
| Container | Docker + Docker Compose | — |

---

## עץ קבצים

```
platform/
├── Dockerfile                       # multi-stage prod image
├── docker-compose.yml               # local dev (mongo + mongo-express)
├── docker-compose.prod.yml          # prod (mongo + app)
├── .dockerignore
├── .env.example                     # template
├── .env.local                       # dev secrets (לא ב-git)
├── next.config.ts                   # next-intl plugin + serverExternalPackages
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs               # tailwind v4 postcss
├── package.json                     # scripts: dev/build/start/lint/seed:admin/docker:*
├── README.md
├── messages/
│   ├── he.json                      # מקור עברית (default)
│   └── en.json                      # מקור אנגלית
├── public/                          # static assets
├── scripts/
│   └── seed-admin.ts                # יוצר admin ראשון
├── docs/                            # מסמכי תיעוד
│   ├── ARCHITECTURE.md              # ← אתה כאן
│   ├── DEPLOYMENT.md
│   └── ROADMAP.md
└── src/
    ├── proxy.ts                     # Next 16 proxy (i18n routing + admin guard)
    ├── i18n/
    │   ├── routing.ts               # locales: he (default) + en
    │   ├── navigation.ts            # Link/redirect/usePathname מותאמים ל-locale
    │   └── request.ts               # טוען messages לפי locale
    ├── lib/
    │   ├── db.ts                    # cached Mongoose connection
    │   ├── auth.ts                  # NextAuth config + טיפוסי Session
    │   └── utils.ts                 # cn, formatCurrency, formatDate
    ├── models/                      # Mongoose schemas
    │   ├── User.ts                  # ADMIN/SALES/TECH
    │   ├── Lead.ts                  # NEW→...→WON/LOST
    │   ├── Customer.ts
    │   ├── ServiceCatalog.ts        # קטלוג שירותים + מחירים
    │   ├── Quote.ts                 # הצעות מחיר (נשלחות במייל בלבד)
    │   └── Assessment.ts            # סקרי סיכונים / DPO / CISO / ISO27001
    ├── components/
    │   ├── Providers.tsx            # SessionProvider
    │   └── LoginForm.tsx            # client form
    └── app/
        ├── globals.css              # Tailwind v4 + brand tokens
        ├── api/
        │   └── auth/[...nextauth]/
        │       └── route.ts         # NextAuth handlers
        └── [locale]/                # ← הכל מתחת ל-locale, אין root layout
            ├── layout.tsx           # html/body, RTL/LTR, fonts, NextIntl+Session providers
            ├── page.tsx             # דף הבית הפומבי
            ├── login/page.tsx       # דף התחברות (server)
            └── admin/page.tsx       # דשבורד (auth-gated)
```

---

## דפוסי עיצוב חשובים

### 1. אין root layout, יש layout תחת `[locale]`
זה הדפוס המומלץ של **next-intl** עם App Router. ה-`<html>` ו-`<body>` נמצאים ב-`src/app/[locale]/layout.tsx`. ה-`dir` נקבע דינמית:
```tsx
const dir = locale === "he" ? "rtl" : "ltr";
return <html lang={locale} dir={dir}>...</html>
```

### 2. Locale routing — "as-needed"
- `/` → עברית (ברירת מחדל, ללא prefix)
- `/en` → אנגלית

מוגדר ב-[src/i18n/routing.ts](../src/i18n/routing.ts):
```ts
localePrefix: "as-needed"
```

### 3. Mongoose connection caching
ב-[src/lib/db.ts](../src/lib/db.ts) — שומרים את החיבור על `global.mongoose` כדי שב-hot reload (dev) או בקריאות concurrent (prod serverless) לא ייפתחו חיבורים מרובים.

### 4. NextAuth v5 — `auth()` בכל מקום
- ב-Server Component / API route: `const session = await auth()`
- ב-Client: `useSession()` (דרך `Providers.tsx` שעוטף ב-`SessionProvider`)
- ב-Proxy: `await auth()` — כן, אפשר ב-edge proxy

### 5. הגנה על routes
ב-[src/proxy.ts](../src/proxy.ts):
```ts
if (isAdminPath(pathname)) {
  const session = await auth();
  if (!session) return NextResponse.redirect(loginUrl);
}
return intlMiddleware(req);
```

### 6. Tailwind v4 brand tokens
ב-[src/app/globals.css](../src/app/globals.css) משתמשים ב-`@theme inline` כדי לחשוף CSS variables ככלי Tailwind:
```css
@theme inline {
  --color-brand: var(--color-brand);
  --color-brand-2: var(--color-brand-2);
  --color-accent: var(--color-accent);
  ...
}
```
שימוש ב-JSX:
```tsx
<button className="bg-[color:var(--color-brand)] text-white" />
```

### 7. Quote = Email only
המודל [Quote](../src/models/Quote.ts) כולל `pdfPath`, `emailSentAt`, `emailMessageId`, `acceptedAt`. **אין** customer portal — הכל יוצא במייל. ראה [ROADMAP — Phase 5](./ROADMAP.md#phase-5).

---

## Brand tokens (מתוך index.html המקורי)

| Token | Value | שימוש |
|---|---|---|
| `--color-brand` | `#1A3972` | טקסט primary, כפתורי CTA |
| `--color-brand-2` | `#0E7EB5` | hover, links |
| `--color-accent` | `#29ABE2` | accents, badges, CTA secondary |
| `--color-bg` | `#EBF2FA` | רקע כללי |
| `--color-surface` | `#FFFFFF` | כרטיסים |
| `--color-surface-soft` | `#F0F6FD` | רקע משני |
| `--color-text` | `#0D1B2A` | טקסט גוף |
| `--color-muted` | `#4A5A72` | טקסט משני |
| `--color-line` | `#C8D8EC` | מסגרות, חוצצים |
| `--gradient-brand` | brand→brand-2→accent 135° | כפתורים מרשימים |
| `--gradient-hero` | כהה→brand→accent עם overlay | hero של דף הבית |

**גופנים**: `Space Grotesk` (display, h1-h4) + `Inter` (body) — דרך Google Fonts ב-`<head>`.

---

## תפקידים (Roles)

| Role | הרשאה |
|---|---|
| `ADMIN` | הכל — משתמשים, קטלוג, הגדרות, leads, customers, quotes, assessments |
| `SALES` | leads, customers, quotes |
| `TECH` | customers (read), assessments (CRUD) |

**אין** role של `CUSTOMER` — לקוחות לא ניגשים לפלטפורמה.

---

## הרחבת המודלים (Phases הבאות)

| Phase | מודלים חדשים שצריך להוסיף |
|---|---|
| Phase 4 | (אין — קיימים) |
| Phase 5 | `Contract`, `Invoice` (חוזה ביצוע + חשבונית) |
| Phase 6 | `QuestionnaireTemplate`, `AssessmentTemplate` (תבניות שאלון) |
| Phase 7 (בוטל) | — |

---

## Gotchas שכבר פתרנו

| Gotcha | פתרון |
|---|---|
| Next 16 הוציא משימוש את `middleware.ts` | משתמשים ב-`proxy.ts` |
| `declare module "next-auth/jwt"` נכשל ב-v5 beta | רק `declare module "next-auth"` |
| `useSearchParams` חייב Suspense | פיצול ל-server page + client `LoginForm` |
| `create_file` עם paths שמכילים `[brackets]` | PowerShell `Set-Content -LiteralPath` |
| Mongoose + Next bundling | `serverExternalPackages: ["mongoose", "bcryptjs"]` ב-`next.config.ts` |
| Node v23.1 + eslint-visitor-keys warning | non-blocking; אופציה: שדרוג ל-Node 24 LTS |

---

## פקודות שימושיות

```powershell
# Dev
cd platform
npm run docker:up           # mongo + mongo-express
npm run dev                 # http://localhost:3000
npm run seed:admin          # יוצר admin ראשון

# Build + lint
npm run build
npm run lint

# Prod (על השרת)
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
docker compose -f docker-compose.prod.yml exec app npx tsx scripts/seed-admin.ts

# Logs
docker compose logs -f app
docker compose logs -f mongo
```
