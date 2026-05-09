"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AUTH_STORAGE_KEYS } from "@/config/auth";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

export default function GoogleAuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const role = searchParams.get("role");

    if (!accessToken || !role) {
      router.replace("/login?error=Google login did not return a valid session");
      return;
    }

    window.localStorage.setItem("accessToken", accessToken);
    window.localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, accessToken);
    window.localStorage.setItem(AUTH_STORAGE_KEYS.userRole, role);
    document.cookie = `skillsync_access_token=${accessToken}; path=/; max-age=604800; SameSite=Lax`;

    if (refreshToken) {
      window.localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, refreshToken);
    }

    router.replace(getDefaultDashboardRoute(role));
  }, [router]);

  return (
    <main className="container-shell grid min-h-[calc(100vh-64px)] place-items-center py-10">
      <div className="card p-6 text-sm text-muted-foreground">Completing Google login...</div>
    </main>
  );
}
