import { Bot, BookOpen, BrainCircuit, ClipboardList, MessageSquareText, Newspaper, Route, WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

const tools = [
  {
    href: "/course-summary",
    title: "Course Summary",
    description: "Summarize a course by ID with the backend AI summary endpoint.",
    icon: BookOpen,
  },
  {
    href: "/study-chat",
    title: "Study Assistant",
    description: "Ask course or lesson-specific study questions with optional IDs.",
    icon: MessageSquareText,
  },
  {
    href: "/recommendations",
    title: "Recommendations",
    description: "Get general learning recommendations from an optional interest.",
    icon: WandSparkles,
  },
  {
    href: "/roadmap-generator",
    title: "Roadmap Generator",
    description: "Create a phased learning plan from your target role, level, and weekly hours.",
    icon: Route,
  },
  {
    href: "/skill-gap-analyzer",
    title: "Skill Gap Analyzer",
    description: "Compare your current skills against a target role and prioritize gaps.",
    icon: BrainCircuit,
  },
  {
    href: "/project-recommender",
    title: "Project Recommender",
    description: "Generate portfolio project ideas matched to your stack and experience level.",
    icon: WandSparkles,
  },
  {
    href: "/ai-chat",
    title: "AI Chat Assistant",
    description: "Ask learning, roadmap, and project questions inside the dashboard.",
    icon: MessageSquareText,
  },
  {
    href: "/career-chat",
    title: "Career Chat",
    description: "Ask career questions with goal, level, and current skills context.",
    icon: Bot,
  },
  {
    href: "/assignment-feedback",
    title: "Assignment Feedback",
    description: "Generate feedback from submission links, notes, or submission ID.",
    icon: ClipboardList,
  },
  {
    href: "/blog-generator",
    title: "Blog Generator",
    description: "Create a blog draft for a topic, tone, and audience.",
    icon: Newspaper,
  },
];

export default function Page() {
  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="Student"
        title="AI tools"
        description="Open the AI workflows connected to the SkillSync backend."
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tools.map((tool) => (
          <Card className="grid h-full gap-4" interactive key={tool.href}>
            <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <tool.icon className="size-6" />
            </div>
            <div>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
              <CardDescription className="mt-2">{tool.description}</CardDescription>
            </div>
            <Button asChild href={tool.href} variant="outline">
              <Bot className="size-4" />
              Open
            </Button>
          </Card>
        ))}
      </section>
    </main>
  );
}
