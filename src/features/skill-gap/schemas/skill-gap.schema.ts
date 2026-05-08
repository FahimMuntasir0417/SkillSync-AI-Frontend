import { z } from "zod";

export const skillGapSchema = z.object({
  currentSkills: z.string().min(2, "Current skills are required"),
  targetRole: z.string().min(2, "Target role is required"),
  experienceLevel: z.string().min(2, "Experience level is required"),
  preferredStack: z.string().min(2, "Preferred stack is required"),
});

export type SkillGapInput = z.infer<typeof skillGapSchema>;
