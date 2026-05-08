import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Admin"
      title="Users management"
      description="Manage users, role changes, and blocked status."
      actions={[{ href: "/admin/dashboard", label: "Admin overview" }]}
    />
  );
}
