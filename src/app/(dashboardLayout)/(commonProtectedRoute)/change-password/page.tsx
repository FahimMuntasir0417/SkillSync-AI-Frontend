"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusMessage } from "@/components/ui/status";
import { authApi } from "@/lib/api/skillsync";

const schema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Invalid password data");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await authApi.changePassword(parsed.data);
      setMessage("Password changed successfully.");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-shell grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <SectionHeading eyebrow="Security" title="Change password" description="Update the password for the currently authenticated account." />
      <form className="card grid gap-4 p-6" onSubmit={submit}>
        <Input label="Current password" onChange={(value) => setForm((state) => ({ ...state, currentPassword: value }))} value={form.currentPassword} />
        <Input label="New password" onChange={(value) => setForm((state) => ({ ...state, newPassword: value }))} value={form.newPassword} />
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Change password
        </Button>
        {message ? <StatusMessage message={message} title="Password update" tone={message.includes("success") ? "success" : "danger"} /> : null}
      </form>
    </main>
  );
}

function Input({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => onChange(event.target.value)} type="password" value={value} />
    </label>
  );
}
