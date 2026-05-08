import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Admin"
      title="Support management"
      description="Review tickets, update ticket status, and reply to users."
      actions={[{ href: "/support", label: "Support" }]}
    />
  );
}
