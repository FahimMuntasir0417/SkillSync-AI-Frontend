"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status";
import { authApi } from "@/lib/api/skillsync";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

const pendingResetEmailKey = "skillsync_pending_reset_email";
const resetNoticeKey = "skillsync_reset_notice";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = schema.safeParse({ email });

    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await authApi.forgetPassword(parsed.data);
      window.localStorage.setItem(pendingResetEmailKey, parsed.data.email);
      window.sessionStorage.setItem(resetNoticeKey, "Enter the OTP sent to your email and choose a new password.");
      router.push(`/reset-password?email=${encodeURIComponent(parsed.data.email)}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to request password reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-shell grid min-h-[calc(100vh-64px)] place-items-center py-10">
      <form className="card grid w-full max-w-md gap-4 p-6" onSubmit={submit}>
        <div>
          <h1 className="text-3xl font-bold">Forgot password</h1>
          <p className="mt-2 text-sm text-muted-foreground">Request an OTP to reset your SkillSync password.</p>
        </div>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Email</span>
          <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
        </label>
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Send reset OTP
        </Button>
        {message ? <StatusMessage message={message} title="Password reset" tone={message.includes("sent") ? "success" : "danger"} /> : null}
      </form>
    </main>
  );
}
