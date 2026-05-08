import { DashboardWorkspacePage } from "@/app/(dashboardLayout)/_components/dashboard-workspace-page";

export default function Page() {
  return (
    <DashboardWorkspacePage
      eyebrow="Student"
      title="Browse courses"
      description="Explore the public course catalog from the student workspace."
      actions={[{ href: "/courses", label: "Open catalog" }]}
    />
  );
}
