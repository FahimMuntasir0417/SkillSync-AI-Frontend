import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Student"
      title="My learning"
      description="Track enrolled courses, lesson completion, and progress."
      actions={[{ href: "/my-classes", label: "My classes" }]}
    />
  );
}
