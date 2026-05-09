"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { useAuthStore } from "../store/auth-store";
import { authFeatureService } from "../services/auth.service";
import type { RegisterInput } from "../schemas/auth.schema";

export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterInput) => authFeatureService.register(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      toast.success("Account created successfully");
      router.push(getDefaultDashboardRoute(data.user.role));
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
