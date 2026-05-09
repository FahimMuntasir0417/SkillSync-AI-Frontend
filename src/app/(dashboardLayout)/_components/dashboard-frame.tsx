"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getDefaultDashboardRoute, normalizeUserRole, type UserRole } from "@/lib/authUtils";

type DashboardFrameProps = {
  children: React.ReactNode;
};

const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

function readRoleFromToken(token: string | null): UserRole | null {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1] ?? "";
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(base64Url.length / 4) * 4, "=");
    const payload = JSON.parse(atob(base64)) as { role?: string };
    return normalizeUserRole(payload.role);
  } catch {
    return null;
  }
}

export function DashboardFrame({ children }: DashboardFrameProps) {
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getClientHydrationSnapshot,
    getServerHydrationSnapshot,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const storedRole = useAuthStore((state) => state.role);
  const token =
    accessToken ||
    (typeof window !== "undefined"
      ? localStorage.getItem("accessToken") || localStorage.getItem("skillsync_access_token")
      : null);
  const pathRole = pathname.startsWith("/admin")
    ? "ADMIN"
    : pathname.startsWith("/instructor")
      ? "INSTRUCTOR"
      : pathname.startsWith("/dashboard")
        ? "STUDENT"
        : null;
  const role = normalizeUserRole(readRoleFromToken(token) ?? storedRole);
  const routeRoleMatches =
    !pathRole ||
    pathRole === role ||
    ((role === "ADMIN" || role === "SUPER_ADMIN") && pathRole === "ADMIN");
  const hasToken =
    Boolean(accessToken) ||
    (typeof window !== "undefined" &&
      Boolean(localStorage.getItem("accessToken") || localStorage.getItem("skillsync_access_token")));

  useEffect(() => {
    if (mounted && !hasToken) {
      router.replace("/login");
      return;
    }

    if (mounted && hasToken && !routeRoleMatches) {
      router.replace(getDefaultDashboardRoute(role));
    }
  }, [hasToken, mounted, role, routeRoleMatches, router]);

  if (!mounted || !hasToken || !routeRoleMatches) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Checking session...</div>;
  }

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[292px_1fr]">
      <DashboardSidebar role={role} />
      <MobileSidebar onClose={() => setMobileOpen(false)} open={mobileOpen} role={role} />
      <div className="min-w-0 bg-background/70">
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} role={role} />
        {children}
      </div>
    </div>
  );
}
