import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-[var(--surface-strong)] text-[var(--foreground)] border-[var(--line)]",
  success: "bg-[rgba(41,82,71,0.12)] text-[var(--success)] border-[rgba(41,82,71,0.18)]",
  warning: "bg-[rgba(139,99,50,0.12)] text-[var(--warning)] border-[rgba(139,99,50,0.18)]",
  danger: "bg-[rgba(141,67,67,0.12)] text-[var(--danger)] border-[rgba(141,67,67,0.18)]",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: PropsWithChildren<{ tone?: BadgeTone; className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
