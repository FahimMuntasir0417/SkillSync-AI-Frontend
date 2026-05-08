"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { recommendProjects } from "../services/project-recommender.service";
import type { ProjectRecommenderInput } from "../schemas/project-recommender.schema";

export function useRecommendProjects() {
  return useMutation({
    mutationFn: (payload: ProjectRecommenderInput) => recommendProjects(payload),
    onSuccess: () => toast.success("Project recommendations generated"),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
