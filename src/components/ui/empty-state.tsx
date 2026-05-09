import { AlertTriangle, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
  className?: string;
  tone?: "empty" | "error";
};

export function EmptyState({ action, className, description, title, tone = "empty" }: EmptyStateProps) {
  const Icon = tone === "error" ? AlertTriangle : Inbox;

  return (
    <div className={cn("card grid place-items-center px-6 py-12 text-center", className)}>
      <div className={cn("grid size-14 place-items-center rounded-2xl", tone === "error" ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary")}>
        <Icon className="size-7" />
      </div>
      <h2 className="mt-5 text-xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action ? (
        <Button asChild className="mt-6" href={action.href}>
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}

export function ErrorState(props: Omit<EmptyStateProps, "tone">) {
  return <EmptyState tone="error" {...props} />;
}
