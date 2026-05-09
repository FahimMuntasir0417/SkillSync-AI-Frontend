import { z } from "zod";

export const projectRecommenderSchema = z.object({
  skillLevel: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Choose beginner, intermediate, or advanced",
  }),
  targetRole: z.string().min(2, "Target role is required"),
  knownTechnologies: z.string().min(2, "Known technologies are required"),
  preferredProjectType: z.string().min(2, "Project type is required"),
  availableTime: z.string().min(2, "Available time is required"),
});

export type ProjectRecommenderInput = z.infer<typeof projectRecommenderSchema>;
