import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { RoadmapResult as RoadmapResultType } from "../services/roadmap.service";

type RoadmapResultProps = {
  result?: RoadmapResultType;
};

function renderList(items?: string[]) {
  if (!items?.length) {
    return <p className="text-sm text-muted-foreground">No items returned yet.</p>;
  }

  return (
    <ul className="grid gap-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li className="rounded-card bg-muted px-3 py-2" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function RoadmapResult({ result }: RoadmapResultProps) {
  if (!result) {
    return <EmptyState title="No roadmap yet" description="Generate a roadmap to see phases, skills, projects, and timeline." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{result.title ?? "Generated roadmap"}</CardTitle>
        <CardDescription>{result.timeline ?? "Phase-by-phase plan based on your inputs."}</CardDescription>
      </CardHeader>
      <div className="grid gap-4">
        {result.phases?.map((phase, index) => (
          <section className="rounded-card border border-border p-4" key={`${phase.title}-${index}`}>
            <h3 className="font-bold">{phase.title ?? `Phase ${index + 1}`}</h3>
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
        <Button type="button" variant="outline">Save roadmap</Button>
      </div>
    </Card>
  );
}
