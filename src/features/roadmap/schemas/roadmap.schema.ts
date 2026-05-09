import { z } from "zod";

export const roadmapSchema = z.object({
  targetRole: z.string().min(2, "Target role is required"),
  currentLevel: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Choose beginner, intermediate, or advanced",
  }),
  knownSkills: z.string().min(2, "Add at least one known skill"),
  weeklyStudyHours: z.number().min(1, "Study hours must be at least 1"),
  preferredLearningStyle: z.string().min(2, "Learning style is required"),
  targetTimeline: z.string().min(2, "Target timeline is required"),
});

export type RoadmapInput = z.infer<typeof roadmapSchema>;
