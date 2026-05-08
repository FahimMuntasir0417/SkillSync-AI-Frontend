import { z } from "zod";
import { apiSuccessSchema } from "./api.contract";

export const roadmapPhaseSchema = z.object({
  title: z.string().optional(),
  duration: z.string().optional(),
  skills: z.array(z.string()).optional(),
  projects: z.array(z.string()).optional(),
  milestones: z.array(z.string()).optional(),
});

export const roadmapResultSchema = z
  .object({
    title: z.string().optional(),
    phases: z.array(roadmapPhaseSchema).optional(),
    skillsToLearn: z.array(z.string()).optional(),
    projectsToBuild: z.array(z.string()).optional(),
    timeline: z.string().optional(),
  })
  .passthrough();

export const roadmapResponseSchema = apiSuccessSchema(roadmapResultSchema);

export type RoadmapContract = z.infer<typeof roadmapResultSchema>;
