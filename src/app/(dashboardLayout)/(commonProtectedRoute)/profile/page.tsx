"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Code2, Loader2, ShieldCheck, Target, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Textarea } from "@/components/ui/textarea";
import { authApi, userApi, type AuthUser } from "@/lib/api/skillsync";
import { getApiErrorMessage } from "@/lib/api-error";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(5, "Contact number is too short").optional().or(z.literal("")),
  address: z.string().min(2, "Address is too short").optional().or(z.literal("")),
  bio: z.string().optional(),
});

type ProfileInput = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      contactNumber: "",
      address: "",
      bio: "",
    },
  });

  useEffect(() => {
    authApi.me()
      .then((result) => {
        setUser(result.data);
        form.reset({
          name: result.data.name,
          contactNumber: result.data.contactNumber ?? "",
          address: result.data.address ?? "",
          bio: result.data.bio ?? "",
        });
      })
      .catch((error: unknown) => setNotice(getApiErrorMessage(error)))
      .finally(() => setLoading(false));
  }, [form]);

  const submit = async (payload: ProfileInput) => {
    setSaving(true);
    setNotice(null);

    try {
      const result = await userApi.updateProfile(payload);
      setUser(result.data);
      setNotice("Profile updated successfully.");
    } catch (error) {
      setNotice(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Manage the identity and contact information used across your learning workspace."
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Account summary</CardTitle>
            <CardDescription>Current authenticated user details.</CardDescription>
          </CardHeader>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading profile...
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="flex items-center gap-4 rounded-card bg-muted p-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <UserRound className="size-7" />
                </div>
                <div>
                  <p className="font-bold">{user?.name ?? "Unknown user"}</p>
                  <p className="text-sm text-muted-foreground">{user?.email ?? "No email available"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-card bg-muted p-4">
                <ShieldCheck className="size-5 text-primary" />
                <p className="text-sm font-semibold">{user?.role ?? "User"}</p>
              </div>
              <section className="rounded-card border border-border p-4">
                <div className="flex items-center gap-2 font-bold">
                  <Target className="size-4 text-primary" />
                  Learning goal
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Become a job-ready full-stack developer with strong AI-assisted workflow habits.
                </p>
              </section>
              <section className="rounded-card border border-border p-4">
                <div className="flex items-center gap-2 font-bold">
                  <Code2 className="size-4 text-primary" />
                  Skills and preferred stack
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"].map((skill) => (
                    <Badge key={skill} variant="primary">{skill}</Badge>
                  ))}
                </div>
              </section>
            </div>
          )}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Edit profile</CardTitle>
            <CardDescription>Keep your learner profile accurate for support and dashboard personalization.</CardDescription>
          </CardHeader>
          <form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Name</span>
              <Input {...form.register("name")} />
              <FormError message={form.formState.errors.name?.message} />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold">Contact number</span>
                <Input {...form.register("contactNumber")} />
                <FormError message={form.formState.errors.contactNumber?.message} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold">Address</span>
                <Input {...form.register("address")} />
                <FormError message={form.formState.errors.address?.message} />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Bio</span>
              <Textarea {...form.register("bio")} />
              <FormError message={form.formState.errors.bio?.message} />
            </label>
            <Button disabled={saving} type="submit">
              {saving ? <Loader2 className="size-4 animate-spin" /> : null}
              Save profile
            </Button>
            {notice ? <p className="rounded-card bg-muted px-4 py-3 text-sm text-muted-foreground">{notice}</p> : null}
          </form>
        </Card>
      </div>
    </main>
  );
}
