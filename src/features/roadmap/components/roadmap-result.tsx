import { Clock, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api-error";
import type { RoadmapResult as RoadmapResultType } from "../services/roadmap.service";

type RoadmapResultProps = {
  result?: RoadmapResultType;
  isLoading?: boolean;
  error?: unknown;
};

function renderList(items?: string[]) {
  if (!items?.length) {
    return <p className="text-sm text-muted-foreground">No items returned yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge key={item} variant="primary">
          {item}
        </Badge>
      ))}
    </div>
  );
}

export function RoadmapResult({ error, isLoading, result }: RoadmapResultProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Generating roadmap</CardTitle>
          <CardDescription>The AI is creating phases, skills, and project checkpoints.</CardDescription>
        </CardHeader>
        <div className="grid gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-32" />
          <Skeleton className="h-24" />
        </div>
      </Card>
    );
  }

  if (error) {
    return <ErrorState title="Roadmap generation failed" description={getApiErrorMessage(error)} />;
  }

  if (!result) {
    return <EmptyState title="No roadmap yet" description="Generate a roadmap to see phases, skills, projects, and timeline." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{result.title ?? "Generated roadmap"}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          {result.timeline ?? "Estimated completion returned by AI"}
        </CardDescription>
      </CardHeader>
      <div className="relative grid gap-4">
        {result.phases?.map((phase, index) => (
          <section className="relative rounded-card border border-border bg-surface/70 p-4" key={`${phase.title}-${index}`}>
            <div className="absolute -left-2 top-5 grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {index + 1}
            </div>
            <h3 className="pl-3 font-bold">{phase.title ?? `Phase ${index + 1}`}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{phase.duration ?? "Timeline returned by AI"}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold">Skills</p>
                {renderList(phase.skills)}
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">Projects</p>
                {renderList(phase.projects)}
              </div>
            </div>
          </section>
        ))}
        {!result.phases?.length ? (
          <pre className="overflow-auto rounded-card bg-muted p-4 text-xs">{JSON.stringify(result, null, 2)}</pre>
        ) : null}
        <Button type="button" variant="outline">
          <FolderPlus className="size-4" />
          Save roadmap
        </Button>
      </div>
    </Card>
  );
}
