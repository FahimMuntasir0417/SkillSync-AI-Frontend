import { DashboardFrame } from "./_components/dashboard-frame";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <DashboardFrame>{children}</DashboardFrame>
    </div>
  );
}
