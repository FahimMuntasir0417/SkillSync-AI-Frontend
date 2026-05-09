"use client";

import { Bell, ChevronDown, LayoutDashboard, LogOut, Menu, Search, User, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { getDefaultDashboardRoute, type UserRole } from "@/lib/authUtils";

type DashboardHeaderProps = {
  onMenuClick?: () => void;
  role: UserRole;
};

const roleLabels: Record<UserRole, string> = {
  ADMIN: "Admin",
  INSTRUCTOR: "Instructor",
  STUDENT: "Learner",
  SUPER_ADMIN: "Super admin",
};

function readEmailFromToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = window.localStorage.getItem("accessToken") || window.localStorage.getItem("skillsync_access_token");
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1] ?? "";
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(base64Url.length / 4) * 4, "=");
    const payload = JSON.parse(atob(base64)) as { email?: string };
    return payload.email ?? null;
  } catch {
    return null;
  }
}

export function DashboardHeader({ onMenuClick, role }: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const logoutMutation = useLogout();
  const user = useAuthStore((state) => state.user);
  const label = roleLabels[role];
  const email = user?.email ?? readEmailFromToken();
  const dashboardHref = getDefaultDashboardRoute(role);
  const closeProfileMenu = () => setProfileOpen(false);
  const handleLogout = () => {
    closeProfileMenu();
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/82 px-4 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button aria-label="Open dashboard menu" className="lg:hidden" onClick={onMenuClick} size="icon" variant="outline">
            <Menu className="size-4" />
          </Button>
          <div className="hidden min-w-72 items-center gap-2 rounded-card border border-border bg-surface/80 px-3 py-2 shadow-sm md:flex">
            <Search className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search roadmaps, projects, skills...</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button aria-label="Notifications" size="icon" variant="outline">
            <Bell className="size-4" />
          </Button>
          <div className="relative">
            <button
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="focus-ring flex items-center gap-3 rounded-card border border-border bg-surface/80 px-3 py-2 text-left shadow-sm transition hover:bg-muted"
              onClick={() => setProfileOpen((value) => !value)}
              type="button"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <UserRound className="size-4" />
              </span>
              <span className="hidden min-w-0 sm:block">
                <span className="block text-sm font-bold">{user?.name || label}</span>
                <span className="block max-w-44 truncate text-xs font-semibold text-primary">{email ?? "Signed in"}</span>
              </span>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
            </button>
            {profileOpen ? (
              <div className="card absolute right-0 mt-2 w-56 overflow-hidden p-2" role="menu">
                <div className="mb-2 grid gap-2 rounded-card bg-primary/10 px-3 py-2 ring-1 ring-primary/15">
                  <p className="truncate text-sm font-bold text-primary">{email ?? "Signed in"}</p>
                  <Badge variant="primary">{label}</Badge>
                </div>
                <Link className="flex items-center gap-2 rounded-card px-3 py-2 text-sm hover:bg-muted" href="/profile" onClick={closeProfileMenu} role="menuitem">
                  <User className="size-4" />
                  Profile
                </Link>
                <Link className="flex items-center gap-2 rounded-card px-3 py-2 text-sm hover:bg-muted" href={dashboardHref} onClick={closeProfileMenu} role="menuitem">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
                <button
                  className="mt-2 flex w-full items-center gap-2 border-t border-border px-3 py-2 pt-3 text-left text-sm font-semibold text-danger hover:bg-muted disabled:pointer-events-none disabled:opacity-55"
                  disabled={logoutMutation.isPending}
                  onClick={handleLogout}
                  role="menuitem"
                  type="button"
                >
                  <LogOut className="size-4" />
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
