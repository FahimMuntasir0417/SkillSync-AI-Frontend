"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { analyzeSkillGap } from "../services/skill-gap.service";
import type { SkillGapInput } from "../schemas/skill-gap.schema";

export function useAnalyzeSkillGap() {
  return useMutation({
    mutationFn: (payload: SkillGapInput) => analyzeSkillGap(payload),
    onSuccess: () => toast.success("Skill gap analysis complete"),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
