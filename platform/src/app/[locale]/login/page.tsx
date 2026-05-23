import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/components/LoginForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth");

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[var(--shadow-card)]">
        <h1 className="font-display text-2xl font-bold text-[color:var(--color-brand)]">
          {t("loginTitle")}
        </h1>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">{t("loginSubtitle")}</p>

        <Suspense fallback={<p className="mt-6 text-sm">...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
