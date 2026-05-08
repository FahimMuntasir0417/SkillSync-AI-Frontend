import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Student"
      title="Submissions"
      description="Submit assignment work and track feedback."
      actions={[{ href: "/my-submissions", label: "My submissions" }]}
    />
  );
}
