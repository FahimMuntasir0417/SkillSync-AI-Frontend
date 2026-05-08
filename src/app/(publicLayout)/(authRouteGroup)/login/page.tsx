"use client";

import { Facebook, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status";
import { env } from "@/config/env";
import { authApi, setStoredToken } from "@/lib/api/skillsync";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    const parsed = loginSchema.safeParse(form);

    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const result = await authApi.login(parsed.data);
      setStoredToken(result.data.accessToken, result.data.user.role, result.data.refreshToken);
      setMessage("Login successful. Redirecting to your dashboard.");
      const rolePath =
        result.data.user.role === "ADMIN"
          ? "/admin/dashboard"
          : result.data.user.role === "INSTRUCTOR"
            ? "/instructor/dashboard"
            : "/dashboard";
      router.push(rolePath);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role: "student" | "instructor" | "admin") => {
    const credentials = {
      student: { email: "student@skillsync.ai", password: "Student@123456" },
      instructor: { email: "instructor@skillsync.ai", password: "Instructor@123456" },
      admin: { email: "admin@skillsync.ai", password: "Admin@123456" },
    };
    setForm(credentials[role]);
    setErrors({});
  };

  const backendUrl = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/api\/v1\/?$/, "");

  return (
    <main className="container-shell grid min-h-[calc(100vh-64px)] items-center py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden pr-10 lg:block">
        <p className="text-sm font-bold uppercase text-primary">Welcome back</p>
        <h1 className="mt-3 text-5xl font-bold leading-tight">Continue learning with role-aware dashboards.</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Use seeded demo credentials to test student, instructor, and admin workflows against the backend.
        </p>
      </section>

      <section className="card mx-auto w-full max-w-xl p-6">
        <h2 className="text-3xl font-bold">Login</h2>
        <p className="mt-2 text-sm text-muted-foreground">Access your courses, reviews, support, and AI tools.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Button onClick={() => fillDemoCredentials("student")} type="button" variant="outline">Student demo</Button>
          <Button onClick={() => fillDemoCredentials("instructor")} type="button" variant="outline">Instructor demo</Button>
          <Button onClick={() => fillDemoCredentials("admin")} type="button" variant="outline">Admin demo</Button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={submit}>
          <Field
            error={errors.email}
            label="Email"
            onChange={(value) => setForm((state) => ({ ...state, email: value }))}
            type="email"
            value={form.email}
          />
          <Field
            error={errors.password}
            label="Password"
            onChange={(value) => setForm((state) => ({ ...state, password: value }))}
            type="password"
            value={form.password}
          />
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Sign in
          </Button>
        </form>

        {message ? (
          <div className="mt-5">
            <StatusMessage message={message} title={message.includes("successful") ? "Success" : "Authentication error"} tone={message.includes("successful") ? "success" : "danger"} />
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button asChild href={`${backendUrl}/api/v1/auth/google`} variant="outline">
            <Mail className="size-4" />
            Continue with Google
          </Button>
          <Button onClick={() => setMessage("Facebook login is not configured by the backend yet.")} type="button" variant="outline">
            <Facebook className="size-4" />
            Continue with Facebook
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to SkillSync AI? <Link className="font-bold text-primary" href="/register">Create an account</Link>
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
      <input
        className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm"
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
      {error ? <span className="text-sm text-danger">{error}</span> : null}
    </label>
  );
}
