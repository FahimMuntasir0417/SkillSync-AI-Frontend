"use client";

import { PageHeader } from "@/components/ui/page-header";
import { RoadmapForm } from "@/features/roadmap/components/roadmap-form";
import { RoadmapResult } from "@/features/roadmap/components/roadmap-result";
import { useGenerateRoadmap } from "@/features/roadmap/hooks/use-generate-roadmap";

export default function RoadmapGeneratorPage() {
  const roadmapMutation = useGenerateRoadmap();

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="AI tools"
        title="Roadmap Generator"
        description="Create a structured, timeline-aware learning plan for your target career path."
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <RoadmapForm isLoading={roadmapMutation.isPending} onSubmit={(payload) => roadmapMutation.mutate(payload)} />
        <RoadmapResult error={roadmapMutation.error} isLoading={roadmapMutation.isPending} result={roadmapMutation.data} />
      </div>
    </main>
  );
}
