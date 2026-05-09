"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useRegister } from "../hooks/use-register";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <form className="glass-panel grid gap-5 rounded-[28px] p-6 md:p-8" onSubmit={form.handleSubmit((data) => registerMutation.mutate(data))}>
      <Link className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground" href="/">
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
      <div>
        <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="size-6" />
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight">Create your SkillSync AI account</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Start building your personalized learning roadmap today.
        </p>
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Name</span>
        <Input autoComplete="name" {...form.register("name")} />
        <FormError message={form.formState.errors.name?.message} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Email</span>
        <Input autoComplete="email" type="email" {...form.register("email")} />
        <FormError message={form.formState.errors.email?.message} />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Password</span>
        <div className="relative">
          <Input autoComplete="new-password" className="pr-11" type={showPassword ? "text" : "password"} {...form.register("password")} />
          <button
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="focus-ring absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-card text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => setShowPassword((value) => !value)}
            type="button"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <FormError message={form.formState.errors.password?.message} />
      </label>
      <Button disabled={registerMutation.isPending} type="submit">
        {registerMutation.isPending ? <LoadingSpinner /> : null}
        Create account
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already registered? <Link className="font-bold text-primary hover:underline" href="/login">Login</Link>
      </p>
    </form>
  );
}
