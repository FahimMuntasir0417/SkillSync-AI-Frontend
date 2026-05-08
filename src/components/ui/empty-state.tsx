import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: {
    href: string;
    label: string;
  };
};

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="card grid place-items-center px-6 py-12 text-center">
      <Inbox className="size-10 text-muted-foreground" />
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action ? (
        <Button asChild className="mt-5" href={action.href}>
          {action.label}
        </Button>
      ) : null}
    </div>
  );
}
