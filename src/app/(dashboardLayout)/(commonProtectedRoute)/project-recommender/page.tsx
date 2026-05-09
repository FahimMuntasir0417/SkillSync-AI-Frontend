"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ProjectRecommenderForm } from "@/features/project-recommender/components/project-recommender-form";
import { ProjectRecommenderResult } from "@/features/project-recommender/components/project-recommender-result";
import { useRecommendProjects } from "@/features/project-recommender/hooks/use-recommend-projects";

export default function ProjectRecommenderPage() {
  const projectMutation = useRecommendProjects();

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="AI tools"
        title="Project Recommender"
        description="Get practical portfolio project ideas with features, outcomes, and deployment direction."
      />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ProjectRecommenderForm isLoading={projectMutation.isPending} onSubmit={(payload) => projectMutation.mutate(payload)} />
        <ProjectRecommenderResult error={projectMutation.error} isLoading={projectMutation.isPending} projects={projectMutation.data} />
      </div>
    </main>
  );
}
