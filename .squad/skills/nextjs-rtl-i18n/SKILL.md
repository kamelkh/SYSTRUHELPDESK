# nextjs-rtl-i18n

## Purpose
Use when building or reviewing any Next.js component, page, or layout that involves Hebrew (RTL) or English (LTR) rendering in the SYSTRUHELPDESK project.

## Confidence: high

## Patterns

### Import Link from i18n navigation (never next/link directly)
```tsx
import { Link } from "@/i18n/navigation";
// NOT: import Link from "next/link"
```

### Server component translations
```tsx
const t = await getTranslations(); // RSC
setRequestLocale(locale);          // required at top of page
```

### Client component translations
```tsx
const t = useTranslations("namespace");
```

### RTL-aware layout
- Use logical CSS properties: `ps` / `pe` (not `pl` / `pr`), `ms` / `me`, `border-s` / `border-e`
- Tailwind v4: `dir` attribute is set by locale layout — don't override it
- Test EVERY component in both `he` (RTL) and `en` (LTR)

### i18n string rule
- Every user-visible string goes in `messages/he.json` + `messages/en.json`
- Key convention: `namespace.camelCaseKey`
- Never hardcode Hebrew or English text in TSX

### Page params pattern
```tsx
type Props = { params: Promise<{ locale: string }> };
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  ...
}
```

## Applies to
Rusty, Yen, Tess, Danny, Linus
