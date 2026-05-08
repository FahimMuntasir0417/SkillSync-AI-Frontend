import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Instructor"
      title="Blogs"
      description="Create and manage learning articles."
      actions={[{ href: "/blogs", label: "Public blogs" }]}
    />
  );
}
