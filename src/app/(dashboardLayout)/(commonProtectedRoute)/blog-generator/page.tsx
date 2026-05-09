"use client";

import { Newspaper } from "lucide-react";
import { AiEndpointPage, toOptionalString } from "@/features/ai-tools/components/ai-endpoint-page";
import { aiApi } from "@/lib/api/skillsync";

export default function BlogGeneratorPage() {
  return (
    <AiEndpointPage
      title="Blog Generator"
      description="Generate a blog draft from a topic, tone, and target audience."
      submitLabel="Generate blog"
      icon={Newspaper}
      fields={[
        { name: "topic", label: "Topic", placeholder: "How to learn backend development", required: true },
        { name: "tone", label: "Tone", placeholder: "professional" },
        { name: "targetAudience", label: "Target audience", placeholder: "junior developers" },
      ]}
      defaultValues={{ topic: "", tone: "professional", targetAudience: "" }}
      buildPayload={(values) => ({
        topic: values.topic.trim(),
        tone: toOptionalString(values.tone),
        targetAudience: toOptionalString(values.targetAudience),
      })}
      submit={aiApi.blogGenerator}
    />
  );
}
