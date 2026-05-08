import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Instructor"
      title="My courses"
      description="Create and manage instructor-owned courses."
      actions={[{ href: "/courses", label: "Course catalog" }]}
    />
  );
}
