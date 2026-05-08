"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status";
import { authApi } from "@/lib/api/skillsync";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z.string().length(6, "OTP must be 6 characters"),
});

export default function VerifyEmailPage() {
  const [form, setForm] = useState({ email: "", otp: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Invalid verification request");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await authApi.verifyEmail(parsed.data);
      setMessage("Email verified successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to verify email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-shell grid min-h-[calc(100vh-64px)] place-items-center py-10">
      <form className="card grid w-full max-w-md gap-4 p-6" onSubmit={submit}>
        <h1 className="text-3xl font-bold">Verify email</h1>
        <Input label="Email" onChange={(value) => setForm((state) => ({ ...state, email: value }))} type="email" value={form.email} />
        <Input label="OTP" onChange={(value) => setForm((state) => ({ ...state, otp: value }))} value={form.otp} />
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Verify email
        </Button>
        {message ? <StatusMessage message={message} title="Email verification" tone={message.includes("success") ? "success" : "danger"} /> : null}
      </form>
    </main>
  );
}

function Input({ label, onChange, type = "text", value }: { label: string; onChange: (value: string) => void; type?: string; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => onChange(event.target.value)} type={type} value={value} />
    </label>
  );
}
