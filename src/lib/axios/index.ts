import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { env } from "@/config/env";
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  persistAuthSession,
} from "@/lib/auth/session";

const EXTERNAL_API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/+$/, "");
const INTERNAL_API_BASE_URL = "/api/v1";
const API_BASE_URL =
  typeof window === "undefined" ? EXTERNAL_API_BASE_URL : INTERNAL_API_BASE_URL;

type AuthPayload = {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
};

type RetriableRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  withCredentials: true,
});

function extractAuthPayload(source: unknown): AuthPayload {
  if (!source || typeof source !== "object") return {};

  const root = source as Record<string, unknown>;
  const candidate =
    root.data && typeof root.data === "object"
      ? (root.data as Record<string, unknown>)
      : root;

  return {
    accessToken:
      (typeof candidate.accessToken === "string" && candidate.accessToken) ||
      (typeof candidate.token === "string" && candidate.token) ||
      undefined,
    refreshToken:
      (typeof candidate.refreshToken === "string" && candidate.refreshToken) || undefined,
    role: (typeof candidate.role === "string" && candidate.role) || undefined,
  };
}

async function requestTokenRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();

  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh-token`,
      refreshToken ? { refreshToken } : {},
      { headers: { "Content-Type": "application/json" }, timeout: 30_000 },
    );

    const authPayload = extractAuthPayload(response.data);
    if (!authPayload.accessToken) return null;

    persistAuthSession({
      accessToken: authPayload.accessToken,
      refreshToken: authPayload.refreshToken ?? refreshToken ?? undefined,
      role: authPayload.role,
    });

    return authPayload.accessToken;
  } catch {
    return null;
  }
}

let activeRefreshPromise: Promise<string | null> | null = null;

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    const payload = extractAuthPayload(response.data);
    if (payload.accessToken || payload.refreshToken || payload.role) {
      persistAuthSession(payload);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (!originalRequest || originalRequest.skipAuthRefresh || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!activeRefreshPromise) {
      activeRefreshPromise = requestTokenRefresh().finally(() => {
        activeRefreshPromise = null;
      });
    }

    const refreshedAccessToken = await activeRefreshPromise;

    if (!refreshedAccessToken) {
      clearAuthSession();
      return Promise.reject(error);
    }

    originalRequest.headers = originalRequest.headers ?? {};
    originalRequest.headers.Authorization = `Bearer ${refreshedAccessToken}`;

    return api(originalRequest);
  },
);

export default api;
