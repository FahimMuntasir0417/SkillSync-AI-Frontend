"use client";

import { Bell, ChevronDown, LogOut, Menu, Search, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useAuthStore } from "@/features/auth/store/auth-store";
import type { UserRole } from "@/lib/authUtils";

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

export function DashboardHeader({ onMenuClick, role }: DashboardHeaderProps) {
  const logoutMutation = useLogout();
  const user = useAuthStore((state) => state.user);
  const label = roleLabels[role];

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
          <div className="hidden items-center gap-3 rounded-card border border-border bg-surface/80 px-3 py-2 shadow-sm sm:flex">
            <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
              <UserRound className="size-4" />
            </span>
            <div className="text-left">
              <p className="text-sm font-bold">{user?.name || label}</p>
              <p className="text-xs text-muted-foreground">{label} dashboard</p>
            </div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </div>
          <Button disabled={logoutMutation.isPending} onClick={() => logoutMutation.mutate()} variant="outline">
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
