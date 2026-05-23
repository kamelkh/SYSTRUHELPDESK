import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["he", "en"],
  defaultLocale: "he",
  localePrefix: "as-needed", // /he uses no prefix; /en uses /en prefix
});

export type Locale = (typeof routing.locales)[number];
