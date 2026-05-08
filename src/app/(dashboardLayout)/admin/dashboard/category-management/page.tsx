import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Admin"
      title="Category management"
      description="Create and update course categories."
      actions={[{ href: "/courses", label: "Courses" }]}
    />
  );
}
