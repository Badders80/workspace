import Link from "next/link";
import { DemoModeSwitch } from "@/components/ui/demo-mode-switch";
import { getCurrentUserContext } from "@/lib/auth";

export async function SiteHeader() {
  const { profile } = await getCurrentUserContext();

  return (
    <header className="shell flex items-center justify-between py-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--foreground)] text-sm font-semibold tracking-[0.2em] text-[var(--background)]">
          EM
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Evolution
          </p>
          <p className="font-serif text-2xl tracking-[-0.04em] text-[var(--foreground)]">
            Marketplace
          </p>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <DemoModeSwitch />
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] md:flex">
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href={profile ? "/dashboard" : "/sign-in"}>
          {profile ? profile.role === "owner" ? "Owner Mode" : "Investor Mode" : "Access"}
        </Link>
        </nav>
      </div>
    </header>
  );
}
