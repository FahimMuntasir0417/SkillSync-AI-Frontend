import { apiClient } from "@/lib/api-client";
import type { SkillGapInput } from "../schemas/skill-gap.schema";

export type SkillGapResult = {
  matchedSkills?: string[];
  missingSkills?: string[];
  prioritySkills?: string[];
  recommendedLearningPath?: string[];
  suggestedProjects?: string[];
  [key: string]: unknown;
};

type SkillGapResponse = {
  success: boolean;
  message: string;
  data: SkillGapResult;
};

export async function analyzeSkillGap(payload: SkillGapInput) {
  const response = await apiClient.post<SkillGapResponse>("/ai/skill-gap", payload);
  return response.data.data;
}
