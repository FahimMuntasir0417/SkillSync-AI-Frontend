import { create } from "zustand";
import { AUTH_STORAGE_KEYS } from "@/config/auth";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  role: string | null;
  setAuth: (user: AuthUser, accessToken: string, refreshToken?: string) => void;
  logout: () => void;
};

const setRouteGuardCookie = (accessToken: string) => {
  document.cookie = `skillsync_access_token=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
};

const clearRouteGuardCookie = () => {
  document.cookie = "skillsync_access_token=; path=/; max-age=0; SameSite=Lax";
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  role:
    typeof window !== "undefined"
      ? localStorage.getItem(AUTH_STORAGE_KEYS.userRole)
      : null,

  setAuth: (user, accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("skillsync_access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, refreshToken);
    }
    if (user.role) {
      localStorage.setItem(AUTH_STORAGE_KEYS.userRole, user.role);
    }
    setRouteGuardCookie(accessToken);
    set({ user, accessToken, role: user.role ?? null });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("skillsync_access_token");
    localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(AUTH_STORAGE_KEYS.userRole);
    clearRouteGuardCookie();
    set({ user: null, accessToken: null, role: null });
  },
}));
