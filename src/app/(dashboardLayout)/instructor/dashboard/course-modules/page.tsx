import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Instructor"
      title="Course modules"
      description="Organize course modules and lesson groups."
      actions={[{ href: "/instructor/dashboard/lessons", label: "Lessons" }]}
    />
  );
}
