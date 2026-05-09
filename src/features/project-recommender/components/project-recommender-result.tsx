import { CheckCircle2, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { SkeletonCard } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api-error";
import type { ProjectRecommendation } from "../services/project-recommender.service";

type ProjectRecommenderResultProps = {
  projects?: ProjectRecommendation[];
  isLoading?: boolean;
  error?: unknown;
};

function List({ items }: { items?: string[] }) {
  if (!items?.length) {
    return <p className="text-sm text-muted-foreground">No items returned yet.</p>;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge key={item} variant="secondary">
          {item}
        </Badge>
      ))}
    </div>
  );
}

export function ProjectRecommenderResult({ error, isLoading, projects }: ProjectRecommenderResultProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return <ErrorState title="Project recommendation failed" description={getApiErrorMessage(error)} />;
  }

  if (!projects?.length) {
    return <EmptyState title="No recommendations yet" description="Submit your stack and role to generate project ideas." />;
  }

  return (
    <div className="grid gap-4">
      {projects.map((project, index) => (
        <Card interactive key={`${project.title}-${index}`}>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>{project.title ?? `Project ${index + 1}`}</CardTitle>
                <CardDescription>{project.difficulty ?? "Difficulty returned by AI"}</CardDescription>
              </div>
              <Badge variant="primary">{project.difficulty ?? "AI pick"}</Badge>
            </div>
          </CardHeader>
          <div className="grid gap-4 md:grid-cols-2">
            <section>
              <h3 className="font-bold">Tech stack</h3>
              <List items={project.techStack} />
            </section>
            <section>
              <h3 className="font-bold">Features</h3>
              <div className="mt-2 grid gap-2">
                {project.features?.length ? project.features.map((item) => (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground" key={item}>
                    <CheckCircle2 className="size-4 text-success" />
                    {item}
                  </p>
                )) : <p className="text-sm text-muted-foreground">No items returned yet.</p>}
              </div>
            </section>
            <section>
              <h3 className="font-bold">Learning outcomes</h3>
              <List items={project.learningOutcomes} />
            </section>
            <section>
              <h3 className="font-bold">Deployment suggestion</h3>
              <p className="mt-2 rounded-card bg-muted px-3 py-2 text-sm text-muted-foreground">
                <Rocket className="mr-2 inline size-4 text-primary" />
                {project.deploymentSuggestion ?? "No deployment suggestion returned yet."}
              </p>
            </section>
          </div>
        </Card>
      ))}
    </div>
  );
}
