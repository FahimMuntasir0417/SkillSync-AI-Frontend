"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
  disabled?: boolean;
  onSend: (message: string) => void;
};

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSend(message);
    setMessage("");
  };

  return (
    <form className="flex items-end gap-3" onSubmit={handleSubmit}>
      <Textarea
        className="min-h-12 resize-none"
        disabled={disabled}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Ask for study help, concept explanation, or interview preparation..."
        value={message}
      />
      <Button aria-label="Send message" disabled={disabled || !message.trim()} size="icon" type="submit">
        <Send className="size-4" />
      </Button>
    </form>
  );
}
