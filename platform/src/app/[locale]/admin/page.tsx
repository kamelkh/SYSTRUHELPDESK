import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminHome() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-bold text-[color:var(--color-brand)]">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-[color:var(--color-muted)]">
          Welcome, {session.user?.name} ({session.user?.role})
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Leads", "Customers", "Quotes", "Assessments"].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <p className="text-sm text-[color:var(--color-muted)]">{item}</p>
              <p className="mt-2 font-display text-3xl font-bold text-[color:var(--color-brand)]">
                —
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
