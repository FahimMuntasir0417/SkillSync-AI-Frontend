"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasToken =
    Boolean(accessToken) ||
    (typeof window !== "undefined" &&
      Boolean(localStorage.getItem("accessToken") || localStorage.getItem("skillsync_access_token")));

  useEffect(() => {
    if (!hasToken) {
      router.replace("/login");
    }
  }, [hasToken, router]);

  if (!hasToken) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Checking session...</div>;
  }

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <MobileSidebar onClose={() => setMobileOpen(false)} open={mobileOpen} />
      <div className="min-w-0">
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} />
        {children}
      </div>
    </div>
  );
}
