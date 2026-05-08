import { SectionHeading } from "@/components/ui/section-heading";

export default function PrivacyPage() {
  return (
    <main className="container-shell py-12">
      <SectionHeading eyebrow="Privacy" title="Privacy policy" description="SkillSync AI stores account, course, learning progress, support, and AI request data needed to operate the platform." />
      <div className="card mt-8 space-y-5 p-6 text-sm leading-7 text-muted-foreground">
        <p>Authentication data is used to secure user access and enforce role-based permissions.</p>
        <p>Learning records are used for enrollments, progress, submissions, reviews, and dashboard analytics.</p>
        <p>AI request logs are stored for platform observability and admin review.</p>
      </div>
    </main>
  );
}
