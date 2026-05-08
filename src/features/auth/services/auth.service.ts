import { apiClient } from "@/lib/api-client";
import type { AuthUser } from "@/lib/api/skillsync";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
    user: AuthUser;
  };
};

type MeResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
};

export const authFeatureService = {
  async login(payload: LoginInput) {
    const response = await apiClient.post<AuthResponse>("/auth/login", payload);
    return response.data.data;
  },

  async register(payload: RegisterInput) {
    const response = await apiClient.post<AuthResponse>("/auth/register", payload);
    return response.data.data;
  },

  async logout() {
    const response = await apiClient.post<{ success: boolean; message: string; data: null }>(
      "/auth/logout",
    );
    return response.data.data;
  },

  async getMe() {
    const response = await apiClient.get<MeResponse>("/auth/me");
    return response.data.data;
  },
};
