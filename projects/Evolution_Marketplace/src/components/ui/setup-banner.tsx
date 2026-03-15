import { Card } from "@/components/ui/card";

export function SetupBanner() {
  return (
    <Card className="border-[var(--line-strong)] bg-white/65">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
        Demo Mode Active
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--foreground)]">
        Supabase is not required for Phase 1 iteration. Public listings, demo dashboards,
        and order tickets run from local fixtures, and the header lets you switch between
        visitor, investor, and owner personas. Persistence stays disabled until you connect
        a real backend.
      </p>
    </Card>
  );
}
