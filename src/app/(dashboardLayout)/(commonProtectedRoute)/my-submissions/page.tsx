import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Common"
      title="My submissions"
      description="Track assignment submissions and review outcomes."
      actions={[{ href: "/dashboard/submissions", label: "Open submissions" }]}
    />
  );
}
