import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function FeatureCard({ description, icon: Icon, title }: FeatureCardProps) {
  return (
    <Card className="group h-full" interactive>
      <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
        Learn more
        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </div>
    </Card>
  );
}
