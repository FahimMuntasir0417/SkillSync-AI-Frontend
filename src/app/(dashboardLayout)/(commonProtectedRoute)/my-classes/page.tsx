import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Common"
      title="My classes"
      description="Review enrolled courses and learning progress."
      actions={[{ href: "/courses", label: "Browse courses" }]}
    />
  );
}
