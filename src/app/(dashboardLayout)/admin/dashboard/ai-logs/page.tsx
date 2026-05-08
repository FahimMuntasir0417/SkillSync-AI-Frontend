import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Admin"
      title="AI logs"
      description="Monitor AI requests, responses, status, and user context."
      actions={[{ href: "/ai", label: "AI tools" }]}
    />
  );
}
