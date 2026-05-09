import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-32 w-full resize-y rounded-card border border-border bg-surface/80 p-3 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground hover:border-primary/30 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
