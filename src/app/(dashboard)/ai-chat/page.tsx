import { PageHeader } from "@/components/ui/page-header";
import { ChatWindow } from "@/features/ai-chat/components/chat-window";

export default function AiChatPage() {
  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="AI tools"
        title="AI Chat Assistant"
        description="Use conversational help for learning plans, project decisions, and technical explanations."
      />
      <ChatWindow />
    </main>
  );
}
