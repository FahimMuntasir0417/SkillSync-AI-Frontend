"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusMessage } from "@/components/ui/status";
import { authApi, userApi, type AuthUser } from "@/lib/api/skillsync";

const profileSchema = z.object({
  name: z.string().min(2),
  contactNumber: z.string().min(5).optional().or(z.literal("")),
  address: z.string().min(2).optional().or(z.literal("")),
  bio: z.string().optional(),
});

export default function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [form, setForm] = useState({ name: "", contactNumber: "", address: "", bio: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    authApi.me()
      .then((result) => {
        setUser(result.data);
        setForm({
          name: result.data.name,
          contactNumber: result.data.contactNumber ?? "",
          address: result.data.address ?? "",
          bio: result.data.bio ?? "",
        });
      })
      .catch((error: unknown) => {
        setMessage(error instanceof Error ? error.message : "Unable to load profile");
      });
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Invalid profile data");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const result = await userApi.updateProfile(parsed.data);
      setUser(result.data);
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container-shell grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <section>
        <SectionHeading eyebrow="Profile" title="Manage your account" description="Update your personal information used across dashboards and course interactions." />
        {user ? (
          <div className="card mt-8 p-5">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="mt-1 text-xl font-bold">{user.email}</p>
            <p className="mt-2 inline-flex rounded-full bg-muted px-3 py-1 text-sm font-semibold">{user.role}</p>
          </div>
        ) : null}
      </section>
      <form className="card grid gap-4 p-6" onSubmit={submit}>
        <Input label="Name" onChange={(value) => setForm((state) => ({ ...state, name: value }))} value={form.name} />
        <Input label="Contact number" onChange={(value) => setForm((state) => ({ ...state, contactNumber: value }))} value={form.contactNumber} />
        <Input label="Address" onChange={(value) => setForm((state) => ({ ...state, address: value }))} value={form.address} />
        <label className="grid gap-2">
          <span className="text-sm font-semibold">Bio</span>
          <textarea className="focus-ring min-h-32 rounded-card border border-border bg-background p-3 text-sm" onChange={(event) => setForm((state) => ({ ...state, bio: event.target.value }))} value={form.bio} />
        </label>
        <Button disabled={loading} type="submit">
          {loading ? <Loader2 className="size-4 animate-spin" /> : null}
          Save profile
        </Button>
        {message ? <StatusMessage message={message} title={message.includes("success") ? "Success" : "Profile notice"} tone={message.includes("success") ? "success" : "danger"} /> : null}
      </form>
    </main>
  );
}

function Input({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold">{label}</span>
      <input className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm" onChange={(event) => onChange(event.target.value)} value={value} />
    </label>
  );
}
