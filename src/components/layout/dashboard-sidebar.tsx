"use client";

import {
  Bot,
  BookOpen,
  Bookmark,
  ClipboardList,
  Compass,
  FolderClock,
  GraduationCap,
  Home,
  KeyRound,
  LayoutDashboard,
  MessageSquareText,
  Newspaper,
  Route,
  Send,
  Settings,
  Sparkles,
  Target,
  Ticket,
  User,
  Users,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItemsByRole } from "@/lib/navItems";
import { cn } from "@/lib/utils";
import { getDefaultDashboardRoute, type UserRole } from "@/lib/authUtils";

const iconMap = {
  Bookmark,
  BookOpen,
  Bot,
  ClipboardList,
  Compass,
  FolderClock,
  GraduationCap,
  Home,
  KeyRound,
  LayoutDashboard,
  MessageSquare: MessageSquareText,
  Newspaper,
  Route,
  Send,
  Settings,
  Sparkles,
  Target,
  Ticket,
  User,
  Users,
  WandSparkles,
};

type DashboardSidebarProps = {
  className?: string;
  onNavigate?: () => void;
  role: UserRole;
};

export function DashboardSidebar({ className, onNavigate, role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navSections = getNavItemsByRole(role);
  const defaultDashboard = getDefaultDashboardRoute(role);

  return (
    <aside className={cn("hidden min-h-screen border-r border-border bg-surface/86 p-4 backdrop-blur-xl lg:block", className)}>
      <Link className="flex items-center gap-3 rounded-card bg-primary p-3 text-primary-foreground shadow-[0_12px_30px_color-mix(in_srgb,var(--primary)_24%,transparent)]" href={defaultDashboard}>
        <Sparkles className="size-5" />
        <span className="font-bold tracking-tight">SkillSync AI</span>
      </Link>
      <nav className="mt-6 grid gap-5">
        {navSections.map((section, sectionIndex) => (
          <section className="grid gap-1.5" key={section.title ?? `section-${sectionIndex}`}>
            {section.title ? (
              <p className="px-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {section.title}
              </p>
            ) : null}
            {section.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? LayoutDashboard;

              return (
                <Link
                  className={cn(
                    "group flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
                    active && "bg-primary/10 text-primary ring-1 ring-primary/20",
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={onNavigate}
                >
                  <Icon className={cn("size-4 transition group-hover:scale-110", active && "text-primary")} />
                  {item.title}
                </Link>
              );
            })}
          </section>
        ))}
      </nav>
      <div className="mt-6 rounded-card border border-border bg-muted/60 p-4">
        <div className="flex items-center gap-3">
          <MessageSquareText className="size-5 text-primary" />
          <p className="text-sm font-bold">AI workspace</p>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Generate roadmaps, compare skills, and ask for learning support from one dashboard.
        </p>
      </div>
    </aside>
  );
}
