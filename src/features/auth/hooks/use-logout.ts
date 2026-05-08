"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { useAuthStore } from "../store/auth-store";
import { authFeatureService } from "../services/auth.service";

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: () => authFeatureService.logout(),
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (error) => {
      logout();
      toast.error(getApiErrorMessage(error));
      router.push("/login");
    },
  });
}
