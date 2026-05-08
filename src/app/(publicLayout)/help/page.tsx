import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const items = [
  "Use /courses to find and filter courses.",
  "Use seeded demo credentials to test dashboards.",
  "Students can enroll, submit assignments, and open support tickets.",
  "Instructors can manage course learning content and reviews.",
  "Admins can manage platform operations and AI logs.",
];

export default function HelpPage() {
  return (
    <main className="container-shell py-12">
      <SectionHeading eyebrow="Help" title="How to use SkillSync AI" description="This guide maps the frontend screens to the backend learning workflows." />
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <div className="card flex items-center gap-3 p-5" key={item}>
            <CheckCircle2 className="size-5 text-success" />
            <span className="font-semibold">{item}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
