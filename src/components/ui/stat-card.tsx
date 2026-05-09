import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  description?: string;
  icon?: LucideIcon;
  trend?: string;
  className?: string;
};

export function StatCard({ className, description, icon: Icon, label, trend, value }: StatCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)} interactive>
      <div className="absolute right-0 top-0 size-24 rounded-full bg-primary/10 blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {Icon ? (
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
        ) : null}
      </div>
      {trend ? <p className="relative mt-5 text-sm font-semibold text-success">{trend}</p> : null}
    </Card>
  );
}
