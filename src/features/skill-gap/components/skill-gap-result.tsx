import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { getApiErrorMessage } from "@/lib/api-error";
import type { SkillGapResult as SkillGapResultType } from "../services/skill-gap.service";

type SkillGapResultProps = {
  result?: SkillGapResultType;
  isLoading?: boolean;
  error?: unknown;
};

const sections: Array<{ key: keyof SkillGapResultType; title: string }> = [
  { key: "matchedSkills", title: "Matched skills" },
  { key: "missingSkills", title: "Missing skills" },
  { key: "prioritySkills", title: "Priority skills" },
  { key: "recommendedLearningPath", title: "Recommended learning path" },
  { key: "suggestedProjects", title: "Suggested projects" },
];

export function SkillGapResult({ error, isLoading, result }: SkillGapResultProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing your skills</CardTitle>
          <CardDescription>Matching strengths, gaps, priorities, and project ideas.</CardDescription>
        </CardHeader>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </Card>
    );
  }

  if (error) {
    return <ErrorState title="Skill analysis failed" description={getApiErrorMessage(error)} />;
  }

  if (!result) {
    return <EmptyState title="No analysis yet" description="Submit your profile to see matched, missing, and priority skills." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill gap report</CardTitle>
        <CardDescription>Use this report to prioritize your next learning steps.</CardDescription>
      </CardHeader>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => {
          const value = result[section.key];
          const items = Array.isArray(value) ? value : [];

          return (
            <section className="rounded-card border border-border p-4" key={section.title}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold">{section.title}</h3>
                <TrendingUp className="size-4 text-primary" />
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.min(items.length * 18 + 24, 92)}%` }} />
              </div>
              {items.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Badge key={item} variant={section.key === "missingSkills" ? "warning" : "primary"}>
                      {item}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No items returned yet.</p>
              )}
            </section>
          );
        })}
      </div>
    </Card>
  );
}
