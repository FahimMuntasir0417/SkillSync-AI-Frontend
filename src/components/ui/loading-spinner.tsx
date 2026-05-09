import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  className?: string;
  label?: string;
};

export function LoadingSpinner({ className, label = "Loading" }: LoadingSpinnerProps) {
  return (
    <Loader2
      aria-label={label}
      className={cn("size-4 animate-spin text-current", className)}
      role="status"
    />
  );
}
