# SYSTRU Platform — Roadmap & Continuation Guide

מסמך זה הוא **המפת דרכים** של כל ה-Phases. השתמש בו כדי להמשיך פיתוח מאיפה שעצרנו.

---

## סטטוס נוכחי

✅ **Phase 0 — Foundation** הושלם. `npm run build` עובר. 9 routes מתאמתים. מסד נתונים, auth, i18n, RTL, models, Docker — הכל מוכן.

```
✅ Phase 0  — Foundation
🟡 Phase 1  — Port landing pages    ← הבא בתור
⬜ Phase 2  — Diagnostic wizard
⬜ Phase 3  — Admin shell + auth pages
⬜ Phase 4  — CRM (Leads/Customers)
⬜ Phase 5  — Quote builder + SMTP + PDF
⬜ Phase 6  — DPO/CISO Risk Assessment Engine + PDF Report
```

---

## Phase 1 — Port landing pages

**מטרה:** להעביר את [../index.html](../../index.html) ו-[../saas.html](../../saas.html) לרכיבי Next.js בעברית + אנגלית.

### משימות

1. **רכיבים משותפים** ב-`src/components/public/`:
   - `Header.tsx` — sticky nav עם לוגו + תפריט
   - `Footer.tsx` — קישורי social + copyright
   - `MobileBar.tsx` — bottom action bar במובייל (טלפון/WhatsApp/הצעת מחיר)
   - `Hero.tsx`, `ServicesGrid.tsx`, `LogoStrip.tsx`, `TestimonialsGrid.tsx`, `PricingTiers.tsx`, `FAQ.tsx`, `ContactForm.tsx`, `CTABanner.tsx`

2. **routes** ב-`src/app/[locale]/`:
   - `page.tsx` — דף הבית הראשי (port של `index.html`)
   - `services/page.tsx` — דף שירותים
   - `helpdesk/page.tsx` — port של `saas.html`
   - `about/page.tsx`
   - `contact/page.tsx`
   - `privacy/page.tsx`, `terms/page.tsx`

3. **i18n**: לכל מחרוזת בעמודים האלה — להוסיף מפתחות ל-`messages/he.json` + `messages/en.json`.

4. **API**: `POST /api/leads` — טופס יצירת קשר ← יוצר Lead במסד.

### Acceptance criteria
- כל הדפים מתאמתים בעברית RTL ובאנגלית LTR
- עמידה ב-Lighthouse (perf > 90, a11y > 95)
- טופס "צור קשר" יוצר Lead עם `source=WEBSITE`

---

## Phase 2 — Diagnostic Questionnaire Wizard

**מטרה:** שאלון אבחון רב-שלבי שמזהה איזה שירות מתאים ללקוח ויוצר Lead עם המלצה.

### משימות

1. **תבנית שאלות** — קובץ JSON או `QuestionnaireTemplate` model:
   - מספר עובדים
   - תעשייה
   - יש לכם IT פנימי?
   - יש לכם CISO/DPO?
   - בעיות אבטחה אחרונות?
   - תקני ציות נדרשים (ISO 27001 / SOC2 / GDPR / Privacy Law 2017)?
   - תקציב חודשי משוער

2. **wizard component** ב-`src/components/diagnostic/`:
   - `DiagnosticWizard.tsx` — state machine רב-שלבי (react-hook-form + zod)
   - בר התקדמות
   - יכולת חזרה אחורה
   - validation לכל שלב

3. **route**: `src/app/[locale]/diagnostic/page.tsx`

4. **scoring engine** ב-`src/lib/diagnostic.ts`:
   ```ts
   function recommendService(answers): {
     primaryService: ServiceCode;
     additionalServices: ServiceCode[];
     reasoning: string;
   }
   ```

5. **API**: `POST /api/diagnostic` — יוצר Lead עם:
   - `source: "DIAGNOSTIC"`
   - `diagnosticAnswers: {...}`
   - `diagnosticRecommendation: "..."`
   - שולח מייל פנימי לצוות SYSTRU

### Acceptance criteria
- שאלון של 7–10 שאלות באבחנה של ~3 דקות
- בסיום מציג: "תודה, חזרנו אליך עם הצעה מותאמת"
- ב-admin רואים את ה-Lead עם פירוט תשובות + ההמלצה

---

## Phase 3 — Admin Shell

**מטרה:** layout משותף לכל ה-admin עם sidebar, header, ומבנה ניווט.

### משימות

1. **layout** ב-`src/app/[locale]/admin/layout.tsx`:
   - בודק auth — אם אין session, redirect ל-login
   - sidebar עם קישורים: Dashboard, Leads, Customers, Quotes, Assessments, Catalog, Users (Admin only), Settings
   - header עם שם משתמש + logout
   - תמיכה ב-RTL (sidebar מימין כש-`dir=rtl`)

2. **רכיבים** ב-`src/components/admin/`:
   - `AdminSidebar.tsx`
   - `AdminHeader.tsx`
   - `DataTable.tsx` — טבלה גנרית עם sort/filter/pagination
   - `StatCard.tsx`, `EmptyState.tsx`, `Pagination.tsx`

3. **Dashboard** מעודכן ב-`admin/page.tsx`:
   - kpi cards: לידים החודש, לקוחות חדשים, הצעות פתוחות, הכנסה צפויה
   - גרף לידים לפי חודש (recharts)
   - 5 לידים אחרונים + 5 הצעות מחיר אחרונות

4. **משתמשים** (ADMIN בלבד) ב-`admin/users/`:
   - רשימת משתמשים
   - יצירת משתמש חדש (אימייל + תפקיד + סיסמה זמנית)
   - השבתה/הפעלה

### Acceptance criteria
- כניסה ל-`/admin` ללא session → redirect ל-`/login`
- ניתן ליצור משתמשים נוספים מ-`/admin/users`
- ה-sidebar מתחלף נכון בין RTL ל-LTR

---

## Phase 4 — CRM (Leads + Customers)

**מטרה:** ניהול מלא של לידים ולקוחות כולל המרת lead ללקוח.

### משימות

1. **Leads** ב-`admin/leads/`:
   - `page.tsx` — רשימה עם filters (status, source, assignedTo, date range, search)
   - `[id]/page.tsx` — פרטי ליד מלא:
     - שדות מערכת, תשובות שאלון, ההמלצה
     - timeline של notes
     - שינוי status (kanban-like או select)
     - הקצאה ל-user
     - כפתורים: "צור הצעת מחיר", "המר ללקוח", "סגור (Lost/Won/Archive)"
   - `new/page.tsx` — יצירת ליד ידני

2. **Customers** ב-`admin/customers/`:
   - דומה ל-Leads
   - tab של "Quotes" — כל ההצעות של הלקוח
   - tab של "Assessments" — כל הסקרים של הלקוח

3. **המרה Lead → Customer**:
   - server action שמעתיק שדות רלוונטיים
   - מסמן ב-Lead את `convertedToCustomer`
   - מעדכן status ל-`WON`

4. **API routes**:
   - `GET/POST /api/leads`
   - `GET/PATCH/DELETE /api/leads/[id]`
   - `POST /api/leads/[id]/convert`
   - אותם דברים ל-customers

### Acceptance criteria
- ניתן לנהל את כל מחזור החיים: ליד נכנס מהאתר → SALES מעדכן status → המרה ללקוח
- חיפוש מהיר עם debounce 300ms
- pagination בצד server

---

## Phase 5 — Quote Builder + SMTP + PDF

**🚫 BLOCKER:** דרושים פרטי SMTP אמיתיים (Office365 app password / SendGrid API key).

**מטרה:** בניית הצעות מחיר, שמירה כ-PDF, שליחה במייל ללקוח.

### משימות

1. **Service Catalog** ב-`admin/catalog/`:
   - CRUD מלא ל-`ServiceCatalog`
   - seed ראשוני של שירותי SYSTRU (HelpDesk, Managed IT, CISO retainer, DPO retainer, Risk Assessment, ISO 27001, וכו')

2. **Quote Builder** ב-`admin/quotes/`:
   - `new/page.tsx` — wizard:
     1. בחירת לקוח (או ליד)
     2. הוספת lines מהקטלוג (מחיר, כמות, הנחה לפי שורה)
     3. הגדרת VAT (default 18%), validUntil
     4. תוספת intro/terms
     5. תצוגה מקדימה
     6. שמירה כ-DRAFT
   - `[id]/page.tsx` — צפייה + עריכה + שליחה
   - מספור אוטומטי: `SYSTRU-Q-2026-0001`

3. **PDF Generation** — בחר אחד:
   - **react-pdf/renderer** — פשוט, ב-Node, אבל RTL בעייתי
   - **puppeteer** — מציג HTML→PDF, RTL מושלם, אבל כבד
   
   המלצה: **puppeteer-core + @sparticuz/chromium** או **playwright** — הפעלת template HTML (react SSR) → PDF.
   
   קובץ: `src/lib/pdf.ts` עם פונקציה `generateQuotePdf(quote): Buffer`.

4. **SMTP** ב-`src/lib/mail.ts`:
   ```ts
   import nodemailer from "nodemailer";
   
   export const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: Number(process.env.SMTP_PORT),
     secure: false,
     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
   });
   
   export async function sendQuoteEmail(quote): Promise<{ messageId: string }> { ... }
   ```

5. **שליחה** — server action `sendQuote(quoteId)`:
   - מייצר PDF
   - שולח מייל ללקוח עם הקובץ מצורף + body HTML עברית
   - מעדכן `status=SENT`, `emailSentAt`, `emailMessageId`, `pdfPath`
   - יוצר entry ב-`Activity` log

6. **תבניות מייל** — HTML עברית RTL עם לוגו SYSTRU, גוף קצר, הצעה מצורפת.

### Acceptance criteria
- ניתן לבנות הצעה, לראות תצוגה מקדימה ב-PDF (HE/EN)
- שליחה במייל מצליחה — מקבלים `messageId`
- ה-status מתעדכן ל-SENT עם timestamp

---

## Phase 6 — DPO/CISO Risk Assessment Engine

**🚫 BLOCKER:** עליי לקרוא את חומרי המומחה ב-`../docs/regulatory-materials/{ciso,dpo}/` ולהציע מתודולוגיה לאישור.

**מטרה:** מנוע סקר סיכונים מקצועי שמייצר דוח PDF ברמת ייעוץ.

### תהליך מומלץ (לפני קוד)

1. אני קורא את הקבצים העיקריים:
   - `Systru_Risk_Assessment_ULTIMATE.pdf`
   - `סקר סיכונים - SYSTRU Technology.pdf`
   - `EduCloudX_Strategic_Resilience_Report.pdf`
   - `המשוואה הקלאסית להערכת סיכוני אבטחת מידע.pdf`
   - `DPO_Assessment_utility_30_12.xlsx`
   - `IC-ISO-27001-Controls-Checklist-10838.xlsx`
   - `איום ייחוס 2.0 2026.xlsx`
   - `Supervisory questionnaires.pdf`
2. אני מייצר מסמך `docs/METHODOLOGY.md` שמתאר:
   - מתודולוגיית הציון (likelihood × impact, סולמות 1-5)
   - קטגוריות איומים (טבלת איום-ייחוס)
   - בקרות ISO 27001 שייסקרו
   - מבנה דוח הפלט
3. **אישור המשתמש** למתודולוגיה.
4. רק אז — קוד.

### משימות (אחרי אישור)

1. **`AssessmentTemplate`** model + seed:
   - שאלון מובנה (קטגוריות, שאלות, ציוני סיכון אוטומטיים)
   - תבניות נפרדות: `RISK_ASSESSMENT`, `DPO_AUDIT`, `CISO_GAP`, `ISO_27001`

2. **Wizard** ב-`admin/assessments/[id]/`:
   - אשף רב-שלבי ארוך (עשרות שאלות)
   - שמירה אוטומטית של draft
   - חישוב ציון לכל ממצא: `riskScore = likelihood × impact`
   - מיון אוטומטי ל-`LOW/MEDIUM/HIGH/CRITICAL`

3. **Findings editor**:
   - הוספת ממצאים ידניים
   - שיוך לבקרה (e.g. `A.5.1`)
   - הוספת המלצה + owner + due date

4. **PDF Report Builder** — `src/lib/assessment-report.ts`:
   - שער עם לוגו SYSTRU, פרטי הלקוח, תאריך
   - תקציר מנהלים (executive summary)
   - heat map (גרף ציוני סיכון לפי קטגוריה)
   - טבלת ממצאים מסודרת לפי חומרה
   - המלצות
   - נספחים

5. **שליחה במייל** — דומה ל-Phase 5: PDF מצורף ב-attachment, לא portal.

### Acceptance criteria
- ניתן לבצע סקר מלא דרך הפלטפורמה ב-1–2 שעות
- הדוח שמופק נראה ברמת ייעוץ מקצועית
- ניתן לערוך ממצאים ולייצר מחדש בלי לאבד נתונים

---

## Blockers + שאלות פתוחות

| Phase | Blocker | מה נדרש מהמשתמש |
|---|---|---|
| Phase 5 | אין SMTP credentials | פרטי Office365/SendGrid (host, port, user, app password) |
| Phase 6 | טרם אישרת מתודולוגיה | אקרא את ה-PDFs ואציע מסמך — תאשר/תתקן |
| Deploy | אין שרת/דומיין | שם דומיין + IP שרת (Hetzner CX22 מומלץ) |

---

## איך ממשיכים מכאן

1. **בדוק שה-foundation עובד מקומית:**
   ```powershell
   cd platform
   npm install
   npm run docker:up
   npm run seed:admin
   npm run dev
   ```
   נכנס ל-http://localhost:3000 ול-http://localhost:3000/login (admin@systru.co.il / ChangeMe!123).

2. **התחל Phase 1** — port של [../index.html](../../index.html). אפשר לבקש ממני: "תמשיך Phase 1".

3. **כשמגיעים ל-Phase 5** — תספק SMTP credentials.

4. **לפני Phase 6** — תאשר את ה-Methodology document שאכין.
