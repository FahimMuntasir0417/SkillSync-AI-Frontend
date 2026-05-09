import axios from "axios";
import { env } from "@/config/env";

const externalApiBaseUrl = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/+$/, "");
const apiBaseUrl = typeof window === "undefined" ? externalApiBaseUrl : "/api/v1";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("skillsync_access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
