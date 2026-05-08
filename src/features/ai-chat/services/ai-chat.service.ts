import { apiClient } from "@/lib/api-client";

type ChatResponse = {
  success: boolean;
  message: string;
  data: {
    answer?: string;
    response?: string;
    content?: string;
    message?: string;
  } | string;
};

export async function sendAiChatMessage(message: string) {
  const response = await apiClient.post<ChatResponse>("/ai/chat", { message });
  const data = response.data.data;

  if (typeof data === "string") {
    return data;
  }

  return data.answer ?? data.response ?? data.content ?? data.message ?? "The assistant returned an empty response.";
}
