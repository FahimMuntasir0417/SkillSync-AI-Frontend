import { Bot, GraduationCap, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export default function AboutPage() {
  return (
    <main className="container-shell py-12">
      <SectionHeading
        eyebrow="About"
        title="SkillSync AI connects structured learning with measurable outcomes"
        description="The frontend is designed to match the backend domain: courses, lessons, enrollments, assignments, reviews, dashboards, support, and AI tools."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          { icon: GraduationCap, title: "Learner-first", text: "Students get course discovery, progress tracking, submissions, and AI guidance." },
          { icon: ShieldCheck, title: "Role-aware", text: "Instructors and admins receive focused interfaces for their responsibilities." },
          { icon: Bot, title: "AI-assisted", text: "AI tools support summaries, roadmaps, skill gaps, projects, blogs, and career chat." },
        ].map((item) => (
          <article className="card p-6" key={item.title}>
            <item.icon className="size-9 text-primary" />
            <h2 className="mt-5 text-xl font-bold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
