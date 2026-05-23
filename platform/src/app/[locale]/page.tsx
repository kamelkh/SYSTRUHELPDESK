import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,10,20,0.97) 0%, rgba(26,57,114,0.95) 50%, rgba(14,126,181,0.90) 80%, rgba(41,171,226,0.82) 100%), linear-gradient(180deg, #050A14, #0D1B2A)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[color:var(--color-accent)]">
            {t("common.appName")}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-[color:var(--color-accent)] px-7 py-3.5 font-semibold text-[color:var(--color-text)] shadow-lg transition hover:brightness-110"
            >
              {t("home.heroCta1")}
            </Link>
            <Link
              href="/diagnostic"
              className="rounded-xl border border-white/30 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              {t("home.heroCta2")}
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/60">{t("home.trustBadge")}</p>
        </div>
      </section>

      {/* Quick info strip */}
      <section className="border-y border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 text-center sm:grid-cols-3">
          <div>
            <p className="text-sm text-[color:var(--color-muted)]">{t("common.phone")}</p>
            <a
              href="tel:048853184"
              className="font-display text-xl font-semibold text-[color:var(--color-brand)]"
            >
              04-885-3184
            </a>
          </div>
          <div>
            <p className="text-sm text-[color:var(--color-muted)]">{t("common.whatsapp")}</p>
            <a
              href="https://wa.me/972543257788"
              className="font-display text-xl font-semibold text-[color:var(--color-brand)]"
            >
              054-325-7788
            </a>
          </div>
          <div>
            <p className="text-sm text-[color:var(--color-muted)]">{t("common.email")}</p>
            <a
              href="mailto:systru@systru.co.il"
              className="font-display text-xl font-semibold text-[color:var(--color-brand)]"
            >
              systru@systru.co.il
            </a>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="bg-[color:var(--color-text)] py-8 text-center text-sm text-white/70">
        © {new Date().getFullYear()} {t("common.appName")} — {t("footer.rights")}
      </footer>
    </main>
  );
}
