import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Admin"
      title="Courses management"
      description="Manage all platform courses and publishing state."
      actions={[{ href: "/courses", label: "Course catalog" }]}
    />
  );
}
