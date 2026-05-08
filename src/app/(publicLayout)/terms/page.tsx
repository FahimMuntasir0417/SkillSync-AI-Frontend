import { SectionHeading } from "@/components/ui/section-heading";

export default function TermsPage() {
  return (
    <main className="container-shell py-12">
      <SectionHeading eyebrow="Terms" title="Terms of use" description="Use SkillSync AI for lawful learning, course management, assignment submission, support, and AI-assisted study workflows." />
      <div className="card mt-8 space-y-5 p-6 text-sm leading-7 text-muted-foreground">
        <p>Users are responsible for accurate account information and appropriate platform usage.</p>
        <p>Course content, submissions, support tickets, and AI outputs should be reviewed before relying on them for decisions.</p>
        <p>Admins may manage accounts, roles, support records, and platform logs according to operational needs.</p>
      </div>
    </main>
  );
}
