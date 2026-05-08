"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusMessage } from "@/components/ui/status";
import { supportApi } from "@/lib/api/skillsync";

const ticketSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export default function SupportPage() {
  const [form, setForm] = useState({ subject: "", message: "", priority: "MEDIUM" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = ticketSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setLoading(true);
    setStatus(null);
    try {
      await supportApi.createTicket(parsed.data);
      setStatus("Support ticket created successfully.");
      setForm({ subject: "", message: "", priority: "MEDIUM" });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-shell grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
      <SectionHeading eyebrow="Support" title="Create a support ticket" description="Authenticated users can create support tickets and receive replies from admins." />
      <form className="card grid gap-4 p-6" onSubmit={submit}>
        <Input error={errors.subject} label="Subject" onChange={(value) => setForm((state) => ({ ...state, subject: value }))} value={form.subject} />
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Priority</span>
          <select className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => setForm((state) => ({ ...state, priority: event.target.value }))} value={form.priority}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Message</span>
          <textarea className="focus-ring min-h-36 rounded-card border border-border bg-background p-3 text-sm" onChange={(event) => setForm((state) => ({ ...state, message: event.target.value }))} value={form.message} />
          {errors.message ? <span className="text-sm text-danger">{errors.message}</span> : null}
        </label>
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Create ticket
        </Button>
        {status ? <StatusMessage message={status} title={status.includes("success") ? "Success" : "Support error"} tone={status.includes("success") ? "success" : "danger"} /> : null}
      </form>
    </main>
  );
}

function Input({ error, label, onChange, value }: { error?: string; label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => onChange(event.target.value)} value={value} />
      {error ? <span className="text-sm text-danger">{error}</span> : null}
    </label>
  );
}
