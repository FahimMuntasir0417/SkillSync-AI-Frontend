"use client";

import { Clock, FolderPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api-error";
import { saveRoadmapLocally } from "../services/roadmap.service";
import type { RoadmapResult as RoadmapResultType } from "../services/roadmap.service";

type RoadmapResultProps = {
  result?: RoadmapResultType;
  isLoading?: boolean;
  error?: unknown;
};

function renderList(items?: string[], variant: "primary" | "secondary" = "primary") {
  if (!items?.length) {
    return <p className="text-sm text-muted-foreground">No items returned yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Badge key={`${item}-${index}`} variant={variant}>
          {item}
        </Badge>
      ))}
    </div>
  );
}

function getPhaseTitle(phase: NonNullable<RoadmapResultType["phases"]>[number], index: number) {
  return phase.phaseTitle ?? phase.title ?? `Phase ${index + 1}`;
}

function getPhaseDuration(phase: NonNullable<RoadmapResultType["phases"]>[number]) {
  return phase.weekRange ?? phase.duration ?? "Timeline returned by AI";
}

export function RoadmapResult({ error, isLoading, result }: RoadmapResultProps) {
  const [saved, setSaved] = useState(false);

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

  const handleSave = () => {
    try {
      saveRoadmapLocally(result);
      setSaved(true);
      toast.success("Roadmap saved");
    } catch {
      toast.error("Unable to save roadmap");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{result.title ?? "Generated roadmap"}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="size-4 text-primary" />
          {result.durationWeeks ? `${result.durationWeeks} weeks` : result.timeline ?? "Estimated completion returned by AI"}
        </CardDescription>
        {result.summary ? <CardDescription>{result.summary}</CardDescription> : null}
      </CardHeader>
      <div className="relative grid gap-4">
        {result.phases?.map((phase, index) => (
          <section className="relative rounded-card border border-border bg-surface/70 p-4" key={`${getPhaseTitle(phase, index)}-${index}`}>
            <div className="absolute -left-2 top-5 grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {index + 1}
            </div>
            <h3 className="pl-3 font-bold">{getPhaseTitle(phase, index)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{getPhaseDuration(phase)}</p>
            <div className="mt-3 grid gap-4 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-sm font-semibold">Topics</p>
                {renderList(phase.topics ?? phase.skills)}
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">Tasks</p>
                {renderList(phase.tasks ?? phase.projects, "secondary")}
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">Resources</p>
                {renderList(phase.resources ?? phase.milestones)}
              </div>
            </div>
            {phase.outcome ? (
              <div className="mt-4 rounded-card bg-success/10 p-3 text-sm leading-6 text-muted-foreground">
                <span className="font-bold text-success">Outcome: </span>
                {phase.outcome}
              </div>
            ) : null}
          </section>
        ))}
        {!result.phases?.length ? (
          <pre className="overflow-auto rounded-card bg-muted p-4 text-xs">{JSON.stringify(result, null, 2)}</pre>
        ) : null}
        <Button disabled={saved} onClick={handleSave} type="button" variant="outline">
          <FolderPlus className="size-4" />
          {saved ? "Saved" : "Save roadmap"}
        </Button>
      </div>
    </Card>
  );
}
