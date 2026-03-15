import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Card className="bg-[var(--surface-strong)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-4 font-serif text-5xl tracking-[-0.05em] text-[var(--foreground)]">
        {value}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{note}</p>
    </Card>
  );
}
