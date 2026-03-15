import Link from "next/link";
import { signOutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DemoModeSwitch } from "@/components/ui/demo-mode-switch";
import type { ProfileRow } from "@/lib/auth";

function getNav(role: ProfileRow["role"] | undefined) {
  if (role === "owner") {
    return [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/listings", label: "Listings" },
      { href: "/dashboard/offers", label: "Incoming Offers" },
      { href: "/dashboard/transactions", label: "Transactions" },
      { href: "/dashboard/ownership", label: "Ownership" },
      { href: "/dashboard/profile", label: "Profile" },
    ];
  }

  return [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/offers", label: "My Offers" },
    { href: "/dashboard/transactions", label: "Transactions" },
    { href: "/dashboard/ownership", label: "Ownership" },
    { href: "/dashboard/profile", label: "Profile" },
  ];
}

export function DashboardShell({
  profile,
  children,
}: {
  profile: ProfileRow | null;
  children: React.ReactNode;
}) {
  const navItems = getNav(profile?.role);

  return (
    <div className="shell py-6">
      <div className="dashboard-grid">
        <aside className="space-y-4">
          <Card className="bg-[var(--surface-dark)] text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
              Evolution Marketplace
            </p>
            <h1 className="mt-4 font-serif text-4xl tracking-[-0.05em]">Mission control</h1>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Separate public brand surfaces from logged-in operations, with clean state
              transitions for offers, transactions, and ownership records.
            </p>
          </Card>
          <Card className="bg-[var(--surface-dark-muted)] text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Participant
            </p>
            <p className="mt-3 text-lg font-semibold">
              {profile?.display_name ?? "Profile setup pending"}
            </p>
            <p className="mt-2 text-sm text-white/70">
              {profile?.role?.toUpperCase() ?? "Complete profile to enable workflows"}
            </p>
            <nav className="mt-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <DemoModeSwitch dark />
            </div>
            <form action={signOutAction} className="mt-6">
              <Button variant="ghost" wide className="border-white/20 text-white hover:bg-white/10">
                Sign out
              </Button>
            </form>
          </Card>
        </aside>
        <div className="space-y-4">
          <Card className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow">Operational Dashboard</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                NZD-native pricing, whole-horse percentage accounting, and transaction
                states designed to evolve into deeper payment and compliance layers later.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="text-sm font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4"
            >
              View public marketplace
            </Link>
          </Card>
          {children}
        </div>
      </div>
    </div>
  );
}
