"use client";

import { AlertTriangle, Bell, KeyRound, Moon, Shield, UserRound, Wifi } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";

const notificationSettings = [
  { key: "emailDigest", label: "Weekly learning digest", description: "Receive a concise summary of roadmap progress.", icon: Bell },
  { key: "securityAlerts", label: "Security alerts", description: "Notify me about login and account changes.", icon: Shield },
  { key: "apiReady", label: "Saved AI history sync", description: "Keep generated roadmaps prepared for backend sync.", icon: KeyRound },
] as const;

export default function SettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    emailDigest: true,
    securityAlerts: true,
    apiReady: true,
  });

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Control account preferences, notifications, appearance, and backend readiness defaults."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="size-5 text-primary" />
              Account settings
            </CardTitle>
            <CardDescription>Profile defaults used across the dashboard.</CardDescription>
          </CardHeader>
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Display name</span>
              <Input defaultValue="SkillSync Learner" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Primary goal</span>
              <Input defaultValue="Become a full-stack AI product engineer" />
            </label>
            <Button className="w-fit">Save preferences</Button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="size-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Theme behavior and visual density preferences.</CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {["System theme", "Comfortable density", "High contrast focus states"].map((item) => (
              <div className="flex items-center justify-between rounded-card border border-border p-4" key={item}>
                <span className="text-sm font-semibold">{item}</span>
                <Badge variant="neutral">Enabled</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification settings</CardTitle>
          <CardDescription>Choose which learning and account events should notify you.</CardDescription>
        </CardHeader>
        <div className="grid gap-4 lg:grid-cols-3">
          {notificationSettings.map((item) => (
            <div className="rounded-card border border-border p-4" key={item.key}>
              <div className="flex items-start justify-between gap-5">
                <div className="flex gap-4">
                  <div className="grid size-11 shrink-0 place-items-center rounded-card bg-muted text-primary">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <button
                  aria-pressed={enabled[item.key]}
                  className="focus-ring h-7 w-12 shrink-0 rounded-full bg-muted p-1 transition data-[enabled=true]:bg-primary"
                  data-enabled={enabled[item.key]}
                  onClick={() => setEnabled((state) => ({ ...state, [item.key]: !state[item.key] }))}
                  type="button"
                >
                  <span className="block size-5 rounded-full bg-background transition data-[enabled=true]:translate-x-5" data-enabled={enabled[item.key]} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="size-5 text-success" />
              API/backend status
            </CardTitle>
            <CardDescription>Frontend is configured for backend integration through environment variables.</CardDescription>
          </CardHeader>
          <div className="rounded-card bg-success/10 p-4 text-sm font-semibold text-success">
            NEXT_PUBLIC_API_BASE_URL ready
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-danger">
              <AlertTriangle className="size-5" />
              Danger zone
            </CardTitle>
            <CardDescription>Destructive account deletion is not exposed by the current backend API.</CardDescription>
          </CardHeader>
          <Button disabled variant="danger">Delete account unavailable</Button>
        </Card>
      </div>
    </main>
  );
}
