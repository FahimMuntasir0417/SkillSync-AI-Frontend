"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api-error";
import { sendAiChatMessage } from "../services/ai-chat.service";
import type { ChatMessage } from "../types/chat.types";

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const mutation = useMutation({
    mutationFn: (message: string) => sendAiChatMessage(message),
    onSuccess: (answer) => {
      setMessages((current) => [...current, createMessage("assistant", answer)]);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  const sendMessage = (content: string) => {
    const trimmed = content.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [...current, createMessage("user", trimmed)]);
    mutation.mutate(trimmed);
  };

  return {
    messages,
    sendMessage,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
