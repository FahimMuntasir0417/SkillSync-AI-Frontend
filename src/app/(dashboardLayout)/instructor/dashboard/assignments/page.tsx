import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Instructor"
      title="Assignments"
      description="Create and manage course assignments."
      actions={[{ href: "/instructor/dashboard/submissions", label: "Submissions" }]}
    />
  );
}
