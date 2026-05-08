import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

type DashboardWorkspacePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: {
    href: string;
    label: string;
  }[];
};

export function DashboardWorkspacePage({
  actions = [],
  description,
  eyebrow,
  title,
}: DashboardWorkspacePageProps) {
  return (
    <main className="container-shell py-12">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="card grid gap-4 p-6">
          <h2 className="text-xl font-bold">Workspace actions</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            This route is part of the Eco Spark-style dashboard folder structure and is
            connected to the SkillSync API layer for future feature-specific tables and forms.
          </p>
          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <Button asChild href={action.href} key={action.href} variant="outline">
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
