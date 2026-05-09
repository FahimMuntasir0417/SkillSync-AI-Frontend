"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { authFeatureService } from "../services/auth.service";
import type { RegisterInput } from "../schemas/auth.schema";

const pendingVerificationEmailKey = "skillsync_pending_verification_email";

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterInput) => authFeatureService.register(payload),
    onSuccess: (_data, variables) => {
      localStorage.setItem(pendingVerificationEmailKey, variables.email);
      toast.success("Account created. Verify your email to continue.");
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
