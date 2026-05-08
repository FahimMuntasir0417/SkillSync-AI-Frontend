import { z } from "zod";
import { apiSuccessSchema } from "./api.contract";

export const projectRecommendationSchema = z
  .object({
    title: z.string().optional(),
    difficulty: z.string().optional(),
    techStack: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    learningOutcomes: z.array(z.string()).optional(),
    deploymentSuggestion: z.string().optional(),
  })
  .passthrough();

export const projectRecommendationResponseSchema = apiSuccessSchema(
  z.union([
    z.array(projectRecommendationSchema),
    z.object({ projects: z.array(projectRecommendationSchema).optional() }).passthrough(),
  ]),
);

export type ProjectRecommendationContract = z.infer<typeof projectRecommendationSchema>;
