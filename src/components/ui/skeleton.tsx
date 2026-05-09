import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton rounded-card", className)} {...props} />;
}

export function SkeletonCard() {
  return (
    <div className="card grid gap-4 p-5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-7 w-3/4" />
      <Skeleton className="h-20 w-full" />
      <div className="flex gap-3">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}
