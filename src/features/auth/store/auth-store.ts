import { create } from "zustand";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  setAuth: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,

  setAuth: (user, accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("skillsync_access_token", accessToken);
    set({ user, accessToken });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("skillsync_access_token");
    set({ user: null, accessToken: null });
  },
}));
