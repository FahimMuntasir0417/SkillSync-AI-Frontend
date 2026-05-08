import { z } from "zod";

export const apiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  });

export const apiPaginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    meta: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPage: z.number(),
    }),
    data: z.array(itemSchema),
  });

export const apiErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errors: z.array(z.unknown()).optional(),
});
