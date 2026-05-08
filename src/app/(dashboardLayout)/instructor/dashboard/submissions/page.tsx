import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Instructor"
      title="Submission reviews"
      description="Review pending student submissions."
      actions={[{ href: "/instructor/dashboard/assignments", label: "Assignments" }]}
    />
  );
}
