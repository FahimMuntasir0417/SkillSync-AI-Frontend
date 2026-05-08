"use client";

import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/use-logout";

type DashboardHeaderProps = {
  onMenuClick?: () => void;
};

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const logoutMutation = useLogout();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur">
      <Button className="lg:hidden" onClick={onMenuClick} size="icon" variant="outline">
        <Menu className="size-4" />
      </Button>
      <div>
        <p className="text-sm font-bold">AI Learning Workspace</p>
        <p className="text-xs text-muted-foreground">Plan, analyze, recommend, and chat.</p>
      </div>
      <Button disabled={logoutMutation.isPending} onClick={() => logoutMutation.mutate()} variant="outline">
        <LogOut className="size-4" />
        Logout
      </Button>
    </header>
  );
}
