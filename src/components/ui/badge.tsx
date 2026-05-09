import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "neutral";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary ring-primary/20",
  secondary: "bg-secondary/10 text-secondary ring-secondary/20",
  success: "bg-success/10 text-success ring-success/20",
  warning: "bg-warning/10 text-warning ring-warning/20",
  danger: "bg-danger/10 text-danger ring-danger/20",
  neutral: "bg-muted text-muted-foreground ring-border",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ring-1",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
