import { z } from "zod";

export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authTokenPayloadSchema = z
  .object({
    accessToken: z.string().optional(),
    refreshToken: z.string().optional(),
    role: z.string().optional(),
  })
  .passthrough();

export type LoginInput = z.infer<typeof loginInputSchema>;
export type AuthTokenPayload = z.infer<typeof authTokenPayloadSchema>;
