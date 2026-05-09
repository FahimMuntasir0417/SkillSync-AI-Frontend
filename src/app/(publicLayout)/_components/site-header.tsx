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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { clearStoredToken, getStoredToken } from "@/lib/api/skillsync";

const publicRoutes = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it Works" },
  { href: "/#ai-tools", label: "AI Tools" },
  { href: "/#pricing", label: "Pricing" },
];

const protectedRoutes = [
  { href: "/dashboard", label: "Student" },
  { href: "/instructor/dashboard", label: "Instructor" },
  { href: "/admin/dashboard", label: "Admin" },
  { href: "/support", label: "Support" },
  { href: "/ai", label: "AI Tools" },
  { href: "/profile", label: "Profile" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    window.setTimeout(() => {
      setAuthenticated(Boolean(getStoredToken()));
    }, 0);
  }, []);

  const routes = authenticated ? protectedRoutes : publicRoutes;

  const logout = () => {
    clearStoredToken();
    setAuthenticated(false);
    window.location.href = "/";
  };

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
          {routes.map((route) => (
            <Link
              className="rounded-card px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
              href={route.href}
              key={route.href}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {authenticated ? (
            <div className="relative">
              <Button
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
                <div className="card absolute right-0 mt-2 w-56 overflow-hidden p-2">
                  <Link className="flex items-center gap-2 rounded-card px-3 py-2 text-sm hover:bg-muted" href="/profile">
                    <User className="size-4" />
                    Profile
                  </Link>
                  <Link className="flex items-center gap-2 rounded-card px-3 py-2 text-sm hover:bg-muted" href="/dashboard">
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                  <button
                    className="flex w-full items-center gap-2 rounded-card px-3 py-2 text-left text-sm text-danger hover:bg-muted"
                    onClick={logout}
                    type="button"
                  >
                    <LogOut className="size-4" />
                    Logout
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
            {routes.map((route) => (
              <Link
                className="rounded-card px-3 py-3 text-sm font-semibold hover:bg-muted"
                href={route.href}
                key={route.href}
                onClick={() => setOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            {authenticated ? (
              <Button onClick={logout} variant="danger">
                Logout
              </Button>
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
