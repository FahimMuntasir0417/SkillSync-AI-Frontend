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
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useRegister } from "../hooks/use-register";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
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
    <form className="card grid gap-4 p-6" onSubmit={form.handleSubmit((data) => registerMutation.mutate(data))}>
      <div>
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create your SkillSync AI learner account.
        </p>
      </div>
      <label className="grid gap-2">
        <span className="text-sm font-semibold">Name</span>
        <Input {...form.register("name")} />
        <FormError message={form.formState.errors.name?.message} />
      </label>
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
      <Button disabled={registerMutation.isPending} type="submit">
        {registerMutation.isPending ? <LoadingSpinner /> : null}
        Create account
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already registered? <Link className="font-bold text-primary" href="/login">Login</Link>
      </p>
    </form>
  );
}
