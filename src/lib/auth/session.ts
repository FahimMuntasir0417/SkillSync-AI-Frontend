import { AUTH_STORAGE_KEYS } from "@/config/auth";

type SessionPayload = {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
};

function getStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStorageItem(key: string, value: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures.
  }
}

function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage failures.
  }
}

export function getAccessToken(): string | null {
  return getStorageItem(AUTH_STORAGE_KEYS.accessToken);
}

export function getRefreshToken(): string | null {
  return getStorageItem(AUTH_STORAGE_KEYS.refreshToken);
}

export function persistAuthSession(payload: SessionPayload): void {
  if (payload.accessToken) setStorageItem(AUTH_STORAGE_KEYS.accessToken, payload.accessToken);
  if (payload.refreshToken) setStorageItem(AUTH_STORAGE_KEYS.refreshToken, payload.refreshToken);
  if (payload.role) setStorageItem(AUTH_STORAGE_KEYS.userRole, payload.role);
}

export function clearAuthSession(): void {
  removeStorageItem(AUTH_STORAGE_KEYS.accessToken);
  removeStorageItem(AUTH_STORAGE_KEYS.refreshToken);
  removeStorageItem(AUTH_STORAGE_KEYS.userRole);
}
