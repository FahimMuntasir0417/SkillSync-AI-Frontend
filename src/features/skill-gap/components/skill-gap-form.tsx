"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Textarea } from "@/components/ui/textarea";
import { skillGapSchema, type SkillGapInput } from "../schemas/skill-gap.schema";

type SkillGapFormProps = {
  isLoading: boolean;
  onSubmit: (payload: SkillGapInput) => void;
};

export function SkillGapForm({ isLoading, onSubmit }: SkillGapFormProps) {
  const form = useForm<SkillGapInput>({
    resolver: zodResolver(skillGapSchema),
    defaultValues: {
      currentSkills: "",
      targetRole: "",
      experienceLevel: "",
      preferredStack: "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze your skill gap</CardTitle>
        <CardDescription>Compare your current skills against a target role.</CardDescription>
      </CardHeader>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Current skills</span>
          <Textarea placeholder="React, TypeScript, REST APIs" {...form.register("currentSkills")} />
          <FormError message={form.formState.errors.currentSkills?.message} />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Target role</span>
            <Input placeholder="Full-stack Engineer" {...form.register("targetRole")} />
            <FormError message={form.formState.errors.targetRole?.message} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Experience level</span>
            <Input placeholder="Junior, mid-level, senior" {...form.register("experienceLevel")} />
            <FormError message={form.formState.errors.experienceLevel?.message} />
          </label>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Preferred stack</span>
          <Input placeholder="Next.js, Node.js, PostgreSQL" {...form.register("preferredStack")} />
          <FormError message={form.formState.errors.preferredStack?.message} />
        </label>
        <Button disabled={isLoading} type="submit">
          {isLoading ? <LoadingSpinner /> : null}
          Analyze gap
        </Button>
      </form>
    </Card>
  );
}
