import { apiClient } from "@/lib/api-client";
import { toStringList } from "@/lib/utils";
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
  const response = await apiClient.post<SkillGapResponse>("/ai/skill-gap", {
    currentSkills: toStringList(payload.currentSkills),
    targetRole: payload.targetRole,
    experienceLevel: payload.experienceLevel,
    preferredStack: payload.preferredStack,
  });
  return response.data.data;
}
