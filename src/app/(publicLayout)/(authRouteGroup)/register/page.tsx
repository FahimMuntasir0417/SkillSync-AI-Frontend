"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status";
import { authApi, setStoredToken } from "@/lib/api/skillsync";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = registerSchema.safeParse(form);

    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }

    setErrors({});
    setLoading(true);
    setMessage(null);

    try {
      const result = await authApi.register(parsed.data);
      setStoredToken(result.data.accessToken, result.data.user.role, result.data.refreshToken);
      setMessage("Account created. Check your email for the verification OTP.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-shell grid min-h-[calc(100vh-64px)] items-center py-10 lg:grid-cols-[1fr_0.9fr]">
      <section className="card mx-auto w-full max-w-xl p-6">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Register as a student and start learning with SkillSync AI.</p>
        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <Field error={errors.name} label="Name" onChange={(value) => setForm((state) => ({ ...state, name: value }))} type="text" value={form.name} />
          <Field error={errors.email} label="Email" onChange={(value) => setForm((state) => ({ ...state, email: value }))} type="email" value={form.email} />
          <Field error={errors.password} label="Password" onChange={(value) => setForm((state) => ({ ...state, password: value }))} type="password" value={form.password} />
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Register
          </Button>
        </form>
        {message ? (
          <div className="mt-5">
            <StatusMessage message={message} title={message.includes("created") ? "Success" : "Registration error"} tone={message.includes("created") ? "success" : "danger"} />
          </div>
        ) : null}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link className="font-bold text-primary" href="/login">Login</Link>
        </p>
      </section>

      <section className="hidden pl-10 lg:block">
        <p className="text-sm font-bold uppercase text-primary">Student onboarding</p>
        <h2 className="mt-3 text-5xl font-bold leading-tight">Create one profile for courses, support, and AI tools.</h2>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          The frontend validates your input before the request reaches the backend, then shows API success and error states clearly.
        </p>
      </section>
    </main>
  );
}

function Field({
  error,
  label,
  onChange,
  type,
  value,
}: {
  error?: string;
  label: string;
  onChange: (value: string) => void;
  type: string;
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => onChange(event.target.value)} type={type} value={value} />
      {error ? <span className="text-sm text-danger">{error}</span> : null}
    </label>
  );
}
