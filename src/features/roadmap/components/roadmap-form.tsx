"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { roadmapSchema, type RoadmapInput } from "../schemas/roadmap.schema";

type RoadmapFormProps = {
  isLoading: boolean;
  onSubmit: (payload: RoadmapInput) => void;
};

export function RoadmapForm({ isLoading, onSubmit }: RoadmapFormProps) {
  const form = useForm<RoadmapInput>({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      targetRole: "",
      currentLevel: "beginner",
      knownSkills: "",
      weeklyStudyHours: 8,
      preferredLearningStyle: "",
      targetTimeline: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate a career roadmap</CardTitle>
        <CardDescription>Tell the AI where you are now and where you want to go.</CardDescription>
      </CardHeader>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Target role</span>
          <Input placeholder="Frontend Engineer" {...form.register("targetRole")} />
          <FormError message={form.formState.errors.targetRole?.message} />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Current level</span>
            <select className="focus-ring h-12 rounded-card border border-border bg-background px-3 text-sm shadow-sm" {...form.register("currentLevel")}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <FormError message={form.formState.errors.currentLevel?.message} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Weekly study hours</span>
            <Input type="number" min={1} {...form.register("weeklyStudyHours", { valueAsNumber: true })} />
            <FormError message={form.formState.errors.weeklyStudyHours?.message} />
          </label>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Known skills</span>
          <Textarea placeholder="HTML, CSS, JavaScript, React basics" {...form.register("knownSkills")} />
          <FormError message={form.formState.errors.knownSkills?.message} />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Learning style</span>
            <Input placeholder="Project-based, videos, docs" {...form.register("preferredLearningStyle")} />
            <FormError message={form.formState.errors.preferredLearningStyle?.message} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Target timeline</span>
            <Input placeholder="12 weeks" {...form.register("targetTimeline")} />
            <FormError message={form.formState.errors.targetTimeline?.message} />
          </label>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? <LoadingSpinner /> : null}
          Generate roadmap
        </Button>
      </form>
    </Card>
  );
}
