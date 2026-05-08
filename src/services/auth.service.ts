import { loginInputSchema, type LoginInput } from "@/contracts/auth.contract";
import { authApi, setStoredToken } from "@/lib/api/skillsync";
import { parseApiPayload } from "@/lib/api/parse";

export const authService = {
  async login(payload: LoginInput) {
    const parsedPayload = parseApiPayload(payload, loginInputSchema);
    const response = await authApi.login(parsedPayload);
    setStoredToken(response.data.accessToken, response.data.user.role, response.data.refreshToken);
    return response.data;
  },
};
