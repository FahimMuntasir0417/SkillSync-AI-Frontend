import { z } from "zod";
import { apiSuccessSchema } from "./api.contract";

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerInputSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string().optional(),
  contactNumber: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
});

export const authTokenPayloadSchema = z
  .object({
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    role: z.string().optional(),
  })
  .passthrough();

export const authResponseSchema = apiSuccessSchema(
  z.object({
    user: authUserSchema,
    accessToken: z.string(),
    refreshToken: z.string().optional(),
  }),
);

export const meResponseSchema = apiSuccessSchema(authUserSchema);

export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegisterInput = z.infer<typeof registerInputSchema>;
export type AuthUserContract = z.infer<typeof authUserSchema>;
export type AuthTokenPayload = z.infer<typeof authTokenPayloadSchema>;
