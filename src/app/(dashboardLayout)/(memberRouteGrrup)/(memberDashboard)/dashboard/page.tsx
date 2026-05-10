import {
  Bot,
  CalendarClock,
  CheckCircle2,
  MessageSquareText,
  Route,
  Target,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";

const stats = [
  { label: "Roadmaps Created", value: "12", description: "Across career goals", icon: Route, trend: "+3 this week" },
  { label: "Skills Analyzed", value: "48", description: "Mapped to target roles", icon: Target, trend: "+9 improved" },
  { label: "Projects Suggested", value: "26", description: "Portfolio-ready ideas", icon: WandSparkles, trend: "+6 new" },
  { label: "AI Chats", value: "84", description: "Learning questions answered", icon: Bot, trend: "12 today" },
];

const quickActions = [
  { href: "/dashboard/roadmap-generator", label: "Generate Roadmap", description: "Create a phased learning plan", icon: Route },
  { href: "/skill-gap-analyzer", label: "Analyze Skill Gap", description: "Find your next priority skills", icon: Target },
  { href: "/project-recommender", label: "Get Project Ideas", description: "Build the right portfolio work", icon: WandSparkles },
  { href: "/ai-chat", label: "Ask AI Assistant", description: "Get learning support instantly", icon: MessageSquareText },
];

export default function DashboardPage() {
  return (
    <main className="grid gap-8 p-4 md:p-8">
      <PageHeader
        eyebrow="Dashboard"
        title="Welcome back to SkillSync AI"
        description="Your AI learning workspace is ready. Generate a roadmap, analyze gaps, or choose the next project to build."
        actions={
          <Button asChild href="/dashboard/roadmap-generator">
            <Route className="size-4" />
            Generate Roadmap
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Quick actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">Open a focused AI workflow in one click.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Card className="group grid h-full gap-4" interactive key={action.href}>
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <action.icon className="size-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{action.label}</CardTitle>
                <CardDescription className="mt-2">{action.description}</CardDescription>
              </div>
              <Button asChild href={action.href} variant="outline">
                Open
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Learning progress</CardTitle>
            <CardDescription>Weekly momentum and upcoming milestones.</CardDescription>
          </CardHeader>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-card bg-muted/70 p-5">
              <div className="flex items-center justify-between">
                <p className="font-bold">Weekly learning</p>
                <span className="text-sm font-bold text-primary">7.5h / 10h</span>
              </div>
              <div className="mt-4 h-3 rounded-full bg-surface">
                <div className="h-3 w-[75%] rounded-full bg-primary" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Keep the current pace to finish this week’s roadmap phase.</p>
            </div>
            <div className="rounded-card border border-border p-5">
              <p className="font-bold">Upcoming milestones</p>
              <div className="mt-4 grid gap-3">
                {["Finish TypeScript module", "Build API integration project", "Review roadmap with AI"].map((item) => (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground" key={item}>
                    <CheckCircle2 className="size-4 text-success" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested next action</CardTitle>
            <CardDescription>Based on current dashboard activity.</CardDescription>
          </CardHeader>
          <div className="rounded-card bg-primary p-5 text-primary-foreground">
            <CalendarClock className="size-8" />
            <h3 className="mt-4 text-xl font-bold">Analyze your skill gap before choosing the next project.</h3>
            <p className="mt-3 text-sm leading-6 opacity-90">
              This gives the project recommender better context and helps prioritize the right stack.
            </p>
            <Button asChild className="mt-5" href="/skill-gap-analyzer" variant="secondary">
              Analyze now
            </Button>
          </div>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Recent AI generations and learning events.</CardDescription>
          </CardHeader>
          <EmptyState className="border-0 bg-muted/50 shadow-none" title="No recent generations" description="Your generated roadmaps, analyses, and project ideas will appear here." />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Workspace health</CardTitle>
            <CardDescription>High-level snapshot of your learning system.</CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {[
              ["Roadmap structure", "Strong", "92%"],
              ["Skill clarity", "Improving", "68%"],
              ["Project readiness", "Ready", "76%"],
            ].map(([label, status, value]) => (
              <div className="rounded-card border border-border p-4" key={label}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{label}</span>
                  <span className="text-primary">{status}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-secondary" style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
