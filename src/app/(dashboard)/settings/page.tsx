"use client";

import { Bell, KeyRound, Moon, Shield } from "lucide-react";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

const settings = [
  { key: "emailDigest", label: "Weekly learning digest", description: "Receive a concise summary of roadmap progress.", icon: Bell },
  { key: "darkMode", label: "Prefer dark interface", description: "Use a low-glare dashboard appearance.", icon: Moon },
  { key: "securityAlerts", label: "Security alerts", description: "Notify me about login and account changes.", icon: Shield },
  { key: "apiReady", label: "API-ready history sync", description: "Keep saved AI generations prepared for backend sync.", icon: KeyRound },
] as const;

export default function SettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    emailDigest: true,
    darkMode: false,
    securityAlerts: true,
    apiReady: true,
  });

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Control dashboard preferences, notification behavior, and account safety defaults."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {settings.map((item) => (
          <Card className="flex items-start justify-between gap-5" key={item.key}>
            <div className="flex gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-card bg-muted text-primary">
                <item.icon className="size-5" />
              </div>
              <CardHeader className="mb-0 p-0">
                <CardTitle className="text-base">{item.label}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
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
          </Card>
        ))}
      </div>
    </main>
  );
}
