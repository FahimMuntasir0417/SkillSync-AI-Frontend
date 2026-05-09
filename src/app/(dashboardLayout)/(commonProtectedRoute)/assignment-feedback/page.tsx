"use client";

import { ClipboardList } from "lucide-react";
import { AiEndpointPage, toOptionalString } from "@/features/ai-tools/components/ai-endpoint-page";
import { aiApi } from "@/lib/api/skillsync";

export default function AssignmentFeedbackPage() {
  return (
    <AiEndpointPage
      title="Assignment Feedback"
      description="Request AI feedback using a submission ID or direct GitHub/live links and notes."
      submitLabel="Generate feedback"
      icon={ClipboardList}
      fields={[
        { name: "submissionId", label: "Submission ID", placeholder: "submission-uuid" },
        { name: "githubUrl", label: "GitHub URL", placeholder: "https://github.com/user/project" },
        { name: "liveUrl", label: "Live URL", placeholder: "https://project.vercel.app" },
        { name: "notes", label: "Notes", placeholder: "I built an Express API with Prisma and JWT.", type: "textarea" },
      ]}
      defaultValues={{ submissionId: "", githubUrl: "", liveUrl: "", notes: "" }}
      buildPayload={(values) => ({
        submissionId: toOptionalString(values.submissionId),
        githubUrl: toOptionalString(values.githubUrl),
        liveUrl: toOptionalString(values.liveUrl),
        notes: toOptionalString(values.notes),
      })}
      submit={aiApi.assignmentFeedback}
    />
  );
}
