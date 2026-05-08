import { apiClient } from "@/lib/api-client";
import type { RoadmapInput } from "../schemas/roadmap.schema";

export type RoadmapResult = {
  title?: string;
  phases?: Array<{
    title?: string;
    duration?: string;
    skills?: string[];
    projects?: string[];
    milestones?: string[];
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
    knownSkills: payload.knownSkills,
    preferredLearningStyle: payload.preferredLearningStyle,
    targetTimeline: payload.targetTimeline,
  });

  return response.data.data;
}
