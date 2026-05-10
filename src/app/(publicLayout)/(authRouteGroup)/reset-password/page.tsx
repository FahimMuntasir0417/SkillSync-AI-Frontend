"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status";
import { authApi } from "@/lib/api/skillsync";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  otp: z.string().length(6, "OTP must be 6 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const pendingResetEmailKey = "skillsync_pending_reset_email";
const resetNoticeKey = "skillsync_reset_notice";

const getInitialResetState = () => {
  if (typeof window === "undefined") {
    return {
      email: "",
      notice: null as string | null,
    };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const notice = window.sessionStorage.getItem(resetNoticeKey);
  window.sessionStorage.removeItem(resetNoticeKey);

  return {
    email: searchParams.get("email") || window.localStorage.getItem(pendingResetEmailKey) || "",
    notice,
  };
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const [initialState] = useState(getInitialResetState);
  const [form, setForm] = useState(() => ({ email: initialState.email, otp: "", newPassword: "" }));
  const [message, setMessage] = useState<string | null>(initialState.notice);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Invalid reset request");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await authApi.resetPassword(parsed.data);
      window.localStorage.removeItem(pendingResetEmailKey);
      router.push("/login");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-shell grid min-h-[calc(100vh-64px)] place-items-center py-10">
      <form className="card grid w-full max-w-md gap-4 p-6" onSubmit={submit}>
        <h1 className="text-3xl font-bold">Reset password</h1>
        <Input label="OTP" onChange={(value) => setForm((state) => ({ ...state, otp: value }))} value={form.otp} />
        <Input label="New password" onChange={(value) => setForm((state) => ({ ...state, newPassword: value }))} type="password" value={form.newPassword} />
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Reset password
        </Button>
        {message ? <StatusMessage message={message} title="Reset password" tone={message.includes("OTP") ? "success" : "danger"} /> : null}
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
