"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { projectRecommenderSchema, type ProjectRecommenderInput } from "../schemas/project-recommender.schema";

type ProjectRecommenderFormProps = {
  isLoading: boolean;
  onSubmit: (payload: ProjectRecommenderInput) => void;
};

export function ProjectRecommenderForm({ isLoading, onSubmit }: ProjectRecommenderFormProps) {
  const form = useForm<ProjectRecommenderInput>({
    resolver: zodResolver(projectRecommenderSchema),
    defaultValues: {
      skillLevel: "intermediate",
      targetRole: "",
      knownTechnologies: "",
      preferredProjectType: "",
      availableTime: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommend portfolio projects</CardTitle>
        <CardDescription>Generate build ideas that match your level, stack, and target role.</CardDescription>
      </CardHeader>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Skill level</span>
            <select className="focus-ring h-12 rounded-card border border-border bg-background px-3 text-sm shadow-sm" {...form.register("skillLevel")}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <FormError message={form.formState.errors.skillLevel?.message} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Target role</span>
            <Input placeholder="Backend Engineer" {...form.register("targetRole")} />
            <FormError message={form.formState.errors.targetRole?.message} />
          </label>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Known technologies</span>
          <Textarea placeholder="Node.js, Express, Prisma, PostgreSQL" {...form.register("knownTechnologies")} />
          <FormError message={form.formState.errors.knownTechnologies?.message} />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Project type</span>
            <Input placeholder="SaaS, dashboard, API, mobile" {...form.register("preferredProjectType")} />
            <FormError message={form.formState.errors.preferredProjectType?.message} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Available time</span>
            <Input placeholder="2 weekends, 4 weeks" {...form.register("availableTime")} />
            <FormError message={form.formState.errors.availableTime?.message} />
          </label>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? <LoadingSpinner /> : null}
          Recommend projects
        </Button>
      </form>
    </Card>
  );
}
