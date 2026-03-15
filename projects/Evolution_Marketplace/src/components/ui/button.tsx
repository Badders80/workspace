import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  wide?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--foreground)] text-[var(--background)] hover:bg-[#243342] shadow-[0_14px_40px_rgba(24,35,47,0.18)]",
  secondary:
    "bg-[var(--surface-strong)] text-[var(--foreground)] border border-[var(--line-strong)] hover:bg-white",
  ghost:
    "bg-transparent text-[var(--foreground)] border border-[var(--line)] hover:bg-white/50",
  danger:
    "bg-[var(--danger)] text-white hover:brightness-110 shadow-[0_14px_40px_rgba(141,67,67,0.18)]",
};

export function Button({
  children,
  className,
  type = "submit",
  variant = "primary",
  wide = false,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        wide && "w-full",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
