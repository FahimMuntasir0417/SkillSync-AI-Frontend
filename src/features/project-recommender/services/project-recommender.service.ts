import { apiClient } from "@/lib/api-client";
import type { ProjectRecommenderInput } from "../schemas/project-recommender.schema";

export type ProjectRecommendation = {
  title?: string;
  difficulty?: string;
  techStack?: string[];
  features?: string[];
  learningOutcomes?: string[];
  deploymentSuggestion?: string;
  [key: string]: unknown;
};

type ProjectRecommendationResponse = {
  success: boolean;
  message: string;
  data: ProjectRecommendation[] | { projects?: ProjectRecommendation[] };
};

export async function recommendProjects(payload: ProjectRecommenderInput) {
  const response = await apiClient.post<ProjectRecommendationResponse>("/ai/project-recommendations", {
    role: payload.targetRole,
    level: payload.skillLevel,
    skills: payload.knownTechnologies,
    preferredProjectType: payload.preferredProjectType,
    availableTime: payload.availableTime,
  });

  const data = response.data.data;
  return Array.isArray(data) ? data : data.projects ?? [];
}
