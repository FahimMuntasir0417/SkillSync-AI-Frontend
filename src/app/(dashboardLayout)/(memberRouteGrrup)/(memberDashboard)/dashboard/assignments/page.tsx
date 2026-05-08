import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Student"
      title="Assignments"
      description="View active assignments for enrolled courses."
      actions={[{ href: "/dashboard/submissions", label: "Submissions" }]}
    />
  );
}
