import { z } from "zod";
import {
  createIdeaInputSchema,
  ideaSchema,
  type CreateIdeaInput,
} from "@/contracts/idea.contract";
import { parseApiData, parseApiPayload } from "@/lib/api/parse";
import { httpClient } from "@/lib/axios/httpClient";

const ideaListSchema = z.array(ideaSchema);

type IdeaQueryOptions = {
  params?: Record<string, unknown>;
  signal?: AbortSignal;
};

export const ideaService = {
  async getAllIdeas(options: IdeaQueryOptions = {}) {
    const response = await httpClient.get<unknown>("/ideas", {
      params: options.params,
      signal: options.signal,
    });

    return parseApiData(response, ideaListSchema);
  },

  async createIdea(payload: CreateIdeaInput) {
    const parsedPayload = parseApiPayload(payload, createIdeaInputSchema);
    const response = await httpClient.post<unknown>("/ideas", parsedPayload);

    return parseApiData(response, ideaSchema);
  },
};
