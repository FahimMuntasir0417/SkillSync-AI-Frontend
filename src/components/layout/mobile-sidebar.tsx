"use client";

import { X } from "lucide-react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/lib/authUtils";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  role: UserRole;
};

export function MobileSidebar({ onClose, open, role }: MobileSidebarProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-foreground/30 lg:hidden">
      <div className="relative h-full w-72 bg-surface">
        <Button className="absolute right-3 top-3 z-10" onClick={onClose} size="icon" variant="outline">
          <X className="size-4" />
        </Button>
        <DashboardSidebar className="block lg:hidden" onNavigate={onClose} role={role} />
      </div>
    </div>
  );
}
