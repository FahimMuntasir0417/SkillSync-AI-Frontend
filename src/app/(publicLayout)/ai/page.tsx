"use client";

import { BookOpen, CalendarDays, CheckCircle2, Clock3, Loader2, Sparkles, Target } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusMessage } from "@/components/ui/status";
import { aiApi } from "@/lib/api/skillsync";

const roadmapSchema = z.object({
  goal: z.string().min(3, "Goal must be at least 3 characters"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  weeklyHours: z.number().min(1).max(80),
});

const roadmapPhaseSchema = z.object({
  phaseTitle: z.string(),
  weekRange: z.string(),
  topics: z.array(z.string()).default([]),
  tasks: z.array(z.string()).default([]),
  resources: z.array(z.string()).default([]),
  outcome: z.string().optional(),
});

const roadmapResultSchema = z.object({
  title: z.string(),
  durationWeeks: z.number().optional(),
  summary: z.string().optional(),
  phases: z.array(roadmapPhaseSchema).default([]),
});

type RoadmapResult = z.infer<typeof roadmapResultSchema>;

function parseRoadmapResult(result: unknown): RoadmapResult | null {
  const value = typeof result === "string" ? safeJsonParse(result) : result;
  const parsed = roadmapResultSchema.safeParse(value);

  return parsed.success ? parsed.data : null;
}

function safeJsonParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function RoadmapList({ icon: Icon, items, title }: { icon: typeof CheckCircle2; items: string[]; title: string }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="rounded-card border border-border bg-background/80 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 text-primary" />
        <h4 className="text-sm font-bold">{title}</h4>
      </div>
      <ul className="grid gap-2">
        {items.map((item) => (
          <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={item}>
            <CheckCircle2 className="mt-1 size-4 shrink-0 text-success" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoadmapPreview({ result }: { result: unknown }) {
  const roadmap = parseRoadmapResult(result);

  if (!roadmap) {
    return (
      <pre className="card max-h-[520px] overflow-auto p-5 text-sm leading-6">
        {JSON.stringify(result, null, 2)}
      </pre>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border bg-muted/40 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <CardHeader className="mb-0 max-w-3xl">
            <Badge variant="primary">Generated roadmap</Badge>
            <CardTitle className="text-2xl">{roadmap.title}</CardTitle>
            {roadmap.summary ? <CardDescription>{roadmap.summary}</CardDescription> : null}
          </CardHeader>
          <div className="grid min-w-36 gap-2 rounded-card border border-border bg-background p-4 text-sm">
            <span className="text-muted-foreground">Duration</span>
            <span className="flex items-center gap-2 font-bold">
              <Clock3 className="size-4 text-primary" />
              {roadmap.durationWeeks ? `${roadmap.durationWeeks} weeks` : "Timeline ready"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-6">
        {roadmap.phases.map((phase, index) => (
          <section className="relative overflow-hidden rounded-card border border-border bg-surface p-5 shadow-sm" key={`${phase.phaseTitle}-${index}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div>
                  <Badge variant="neutral">
                    <CalendarDays className="size-3.5" />
                    {phase.weekRange}
                  </Badge>
                  <h3 className="mt-3 text-lg font-bold leading-snug">{phase.phaseTitle}</h3>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-3">
              <RoadmapList icon={Target} items={phase.topics} title="Focus topics" />
              <RoadmapList icon={CheckCircle2} items={phase.tasks} title="Weekly tasks" />
              <RoadmapList icon={BookOpen} items={phase.resources} title="Resources" />
            </div>

            {phase.outcome ? (
              <div className="mt-4 rounded-card border border-success/20 bg-success/10 p-4">
                <p className="text-sm font-bold text-success">Outcome</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{phase.outcome}</p>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </Card>
  );
}

export default function AiToolsPage() {
  const [form, setForm] = useState({ goal: "Become a backend developer", level: "beginner", weeklyHours: 8 });
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = roadmapSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid AI request");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const response = await aiApi.roadmap(parsed.data);
      setResult(response.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "AI request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-shell grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr]">
      <section>
        <SectionHeading
          eyebrow="AI tools"
          title="Generate a learning roadmap"
          description="This tool calls the backend AI route and shows provider errors clearly when AI keys are not configured."
        />
        <div className="card mt-8 grid gap-4 p-5">
          {["Course summaries", "Study chat", "Skill-gap analysis", "Project recommendations", "Career chat"].map((item) => (
            <div className="flex items-center gap-3" key={item}>
              <Sparkles className="size-5 text-primary" />
              <span className="font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <form className="card grid gap-4 p-6" onSubmit={submit}>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Goal</span>
            <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => setForm((state) => ({ ...state, goal: event.target.value }))} value={form.goal} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Level</span>
            <select className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => setForm((state) => ({ ...state, level: event.target.value }))} value={form.level}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Weekly hours</span>
            <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" min={1} max={80} onChange={(event) => setForm((state) => ({ ...state, weeklyHours: Number(event.target.value) }))} type="number" value={form.weeklyHours} />
          </label>
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Generate roadmap
          </Button>
        </form>
        {error ? <StatusMessage message={error} title="AI request error" tone="danger" /> : null}
        {result ? <RoadmapPreview result={result} /> : null}
      </section>
    </main>
  );
}
