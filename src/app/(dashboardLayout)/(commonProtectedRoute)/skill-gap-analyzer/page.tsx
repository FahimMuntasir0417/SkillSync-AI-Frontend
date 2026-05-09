"use client";

import { PageHeader } from "@/components/ui/page-header";
import { SkillGapForm } from "@/features/skill-gap/components/skill-gap-form";
import { SkillGapResult } from "@/features/skill-gap/components/skill-gap-result";
import { useAnalyzeSkillGap } from "@/features/skill-gap/hooks/use-analyze-skill-gap";

export default function SkillGapAnalyzerPage() {
  const skillGapMutation = useAnalyzeSkillGap();

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="AI tools"
        title="Skill Gap Analyzer"
        description="Compare your current skills to a target role and identify what to learn next."
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SkillGapForm isLoading={skillGapMutation.isPending} onSubmit={(payload) => skillGapMutation.mutate(payload)} />
        <SkillGapResult error={skillGapMutation.error} isLoading={skillGapMutation.isPending} result={skillGapMutation.data} />
      </div>
    </main>
  );
}
