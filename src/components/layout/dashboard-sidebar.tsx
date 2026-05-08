"use client";

import {
  Bot,
  FolderClock,
  LayoutDashboard,
  MessageSquare,
  Route,
  Settings,
  Target,
  User,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const dashboardLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap-generator", label: "Roadmap Generator", icon: Route },
  { href: "/skill-gap-analyzer", label: "Skill Gap Analyzer", icon: Target },
  { href: "/project-recommender", label: "Project Recommender", icon: WandSparkles },
  { href: "/ai-chat", label: "AI Chat Assistant", icon: Bot },
  { href: "/saved-roadmaps", label: "Saved Roadmaps", icon: FolderClock },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

type DashboardSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export function DashboardSidebar({ className, onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("hidden min-h-screen border-r border-border bg-surface p-4 lg:block", className)}>
      <Link className="flex items-center gap-3 rounded-card bg-primary p-3 text-primary-foreground" href="/dashboard">
        <MessageSquare className="size-5" />
        <span className="font-bold">SkillSync AI</span>
      </Link>
      <nav className="mt-6 grid gap-2">
        {dashboardLinks.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-card px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground",
                active && "bg-muted text-foreground",
              )}
              href={item.href}
              key={item.href}
              onClick={onNavigate}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
