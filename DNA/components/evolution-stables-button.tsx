import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface EvolutionStablesButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  lockupType?: "horizontal" | "stacked" | "vertical";
  lockupSize?: "sm" | "md" | "lg";
}

const EvolutionStablesButton = React.forwardRef<
  HTMLButtonElement,
  EvolutionStablesButtonProps
>(({ className, variant = "default", size = "default", asChild = false, lockupType, lockupSize, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  
  // Base styles following Institutional Minimalism
  const baseStyles = cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-surface)]",
    "whitespace-nowrap"
  );
  
  // Variant styles
  const variantStyles = cn(
    variant === "default" && "",
    variant === "destructive" && "text-[var(--color-foreground)] bg-[var(--color-background)] hover:bg-[var(--color-surface)]/90",
    variant === "outline" && "border-[var(--color-border)] hover:border-[var(--brand-gold)]/50",
    variant === "secondary" && "text-[var(--color-muted)] bg-[var(--color-background)] hover:bg-[var(--color-surface)]/50",
    variant === "ghost" && "hover:bg-[var(--color-surface)]/50 hover:text-[var(--brand-gold)]",
    variant === "link" && "underline-offset-4 hover:underline hover:text-[var(--brand-gold)]"
  );
  
  // Size styles
  const sizeStyles = cn(
    size === "default" && "h-10 px-4 py-2",
    size === "sm" && "h-9 px-3",
    size === "lg" && "h-11 px-8",
    size === "icon" && "h-10 w-10"
  );
  
  return (
    <Comp
      className={cn(baseStyles, variantStyles, sizeStyles, className)}
      ref={ref}
      {...props}
    >
      {lockupType && (
        <span className="mr-2 flex-shrink-0">
          {/* Lockup asset would be imported and used here */}
          {/* Example: <HorizontalLockup size={lockupSize} /> */}
          Lockup Placeholder
        </span>
      )}
      <slot />
    </Comp>
  );
});

EvolutionStablesButton.displayName = "EvolutionStablesButton";

export { EvolutionStablesButton };