import Link from "next/link";
import { getCurrentUserContext } from "@/lib/auth";
import { isDemoAuthEnabled } from "@/lib/env";
import { cn } from "@/lib/utils";

const personas = [
  {
    href: "/dev/session?persona=visitor&next=/marketplace",
    key: "visitor",
    label: "Visitor",
  },
  {
    href: "/dev/session?persona=investor&next=/dashboard",
    key: "investor",
    label: "Investor",
  },
  {
    href: "/dev/session?persona=owner&next=/dashboard",
    key: "owner",
    label: "Owner",
  },
] as const;

export async function DemoModeSwitch({
  dark = false,
}: {
  dark?: boolean;
}) {
  if (!isDemoAuthEnabled) {
    return null;
  }

  const { profile } = await getCurrentUserContext();
  const activeRole = profile?.role ?? "visitor";

  return (
    <div
      className={cn(
        "rounded-[22px] border px-3 py-3",
        dark
          ? "border-white/10 bg-white/5 text-white"
          : "border-[var(--line)] bg-white/70 text-[var(--foreground)]",
      )}
    >
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.18em]",
          dark ? "text-white/55" : "text-[var(--muted)]",
        )}
      >
        Demo Session
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {personas.map((persona) => (
          <Link
            key={persona.key}
            href={persona.href}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition",
              activeRole === persona.key
                ? dark
                  ? "border-white bg-white text-[var(--surface-dark)]"
                  : "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                : dark
                  ? "border-white/20 text-white/78 hover:bg-white/10"
                  : "border-[var(--line-strong)] text-[var(--foreground)] hover:bg-white",
            )}
          >
            {persona.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
