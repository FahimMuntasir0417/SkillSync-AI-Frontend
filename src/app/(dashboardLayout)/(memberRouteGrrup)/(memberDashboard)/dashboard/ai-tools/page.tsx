import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Student"
      title="AI tools"
      description="Use roadmap, study chat, recommendations, and career tools."
      actions={[{ href: "/ai", label: "Open AI tools" }]}
    />
  );
}
