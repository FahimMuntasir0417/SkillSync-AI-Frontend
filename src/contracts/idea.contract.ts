import { z } from "zod";
import { idSchema } from "@/contracts/common";

export const ideaSchema = z
  .object({
    id: idSchema,
    title: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().nullable().optional(),
    status: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .passthrough();

export const createIdeaInputSchema = z
  .object({
    title: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().optional(),
  })
  .passthrough();

export type Idea = z.infer<typeof ideaSchema>;
export type CreateIdeaInput = z.infer<typeof createIdeaInputSchema>;
