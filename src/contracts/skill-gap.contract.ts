import { z } from "zod";
import { apiSuccessSchema } from "./api.contract";

export const skillGapResultSchema = z
  .object({
    matchedSkills: z.array(z.string()).optional(),
    missingSkills: z.array(z.string()).optional(),
    prioritySkills: z.array(z.string()).optional(),
    recommendedLearningPath: z.array(z.string()).optional(),
    suggestedProjects: z.array(z.string()).optional(),
  })
  .passthrough();

export const skillGapResponseSchema = apiSuccessSchema(skillGapResultSchema);

export type SkillGapContract = z.infer<typeof skillGapResultSchema>;
