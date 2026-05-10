"use client";

import {
  Bell,
  Bot,
  BookOpen,
  Bookmark,
  ChevronDown,
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
  UserRoundPlus,
  Users,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { getNavItemsByRole } from "@/lib/navItems";
import { cn } from "@/lib/utils";
import { getDefaultDashboardRoute, type UserRole } from "@/lib/authUtils";
import type { NavItem, NavSection } from "@/types/dashboard.types";

const iconMap = {
  Bell,
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
  UserRoundPlus,
  Users,
  WandSparkles,
};

type DashboardSidebarProps = {
  className?: string;
  onNavigate?: () => void;
  role: UserRole;
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function hasActiveItem(section: NavSection, pathname: string) {
  return section.items.some((item) => isActivePath(pathname, item.href));
}

function SidebarNavLink({
  item,
  onNavigate,
  pathname,
}: {
  item: NavItem;
  onNavigate?: () => void;
  pathname: string;
}) {
  const active = isActivePath(pathname, item.href);
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? LayoutDashboard;

  return (
    <Link
      className={cn(
        "group flex w-full max-w-full items-center gap-3 rounded-card px-3 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
        active && "bg-primary/10 text-primary ring-1 ring-primary/20",
      )}
      href={item.href}
      onClick={onNavigate}
    >
      <Icon className={cn("size-4 shrink-0 transition group-hover:scale-110", active && "text-primary")} />
      <span className="min-w-0 truncate">{item.title}</span>
    </Link>
  );
}

export function DashboardSidebar({ className, onNavigate, role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navSections = useMemo(() => getNavItemsByRole(role), [role]);
  const defaultDashboard = getDefaultDashboardRoute(role);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const workspaceTitle =
    role === "ADMIN" || role === "SUPER_ADMIN"
      ? "Admin workspace"
      : role === "INSTRUCTOR"
        ? "Instructor workspace"
        : "Student workspace";

  const toggleSection = (title: string, defaultOpen: boolean) => {
    setOpenSections((current) => ({ ...current, [title]: !(current[title] ?? defaultOpen) }));
  };

  return (
    <aside
      className={cn(
        "hidden min-h-screen w-72 shrink-0 overflow-hidden border-r border-border bg-surface/86 p-4 backdrop-blur-xl lg:block",
        className,
      )}
    >
      <Link className="flex items-center gap-3 rounded-card bg-primary p-3 text-primary-foreground shadow-[0_12px_30px_color-mix(in_srgb,var(--primary)_24%,transparent)]" href={defaultDashboard}>
        <Sparkles className="size-5" />
        <span className="font-bold tracking-tight">SkillSync AI</span>
      </Link>
      <nav className="mt-6 grid min-w-0 gap-3 pr-2">
        {navSections.map((section, sectionIndex) => {
          if (!section.title) {
            return (
              <section className="grid min-w-0 gap-1.5" key={`section-${sectionIndex}`}>
                {section.items.map((item) => (
                  <SidebarNavLink item={item} key={item.href} onNavigate={onNavigate} pathname={pathname} />
                ))}
              </section>
            );
          }

          const active = hasActiveItem(section, pathname);
          const open = openSections[section.title] ?? active;
          const SectionIcon = iconMap[section.icon as keyof typeof iconMap] ?? LayoutDashboard;

          return (
            <section className="grid min-w-0 gap-1.5" key={section.title}>
              <button
                aria-expanded={open}
                className={cn(
                  "focus-ring grid w-full max-w-full grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-card px-3 py-2.5 text-left text-xs font-bold uppercase tracking-[0.04em] text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  active && "bg-primary/10 text-primary ring-1 ring-primary/20",
                )}
                onClick={() => toggleSection(section.title as string, active)}
                type="button"
              >
                <span className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                  <SectionIcon className="size-4 shrink-0" />
                  <span className="min-w-0 truncate">{section.title}</span>
                </span>
                <ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
              </button>
              {open ? (
                <div className="grid min-w-0 gap-1.5 pl-2">
                  {section.items.map((item) => (
                    <SidebarNavLink item={item} key={item.href} onNavigate={onNavigate} pathname={pathname} />
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
      </nav>
      <div className="mr-2 mt-6 rounded-card border border-border bg-muted/60 p-4">
        <div className="flex items-center gap-3">
          <MessageSquareText className="size-5 text-primary" />
          <p className="text-sm font-bold">{workspaceTitle}</p>
        </div>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Generate roadmaps, compare skills, and ask for learning support from one dashboard.
        </p>
      </div>
    </aside>
  );
}
