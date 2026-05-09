import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  FolderClock,
  MessageSquareText,
  Route,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    icon: Route,
    title: "AI Roadmap Generator",
    description: "Create a role-specific learning path with phases, skills, projects, and timelines.",
  },
  {
    icon: Target,
    title: "Skill Gap Analyzer",
    description: "Compare your current skills against your target role and prioritize the next step.",
  },
  {
    icon: WandSparkles,
    title: "Project Recommender",
    description: "Get portfolio project ideas matched to your stack, skill level, and available time.",
  },
  {
    icon: Bot,
    title: "AI Chat Assistant",
    description: "Ask for study guidance, concept explanations, roadmap review, and project advice.",
  },
  {
    icon: FolderClock,
    title: "Saved Learning History",
    description: "Keep generated roadmaps and recommendations organized for continuous progress.",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description: "Track AI activity, learning progress, quick actions, and suggested next moves.",
  },
];

const steps = [
  "Enter your goal",
  "Analyze your skills",
  "Get AI roadmap",
  "Build projects and track progress",
];

const tools = [
  { icon: Route, title: "Roadmap Generator", href: "/roadmap-generator" },
  { icon: Target, title: "Skill Gap Analyzer", href: "/skill-gap-analyzer" },
  { icon: WandSparkles, title: "Project Recommender", href: "/project-recommender" },
  { icon: MessageSquareText, title: "AI Assistant", href: "/ai-chat" },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative">
        <div className="container-shell grid min-h-[68vh] items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
              <Sparkles className="size-4" />
              AI-powered career learning workspace
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Build your AI-powered learning path with SkillSync AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Generate personalized roadmaps, analyze skill gaps, get project ideas, and learn faster with an AI career assistant.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild href="/register" size="lg">
                Start Learning
                <ArrowRight className="size-4" />
              </Button>
              <Button asChild href="/ai-chat" size="lg" variant="outline">
                View AI Tools
              </Button>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              <HeroMetric label="AI tools" value="4" />
              <HeroMetric label="Workflows" value="8+" />
              <HeroMetric label="Ready" value="24/7" />
            </div>
          </div>

          <DashboardPreview />
        </div>
      </section>

      <section id="features" className="container-shell py-16">
        <SectionHeading
          align="center"
          eyebrow="Features"
          title="Everything a focused learner needs"
          description="SkillSync AI turns career uncertainty into a clean workflow: plan, analyze, build, ask, save, and improve."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-surface/60 py-16">
        <div className="container-shell">
          <SectionHeading
            eyebrow="How it works"
            title="From goal to execution in four steps"
            description="A premium workflow for learners who want direction, feedback, and practical project momentum."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div className="card relative p-5" key={step}>
                <span className="grid size-10 place-items-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {index === 0 && "Set a role, skill target, timeline, or project direction."}
                  {index === 1 && "Share your current skills and preferred technologies."}
                  {index === 2 && "Receive structured phases, priorities, and recommendations."}
                  {index === 3 && "Use projects and chat support to keep moving forward."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-tools" className="container-shell py-16">
        <SectionHeading
          align="center"
          eyebrow="AI tools"
          title="Purpose-built AI workflows"
          description="Each tool is designed for a specific learner decision, with clear inputs and useful results."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <a className="card group p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft" href={tool.href} key={tool.title}>
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <tool.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-bold">{tool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Open a focused workspace with form guidance, loading states, and polished AI output.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Open tool <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="pricing" className="bg-surface/60 py-16">
        <div className="container-shell">
          <div className="grid gap-6 rounded-[24px] border border-border bg-card p-8 shadow-card lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Pricing</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Contest demo access is ready</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                The current frontend is optimized for demo and evaluation. Pricing tiers can be connected when subscription endpoints are available.
              </p>
            </div>
            <Button asChild href="/register" size="lg">
              Start free
            </Button>
          </div>
        </div>
      </section>

      <section className="container-shell pb-16">
        <div className="glass-panel overflow-hidden rounded-[24px] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Start now</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Ready to build your personalized learning path?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                Create your account, open the dashboard, and use the AI workflows to turn your goals into a practical plan.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild href="/register" size="lg">
                Get Started
              </Button>
              <Button asChild href="/login" size="lg" variant="outline">
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-border bg-surface/70 p-3 shadow-sm">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="glass-panel rounded-[28px] p-4 md:p-5">
      <div className="rounded-[22px] border border-border bg-card p-4 shadow-card">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="text-sm font-bold">SkillSync Dashboard</p>
            <p className="text-xs text-muted-foreground">AI learning progress</p>
          </div>
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-danger" />
            <span className="size-2.5 rounded-full bg-warning" />
            <span className="size-2.5 rounded-full bg-success" />
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_0.8fr]">
          <div className="rounded-card bg-muted/70 p-4">
            <div className="flex items-center justify-between">
              <p className="font-bold">Roadmap progress</p>
              <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-bold text-success">64%</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-surface">
              <div className="h-2 w-[64%] rounded-full bg-primary" />
            </div>
            <div className="mt-4 grid gap-2">
              {["React architecture", "API integration", "Portfolio project"].map((item) => (
                <div className="flex items-center gap-2 text-sm" key={item}>
                  <CheckCircle2 className="size-4 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-card border border-border p-4">
            <p className="font-bold">Skill gap</p>
            <div className="mt-4 grid gap-3">
              <PreviewBar label="TypeScript" value="82%" width="82%" />
              <PreviewBar label="System design" value="48%" width="48%" />
              <PreviewBar label="Testing" value="58%" width="58%" />
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-card border border-border p-4">
            <div className="flex items-center gap-3">
              <BrainCircuit className="size-5 text-primary" />
              <p className="font-bold">AI recommendation</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Build a Next.js analytics dashboard with role-based views and API caching.
            </p>
          </div>
          <div className="rounded-card bg-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <Bot className="size-5" />
              <p className="font-bold">Mini chat</p>
            </div>
            <p className="mt-3 text-sm leading-6 opacity-90">
              “Create a 6-week plan for full-stack interview prep.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewBar({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-semibold">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-muted">
        <div className="h-2 rounded-full bg-secondary" style={{ width }} />
      </div>
    </div>
  );
}
