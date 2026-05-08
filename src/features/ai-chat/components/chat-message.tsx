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
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <Bot className="size-4" />
        </div>
      ) : null}
      <div className={cn("max-w-[78%] rounded-card px-4 py-3 text-sm leading-6", isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        {message.content}
      </div>
      {isUser ? (
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-foreground">
          <User className="size-4" />
        </div>
      ) : null}
    </article>
  );
}
