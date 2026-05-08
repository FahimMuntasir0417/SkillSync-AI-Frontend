import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Common"
      title="Support tickets"
      description="Manage support requests and ticket replies."
      actions={[{ href: "/support", label: "Create ticket" }]}
    />
  );
}
