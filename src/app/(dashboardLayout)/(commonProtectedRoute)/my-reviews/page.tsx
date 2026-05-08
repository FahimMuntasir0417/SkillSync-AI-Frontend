import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Common"
      title="My reviews"
      description="Review course ratings and instructor feedback."
      actions={[{ href: "/courses", label: "Review courses" }]}
    />
  );
}
