"use client";

import { Bot } from "lucide-react";
import { AiEndpointPage, toOptionalString, toStringArray } from "@/features/ai-tools/components/ai-endpoint-page";
import { aiApi, type AiLevel } from "@/lib/api/skillsync";

const levelOptions = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

export default function CareerChatPage() {
  return (
    <AiEndpointPage
      title="Career Chat Assistant"
      description="Ask career and learning questions with optional goal, level, and current skills context."
      submitLabel="Ask career assistant"
      icon={Bot}
      fields={[
        { name: "message", label: "Message", placeholder: "What should I learn after Express and Prisma?", type: "textarea", required: true },
        { name: "goal", label: "Goal", placeholder: "Become a backend developer" },
        { name: "level", label: "Level", type: "select", options: levelOptions },
        { name: "currentSkills", label: "Current skills", placeholder: "javascript, express, prisma", type: "textarea" },
      ]}
      defaultValues={{ message: "", goal: "", level: "intermediate", currentSkills: "" }}
      buildPayload={(values) => ({
        message: values.message.trim(),
        context: {
          goal: toOptionalString(values.goal),
          level: values.level as AiLevel,
          currentSkills: toStringArray(values.currentSkills),
        },
      })}
      submit={aiApi.careerChat}
    />
  );
}
