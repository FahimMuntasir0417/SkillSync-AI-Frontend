import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Admin"
      title="Blog management"
      description="Manage public blog content and publishing state."
      actions={[{ href: "/blogs", label: "Blogs" }]}
    />
  );
}
