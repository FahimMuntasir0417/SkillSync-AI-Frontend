import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Common"
      title="Saved courses"
      description="Keep a focused list of courses to revisit."
      actions={[{ href: "/courses", label: "Find courses" }]}
    />
  );
}
