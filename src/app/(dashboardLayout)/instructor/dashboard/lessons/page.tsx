import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Instructor"
      title="Lessons"
      description="Create, update, and arrange lessons inside modules."
      actions={[{ href: "/instructor/dashboard/course-modules", label: "Modules" }]}
    />
  );
}
