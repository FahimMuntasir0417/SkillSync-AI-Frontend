import { PromotionRequestsView } from "@/app/(dashboardLayout)/_components/dashboard-resource-views";

export default function AdminPromotionRequestsPage() {
  return (
    <PromotionRequestsView
      admin
      eyebrow="Admin workspace"
      title="Instructor promotion requests"
    />
  );
}
