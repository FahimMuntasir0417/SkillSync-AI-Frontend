"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { useAuthStore } from "../store/auth-store";
import { authFeatureService } from "../services/auth.service";
import type { LoginInput } from "../schemas/auth.schema";

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginInput) => authFeatureService.login(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
