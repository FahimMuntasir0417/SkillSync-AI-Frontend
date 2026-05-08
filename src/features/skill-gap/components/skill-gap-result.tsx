import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { SkillGapResult as SkillGapResultType } from "../services/skill-gap.service";

type SkillGapResultProps = {
  result?: SkillGapResultType;
};

const sections: Array<{ key: keyof SkillGapResultType; title: string }> = [
  { key: "matchedSkills", title: "Matched skills" },
  { key: "missingSkills", title: "Missing skills" },
  { key: "prioritySkills", title: "Priority skills" },
  { key: "recommendedLearningPath", title: "Recommended learning path" },
  { key: "suggestedProjects", title: "Suggested projects" },
];

export function SkillGapResult({ result }: SkillGapResultProps) {
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
              <h3 className="font-bold">{section.title}</h3>
              {items.length ? (
                <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  {items.map((item) => (
                    <li className="rounded-card bg-muted px-3 py-2" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
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
