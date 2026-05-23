"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const search = useSearchParams();
  const from = search.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      setError(t("loginError"));
      return;
    }

    router.push(from);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">{t("emailLabel")}</label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 outline-none focus:border-[color:var(--color-brand-2)]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">{t("passwordLabel")}</label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-[color:var(--color-line)] bg-white px-4 py-2.5 outline-none focus:border-[color:var(--color-brand-2)]"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[color:var(--color-brand)] px-4 py-3 font-semibold text-white transition hover:bg-[color:var(--color-brand-2)] disabled:opacity-60"
      >
        {loading ? "..." : t("loginButton")}
      </button>
    </form>
  );
}
