"use client";

import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusMessage } from "@/components/ui/status";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <main className="container-shell grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <SectionHeading
          eyebrow="Contact"
          title="Talk to the SkillSync AI team"
          description="Use this page for product, support, and implementation questions."
        />
        <div className="mt-8 grid gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-3"><Mail className="size-5 text-primary" /> support@skillsync.ai</span>
          <span className="flex items-center gap-3"><Phone className="size-5 text-primary" /> +880 1700 000000</span>
          <span className="flex items-center gap-3"><MapPin className="size-5 text-primary" /> Dhaka, Bangladesh</span>
        </div>
      </section>
      <form className="card grid gap-4 p-6" onSubmit={submit}>
        <Input error={errors.name} label="Name" onChange={(value) => setForm((state) => ({ ...state, name: value }))} value={form.name} />
        <Input error={errors.email} label="Email" onChange={(value) => setForm((state) => ({ ...state, email: value }))} type="email" value={form.email} />
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Message</span>
          <textarea className="focus-ring min-h-36 rounded-card border border-border bg-background p-3 text-sm" onChange={(event) => setForm((state) => ({ ...state, message: event.target.value }))} value={form.message} />
          {errors.message ? <span className="text-sm text-danger">{errors.message}</span> : null}
        </label>
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Send message
        </Button>
        {success ? <StatusMessage message="Your message has been prepared successfully." title="Success" tone="success" /> : null}
      </form>
    </main>
  );
}

function Input({ error, label, onChange, type = "text", value }: { error?: string; label: string; onChange: (value: string) => void; type?: string; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => onChange(event.target.value)} type={type} value={value} />
      {error ? <span className="text-sm text-danger">{error}</span> : null}
    </label>
  );
}
