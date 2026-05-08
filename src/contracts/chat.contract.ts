import { z } from "zod";
import { apiSuccessSchema } from "./api.contract";

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  createdAt: z.string(),
});

export const chatResponseSchema = apiSuccessSchema(
  z.union([
    z.string(),
    z
      .object({
        answer: z.string().optional(),
        response: z.string().optional(),
        content: z.string().optional(),
        message: z.string().optional(),
      })
      .passthrough(),
  ]),
);

export type ChatMessageContract = z.infer<typeof chatMessageSchema>;
