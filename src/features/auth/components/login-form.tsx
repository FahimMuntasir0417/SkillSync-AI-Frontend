"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";
import { useLogin } from "../hooks/use-login";

export function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.replace("/dashboard");
    }
  }, [router]);

  const fillDemo = () => {
    form.setValue("email", "student@skillsync.ai");
    form.setValue("password", "Student@123456");
  };

  return (
    <form className="card grid gap-4 p-6" onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))}>
      <div>
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your SkillSync AI dashboard.
        </p>
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Email</span>
        <Input type="email" {...form.register("email")} />
        <FormError message={form.formState.errors.email?.message} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Password</span>
        <Input type="password" {...form.register("password")} />
        <FormError message={form.formState.errors.password?.message} />
      </label>
      <Button disabled={loginMutation.isPending} type="submit">
        {loginMutation.isPending ? <LoadingSpinner /> : null}
        Sign in
      </Button>
      <Button onClick={fillDemo} type="button" variant="outline">
        Demo login
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        No account? <Link className="font-bold text-primary" href="/register">Register</Link>
      </p>
    </form>
  );
}
