# SYSTRUHELPDESK — Repository

מאגר העבודה של SYSTRU TECHNOLOGY: דפי נחיתה סטטיים + פלטפורמה מלאה (Next.js + MongoDB).

---

## מבנה הריפו

```
SYSTRUHELPDESK/
├── index.html                      # דף נחיתה ראשי (B2B) — סטטי, RTL
├── saas.html                       # דף מוצר "SYSTRU HelpDesk AI" — סטטי, RTL
├── platform/                       # ← הפלטפורמה החדשה (Next.js)
│   ├── README.md                   # התחל מכאן
│   └── docs/
│       ├── ARCHITECTURE.md         # מבנה הקוד + decisions
│       ├── DEPLOYMENT.md           # העברה לשרת + Nginx + HTTPS
│       └── ROADMAP.md              # Phases 1–6 + איך ממשיכים
├── docs/regulatory-materials/      # חומרי DPO/CISO (מקור ל-Phase 6)
│   ├── ciso/                       # 31 קבצים
│   └── dpo/                        # 5 קבצים
└── skills/                         # תיעוד skills (לא קשור לפלטפורמה)
```

---

## איפה הקוד החדש

כל הקוד הפלטפורמה ב-**[`platform/`](platform/)**. הדפים הסטטיים ([index.html](index.html), [saas.html](saas.html)) הם מקור ה-design tokens ויעברו port ל-Next.js ב-Phase 1.

---

## מה כבר עובד (Phase 0 ✅)

- ✅ Next.js 16 + Tailwind v4 + TypeScript scaffold
- ✅ MongoDB + Mongoose עם cached connection
- ✅ NextAuth v5 (Credentials + JWT) — תפקידים: ADMIN / SALES / TECH
- ✅ next-intl: עברית default (RTL) + אנגלית
- ✅ 6 Mongoose models: User, Lead, Customer, ServiceCatalog, Quote, Assessment
- ✅ Layout עם brand colors + Space Grotesk + Inter
- ✅ Docker Compose (dev + prod), Dockerfile multi-stage
- ✅ Seed script ל-admin ראשון
- ✅ `npm run build` עובר נקי

---

## להתחיל לעבוד מקומית

```powershell
cd platform
npm install
npm run docker:up       # מעלה Mongo + mongo-express
npm run seed:admin      # יוצר admin@systru.co.il / ChangeMe!123
npm run dev             # http://localhost:3000
```

ראה [platform/README.md](platform/README.md) לפרטים.

---

## להעביר לשרת

ראה [**platform/docs/DEPLOYMENT.md**](platform/docs/DEPLOYMENT.md) — מדריך מלא צעד-אחר-צעד.

תקציר:
1. Hetzner CX22 (€6/mo) + Ubuntu 24.04
2. Docker + Nginx + Certbot
3. `git clone` → `cp .env.example .env.prod` → ערוך
4. `docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build`
5. Nginx reverse proxy + `certbot --nginx`

---

## להמשיך פיתוח

ראה [**platform/docs/ROADMAP.md**](platform/docs/ROADMAP.md) — פירוט מלא של כל Phase.

הבא בתור: **Phase 1 — Port landing pages** ([index.html](index.html) → רכיבי Next.js).
