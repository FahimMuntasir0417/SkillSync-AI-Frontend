"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { AUTH_STORAGE_KEYS } from "@/config/auth";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { getStoredToken } from "@/lib/api/skillsync";
import {
  getDefaultDashboardRoute,
  normalizeUserRole,
  type UserRole,
} from "@/lib/authUtils";
import { cn } from "@/lib/utils";

const mainRoutes = [
  { href: "/courses", label: "Course" },
  { href: "/blogs", label: "Blog" },
];

const aiRoutes = [
  { href: "/ai", label: "Roadmap Generator" },
  { href: "/course-summary", label: "Course Summary" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/career-chat", label: "Career Chat" },
];

const exploreRoutes = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help" },
  { href: "/privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms" },
];

function readRoleFromToken(token: string | null): UserRole | null {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1] ?? "";
    const base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(base64Url.length / 4) * 4, "=");
    const payload = JSON.parse(atob(base64)) as { role?: string };
    return normalizeUserRole(payload.role);
  } catch {
    return null;
  }
}

function readEmailFromToken(token: string | null): string | null {
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1] ?? "";
    const base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(base64Url.length / 4) * 4, "=");
    const payload = JSON.parse(atob(base64)) as { email?: string };
    return payload.email ?? null;
  } catch {
    return null;
  }
}

function readStoredRole(): UserRole {
  const token = getStoredToken();
  const storedRole = window.localStorage.getItem(AUTH_STORAGE_KEYS.userRole);

  return normalizeUserRole(readRoleFromToken(token) ?? storedRole);
}

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function hasActiveRoute(
  pathname: string,
  routes: { href: string; label: string }[],
) {
  return routes.some((route) => isActivePath(pathname, route.href));
}

const roleLabels: Record<UserRole, string> = {
  ADMIN: "Admin",
  INSTRUCTOR: "Instructor",
  STUDENT: "Learner",
  SUPER_ADMIN: "Super admin",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [dashboardHref, setDashboardHref] = useState("/login");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [accountRole, setAccountRole] = useState<UserRole>("STUDENT");
  const logoutMutation = useLogout();

  useEffect(() => {
    window.setTimeout(() => {
      const token = getStoredToken();
      const hasToken = Boolean(token);
      const role = readStoredRole();

      setAuthenticated(hasToken);
      setDashboardHref(hasToken ? getDefaultDashboardRoute(role) : "/login");
      setAccountRole(role);
      setAccountEmail(readEmailFromToken(token));
    }, 0);
  }, []);

  const closeMenus = () => {
    setOpen(false);
    setAiOpen(false);
    setExploreOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    closeMenus();
    logoutMutation.mutate();
  };
  const aiActive = hasActiveRoute(pathname, aiRoutes);
  const exploreActive = hasActiveRoute(pathname, exploreRoutes);
  const dashboardActive = isActivePath(pathname, dashboardHref);
  const navLinkClass = (active: boolean) =>
    cn(
      "rounded-card px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
      active && "bg-primary/10 text-primary ring-1 ring-primary/20",
    );
  const mobileLinkClass = (active: boolean) =>
    cn(
      "rounded-card px-3 py-3 text-sm font-semibold hover:bg-muted",
      active && "bg-primary/10 text-primary ring-1 ring-primary/20",
    );
  const dropdownLinkClass = (active: boolean) =>
    cn(
      "block rounded-card px-3 py-2 text-sm hover:bg-muted",
      active && "bg-primary/10 font-semibold text-primary",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <Link className="flex items-center gap-3 font-bold" href="/">
          <span className="flex size-10 items-center justify-center rounded-card bg-primary text-primary-foreground shadow-[0_12px_30px_color-mix(in_srgb,var(--primary)_26%,transparent)]">
            <Sparkles className="size-5" />
          </span>
          <span>SkillSync AI</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainRoutes.map((route) => (
            <Link
              className={navLinkClass(isActivePath(pathname, route.href))}
              href={route.href}
              key={route.href}
            >
              {route.label}
            </Link>
          ))}
          <div className="relative">
            <button
              className={cn(
                "flex items-center gap-1 rounded-card px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
                aiActive && "bg-primary/10 text-primary ring-1 ring-primary/20",
              )}
              onClick={() => {
                setAiOpen((value) => !value);
                setExploreOpen(false);
              }}
              type="button"
            >
              AI Tools
              <ChevronDown className="size-4" />
            </button>
            {aiOpen ? (
              <div className="card absolute left-0 mt-2 w-56 overflow-hidden p-2">
                {aiRoutes.map((route) => (
                  <Link
                    className={dropdownLinkClass(isActivePath(pathname, route.href))}
                    href={route.href}
                    key={route.href}
                    onClick={() => setAiOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="relative">
            <button
              className={cn(
                "flex items-center gap-1 rounded-card px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground",
                exploreActive && "bg-primary/10 text-primary ring-1 ring-primary/20",
              )}
              onClick={() => {
                setExploreOpen((value) => !value);
                setAiOpen(false);
              }}
              type="button"
            >
              Explore
              <ChevronDown className="size-4" />
            </button>
            {exploreOpen ? (
              <div className="card absolute left-0 mt-2 w-48 overflow-hidden p-2">
                {exploreRoutes.map((route) => (
                  <Link
                    className={dropdownLinkClass(isActivePath(pathname, route.href))}
                    href={route.href}
                    key={route.href}
                    onClick={() => setExploreOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            className={navLinkClass(dashboardActive)}
            href={dashboardHref}
          >
            Dashboard
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {authenticated ? (
            <div className="relative">
              <Button
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                onClick={() => setProfileOpen((value) => !value)}
                size="sm"
                type="button"
                variant="secondary"
              >
                <User className="size-4" />
                Account
                <ChevronDown className="size-4" />
              </Button>
              {profileOpen ? (
                <div
                  className="card absolute right-0 mt-2 w-56 overflow-hidden p-2"
                  role="menu"
                >
                  <div className="mb-2 grid gap-2 rounded-card bg-primary/10 px-3 py-2 ring-1 ring-primary/15">
                    <p className="truncate text-sm font-bold text-primary">
                      {accountEmail ?? "Signed in"}
                    </p>
                    <Badge variant="primary">{roleLabels[accountRole]}</Badge>
                  </div>
                  <Link
                    className="flex items-center gap-2 rounded-card px-3 py-2 text-sm hover:bg-muted"
                    href="/profile"
                    onClick={closeMenus}
                    role="menuitem"
                  >
                    <User className="size-4" />
                    Profile
                  </Link>
                  <Link
                    className="flex items-center gap-2 rounded-card px-3 py-2 text-sm hover:bg-muted"
                    href={dashboardHref}
                    onClick={closeMenus}
                    role="menuitem"
                  >
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
          ) : (
            <>
              <Button asChild href="/login" size="sm" variant="outline">
                Login
              </Button>
              <Button asChild href="/register" size="sm">
                Get Started
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
            size="icon"
            variant="outline"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-shell grid gap-2 py-4">
            {mainRoutes.map((route) => (
              <Link
                className={mobileLinkClass(isActivePath(pathname, route.href))}
                href={route.href}
                key={route.href}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="grid gap-1 rounded-card border border-border p-2">
              <p className="px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                AI Tools
              </p>
              {aiRoutes.map((route) => (
                <Link
                  className={cn(
                    "rounded-card px-3 py-2 text-sm font-semibold hover:bg-muted",
                    isActivePath(pathname, route.href) &&
                      "bg-primary/10 text-primary ring-1 ring-primary/20",
                  )}
                  href={route.href}
                  key={route.href}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="grid gap-1 rounded-card border border-border p-2">
              <p className="px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Explore
              </p>
              {exploreRoutes.map((route) => (
                <Link
                  className={cn(
                    "rounded-card px-3 py-2 text-sm font-semibold hover:bg-muted",
                    isActivePath(pathname, route.href) &&
                      "bg-primary/10 text-primary ring-1 ring-primary/20",
                  )}
                  href={route.href}
                  key={route.href}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </div>
            <Link
              className={mobileLinkClass(dashboardActive)}
              href={dashboardHref}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            {authenticated ? (
              <div className="grid gap-2 rounded-card border border-primary/20 bg-primary/10 p-3">
                <div>
                  <p className="truncate text-sm font-bold text-primary">
                    {accountEmail ?? "Signed in"}
                  </p>
                  <Badge className="mt-2" variant="primary">
                    {roleLabels[accountRole]}
                  </Badge>
                </div>
                <Link
                  className="flex items-center gap-2 rounded-card px-3 py-2 text-sm font-semibold hover:bg-muted"
                  href="/profile"
                  onClick={closeMenus}
                >
                  <User className="size-4" />
                  Profile
                </Link>
                <Link
                  className="flex items-center gap-2 rounded-card px-3 py-2 text-sm font-semibold hover:bg-muted"
                  href={dashboardHref}
                  onClick={closeMenus}
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
                <button
                  className="mt-1 flex w-full items-center gap-2 border-t border-primary/20 px-3 py-2 pt-3 text-left text-sm font-semibold text-danger hover:bg-muted disabled:pointer-events-none disabled:opacity-55"
                  disabled={logoutMutation.isPending}
                  onClick={handleLogout}
                  type="button"
                >
                  <LogOut className="size-4" />
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button asChild href="/login" variant="outline">
                  Login
                </Button>
                <Button asChild href="/register">
                  Get Started
                </Button>
              </div>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
