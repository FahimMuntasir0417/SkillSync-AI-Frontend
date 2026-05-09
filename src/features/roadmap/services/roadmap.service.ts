import { apiClient } from "@/lib/api-client";
import type { RoadmapInput } from "../schemas/roadmap.schema";

export type RoadmapResult = {
  title?: string;
  durationWeeks?: number;
  summary?: string;
  phases?: Array<{
    title?: string;
    phaseTitle?: string;
    duration?: string;
    weekRange?: string;
    skills?: string[];
    topics?: string[];
    tasks?: string[];
    resources?: string[];
    projects?: string[];
    milestones?: string[];
    outcome?: string;
  }>;
  skillsToLearn?: string[];
  projectsToBuild?: string[];
  timeline?: string;
  [key: string]: unknown;
};

type RoadmapResponse = {
  success: boolean;
  message: string;
  data: RoadmapResult;
};

export async function generateRoadmap(payload: RoadmapInput) {
  const response = await apiClient.post<RoadmapResponse>("/ai/roadmap", {
    goal: payload.targetRole,
    level: payload.currentLevel,
    weeklyHours: payload.weeklyStudyHours,
  });

  return response.data.data;
}
