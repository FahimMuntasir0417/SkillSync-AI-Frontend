import { queryOptions, useQuery } from "@tanstack/react-query";
import { ideaService } from "@/services/idea.service";

export const ideaQueryKeys = {
  all: ["ideas"] as const,
  lists: () => [...ideaQueryKeys.all, "list"] as const,
  list: (params?: Record<string, unknown>) =>
    [...ideaQueryKeys.lists(), params ?? {}] as const,
};

export function getIdeasQueryOptions(params?: Record<string, unknown>) {
  return queryOptions({
    queryKey: ideaQueryKeys.list(params),
    queryFn: ({ signal }) => ideaService.getAllIdeas({ params, signal }),
  });
}

export function useIdeasQuery(params?: Record<string, unknown>) {
  return useQuery(getIdeasQueryOptions(params));
}
