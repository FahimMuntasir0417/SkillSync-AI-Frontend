import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ideaService } from "@/services/idea.service";
import { ideaQueryKeys } from "@/features/ideas/hooks/use-ideas-query";

export function useCreateIdeaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ideaService.createIdea,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ideaQueryKeys.lists() });
    },
  });
}
