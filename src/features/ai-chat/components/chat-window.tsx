"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getApiErrorMessage } from "@/lib/api-error";
import { useAiChat } from "../hooks/use-ai-chat";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";

export function ChatWindow() {
  const chat = useAiChat();

  return (
    <Card className="grid min-h-[620px] grid-rows-[auto_1fr_auto]">
      <CardHeader>
        <CardTitle>AI chat assistant</CardTitle>
        <CardDescription>Ask questions about learning plans, skills, projects, and debugging concepts.</CardDescription>
      </CardHeader>
      <div className="grid content-start gap-4 overflow-y-auto rounded-card border border-border p-4">
        {chat.messages.length ? (
          chat.messages.map((message) => <ChatMessage key={message.id} message={message} />)
        ) : (
          <EmptyState title="Start a learning conversation" description="Send a question and the AI assistant will respond here." />
        )}
        {chat.isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoadingSpinner />
            Thinking...
          </div>
        ) : null}
        {chat.error ? <p className="text-sm text-danger">{getApiErrorMessage(chat.error)}</p> : null}
      </div>
      <div className="mt-4">
        <ChatInput disabled={chat.isLoading} onSend={chat.sendMessage} />
      </div>
    </Card>
  );
}
