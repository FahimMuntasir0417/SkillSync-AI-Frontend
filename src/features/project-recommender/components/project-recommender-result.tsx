import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { ProjectRecommendation } from "../services/project-recommender.service";

type ProjectRecommenderResultProps = {
  projects?: ProjectRecommendation[];
};

function List({ items }: { items?: string[] }) {
  if (!items?.length) {
    return <p className="text-sm text-muted-foreground">No items returned yet.</p>;
  }

  return (
    <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li className="rounded-card bg-muted px-3 py-2" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectRecommenderResult({ projects }: ProjectRecommenderResultProps) {
  if (!projects?.length) {
    return <EmptyState title="No recommendations yet" description="Submit your stack and role to generate project ideas." />;
  }

  return (
    <div className="grid gap-4">
      {projects.map((project, index) => (
        <Card key={`${project.title}-${index}`}>
          <CardHeader>
            <CardTitle>{project.title ?? `Project ${index + 1}`}</CardTitle>
            <CardDescription>{project.difficulty ?? "Difficulty returned by AI"}</CardDescription>
          </CardHeader>
          <div className="grid gap-4 md:grid-cols-2">
            <section>
              <h3 className="font-bold">Tech stack</h3>
              <List items={project.techStack} />
            </section>
            <section>
              <h3 className="font-bold">Features</h3>
              <List items={project.features} />
            </section>
            <section>
              <h3 className="font-bold">Learning outcomes</h3>
              <List items={project.learningOutcomes} />
            </section>
            <section>
              <h3 className="font-bold">Deployment suggestion</h3>
              <p className="mt-2 rounded-card bg-muted px-3 py-2 text-sm text-muted-foreground">
                {project.deploymentSuggestion ?? "No deployment suggestion returned yet."}
              </p>
            </section>
          </div>
        </Card>
      ))}
    </div>
  );
}
