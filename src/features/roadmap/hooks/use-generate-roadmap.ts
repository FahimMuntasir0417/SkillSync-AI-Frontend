"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { generateRoadmap } from "../services/roadmap.service";
import type { RoadmapInput } from "../schemas/roadmap.schema";

export function useGenerateRoadmap() {
  return useMutation({
    mutationFn: (payload: RoadmapInput) => generateRoadmap(payload),
    onSuccess: () => toast.success("Roadmap generated"),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
