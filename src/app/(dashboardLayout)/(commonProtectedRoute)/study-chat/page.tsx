"use client";

import { MessageSquareText } from "lucide-react";
import { AiEndpointPage, toOptionalString } from "@/features/ai-tools/components/ai-endpoint-page";
import { aiApi } from "@/lib/api/skillsync";

export default function StudyChatPage() {
  return (
    <AiEndpointPage
      title="Study Assistant"
      description="Ask lesson or course-specific study questions. Course ID and lesson ID are optional."
      submitLabel="Ask study assistant"
      icon={MessageSquareText}
      fields={[
        { name: "message", label: "Message", placeholder: "Explain JWT refresh token in simple terms", type: "textarea", required: true },
        { name: "courseId", label: "Course ID", placeholder: "course-uuid" },
        { name: "lessonId", label: "Lesson ID", placeholder: "lesson-uuid" },
      ]}
      defaultValues={{ message: "", courseId: "", lessonId: "" }}
      buildPayload={(values) => ({
        message: values.message.trim(),
        courseId: toOptionalString(values.courseId),
        lessonId: toOptionalString(values.lessonId),
      })}
      submit={aiApi.studyChat}
    />
  );
}
