"use client";

import { Bot, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getApiErrorMessage } from "@/lib/api-error";
import { useAiChat } from "../hooks/use-ai-chat";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";

const prompts = [
  "Create a React learning plan",
  "Review my backend roadmap",
  "Suggest projects for Next.js",
  "Explain system design basics",
];

export function ChatWindow() {
  const chat = useAiChat();

  return (
    <Card className="grid min-h-[680px] grid-rows-[auto_1fr_auto] overflow-hidden p-0">
      <CardHeader className="mb-0 border-b border-border p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>AI chat assistant</CardTitle>
            <CardDescription>Ask questions about learning plans, skills, projects, and debugging concepts.</CardDescription>
          </div>
          <Badge variant="primary">
            <Sparkles className="size-3.5" />
            Online
          </Badge>
        </div>
      </CardHeader>
      <div className="grid content-start gap-4 overflow-y-auto bg-muted/30 p-4 md:p-6">
        {chat.messages.length ? (
          chat.messages.map((message) => <ChatMessage key={message.id} message={message} />)
        ) : (
          <div className="grid gap-5">
            <EmptyState className="border-0 bg-surface/70 shadow-none" title="Start a learning conversation" description="Use a suggested prompt or ask your own question. The AI assistant will respond here." />
            <div className="flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button
                  className="focus-ring rounded-full border border-border bg-surface px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  key={prompt}
                  onClick={() => chat.sendMessage(prompt)}
                  type="button"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        {chat.isLoading ? (
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground shadow-sm">
            <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
              <Bot className="size-4" />
            </div>
            <LoadingSpinner />
            Thinking...
          </div>
        ) : null}
        {chat.error ? <p className="rounded-card bg-danger/10 px-4 py-3 text-sm font-medium text-danger">{getApiErrorMessage(chat.error)}</p> : null}
      </div>
      <div className="sticky bottom-0 border-t border-border bg-surface/90 p-4 backdrop-blur">
        <ChatInput disabled={chat.isLoading} onSend={chat.sendMessage} />
      </div>
    </Card>
  );
}
