"use client";

import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusMessage } from "@/components/ui/status";
import { aiApi } from "@/lib/api/skillsync";

const roadmapSchema = z.object({
  goal: z.string().min(3, "Goal must be at least 3 characters"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  weeklyHours: z.number().min(1).max(80),
});

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
        {result ? (
          <pre className="card max-h-[520px] overflow-auto p-5 text-sm leading-6">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}
      </section>
    </main>
  );
}
