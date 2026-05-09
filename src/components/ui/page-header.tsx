import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ actions, className, description, eyebrow, title }: PageHeaderProps) {
  return (
    <header className={cn("mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </header>
  );
}
