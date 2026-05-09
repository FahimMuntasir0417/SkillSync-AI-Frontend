import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "../types/chat.types";

type ChatMessageProps = {
  message: ChatMessageType;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <article className={cn("flex gap-3", isUser && "justify-end")}>
      {!isUser ? (
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
          <Bot className="size-5" />
        </div>
      ) : null}
      <div className={cn("max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm", isUser ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border border-border bg-surface text-foreground")}>
        {message.content}
      </div>
      {isUser ? (
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-foreground">
          <User className="size-5" />
        </div>
      ) : null}
    </article>
  );
}
