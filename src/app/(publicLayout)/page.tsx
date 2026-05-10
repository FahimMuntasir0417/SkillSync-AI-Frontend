import {
  ArrowRight,
  BarChart3,
  Bot,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  FolderClock,
  HelpCircle,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WandSparkles,
} from "lucide-react";
import Image from "next/image";
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

const successStories = [
  {
    name: "Frontend learner",
    outcome: "Built a role-based dashboard project after following a generated roadmap.",
    metric: "6 weeks",
  },
  {
    name: "Backend learner",
    outcome: "Used assignment feedback and course progress tracking to improve API project quality.",
    metric: "82% progress",
  },
  {
    name: "Career switcher",
    outcome: "Compared current skills against full-stack roles and prioritized portfolio-ready projects.",
    metric: "4 projects",
  },
];

const learningGoals = [
  "Choose a target role and generate a structured learning path.",
  "Enroll in relevant courses and track class progress from the dashboard.",
  "Submit assignments, receive instructor feedback, and improve project quality.",
  "Use AI tools to summarize courses, analyze gaps, and plan portfolio projects.",
];

const testimonials = [
  {
    name: "Nafisa Rahman",
    role: "Frontend learner",
    quote: "The roadmap and skill-gap tools helped me decide what to build next instead of jumping between random tutorials.",
  },
  {
    name: "Arif Hasan",
    role: "Backend learner",
    quote: "Course progress, assignments, and AI feedback made the backend learning path feel connected and measurable.",
  },
  {
    name: "Mahi Chowdhury",
    role: "Full-stack learner",
    quote: "I used the project recommender to turn my stack into portfolio ideas that matched real dashboard and API work.",
  },
];

const platformStats = [
  { label: "AI learning tools", value: "8", detail: "Roadmaps, skill gaps, project ideas, chat, summaries, and feedback" },
  { label: "Role dashboards", value: "3", detail: "Student, instructor, and admin workspaces" },
  { label: "Core modules", value: "12+", detail: "Courses, lessons, enrollments, assignments, reviews, support, blogs, and AI logs" },
  { label: "Tracked workflows", value: "24/7", detail: "Progress, notifications, support replies, and AI history" },
];

const featuredCourses = [
  {
    title: "Full-Stack Foundations",
    category: "Web Development",
    level: "Beginner",
    lessons: "28 lessons",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "API Engineering with Prisma",
    category: "Backend",
    level: "Intermediate",
    lessons: "34 lessons",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "AI Integration for Web Apps",
    category: "AI Engineering",
    level: "Advanced",
    lessons: "24 lessons",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  {
    title: "Frontend Development",
    slug: "frontend-development",
    description: "React, Next.js, UI systems, and client-side architecture.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Backend Development",
    slug: "backend-development",
    description: "Express, Prisma, PostgreSQL, authentication, and API design.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Full Stack Development",
    slug: "full-stack-development",
    description: "End-to-end product builds with frontend, backend, database, and deployment.",
    icon: Route,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "AI Engineering",
    slug: "ai-engineering",
    description: "Gemini/OpenAI workflows, structured outputs, and AI logs.",
    icon: BrainCircuit,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Database",
    slug: "database",
    description: "Relational modeling, Prisma migrations, indexes, and query design.",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "DevOps",
    slug: "devops",
    description: "Deployment, environment configuration, logs, uptime, and release workflows.",
    icon: LayoutDashboard,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=900&q=80",
  },
];

const instructors = [
  {
    name: "SkillSync Instructor",
    focus: "Full-stack project review",
    bio: "Guides learners through dashboard, API, assignment, and deployment workflows.",
  },
  {
    name: "Backend Mentor",
    focus: "Prisma and API architecture",
    bio: "Reviews schemas, ownership checks, validation, and production-ready backend patterns.",
  },
  {
    name: "AI Learning Coach",
    focus: "Roadmaps and project planning",
    bio: "Helps students connect AI recommendations to practical weekly learning actions.",
  },
];

const faqs = [
  {
    question: "Does SkillSync AI use real AI responses?",
    answer: "Yes. AI routes call the configured Gemini provider and return structured results. If no provider key is configured, the backend returns a clear service error instead of mock content.",
  },
  {
    question: "Can instructors manage their own courses?",
    answer: "Yes. Instructors can manage courses, modules, lessons, assignments, submissions, blogs, and reviews within role-based permissions.",
  },
  {
    question: "What can students track?",
    answer: "Students can track enrollments, class progress, assignments, submissions, course reviews, support tickets, notifications, and saved AI learning outputs.",
  },
  {
    question: "How does admin approval work?",
    answer: "Students can submit an instructor promotion request. Admins review the request and approving it promotes the user to instructor role.",
  },
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

      <section id="success" className="bg-surface/60 py-16">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Success"
            title="Practical outcomes learners can show"
            description="SkillSync AI focuses on measurable progress: completed lessons, reviewed assignments, stronger portfolios, and clearer next steps."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {successStories.map((story) => (
              <div className="card p-6" key={story.name}>
                <span className="inline-flex rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success ring-1 ring-success/20">
                  {story.metric}
                </span>
                <h3 className="mt-5 text-lg font-bold">{story.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {story.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="goals" className="container-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Goal planning"
              title="Turn career goals into dashboard actions"
              description="The platform connects AI planning with real learning workflows, so a goal can become courses, assignments, submissions, reviews, and tracked progress."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild href="/roadmap-generator" size="lg">
                Create roadmap
              </Button>
              <Button asChild href="/courses" size="lg" variant="outline">
                Browse courses
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {learningGoals.map((goal, index) => (
              <div className="flex gap-4 rounded-card border border-border bg-card p-5 shadow-sm" key={goal}>
                <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-primary/10 text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-6 text-foreground">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-surface/60 py-16">
        <div className="container-shell">
          <SectionHeading
            align="center"
            eyebrow="Testimonials"
            title="Learner outcomes from connected workflows"
            description="The platform is designed around practical learning evidence: progress, submissions, feedback, and portfolio-ready decisions."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <div className="card p-6" key={item.name}>
                <p className="text-sm leading-7 text-muted-foreground">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm font-semibold text-primary">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="statistics" className="container-shell py-16">
        <SectionHeading
          eyebrow="Platform statistics"
          title="Built around the real LMS workflow"
          description="SkillSync AI combines learning management, role-based operations, support, notifications, and AI observability in one system."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((stat) => (
            <div className="rounded-card border border-border bg-card p-6 shadow-sm" key={stat.label}>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <h3 className="mt-3 font-bold">{stat.label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="featured-courses" className="bg-surface/60 py-16">
        <div className="container-shell">
          <SectionHeading
            align="center"
            eyebrow="Featured courses"
            title="Start with courses that match the roadmap"
            description="Course cards connect directly to details, enrollments, reviews, lessons, assignments, and progress tracking."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredCourses.map((course) => (
              <article className="card group overflow-hidden p-0" key={course.title}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    alt={course.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    src={course.image}
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{course.category}</p>
                  <h3 className="mt-3 text-lg font-bold">{course.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-muted-foreground">
                    <span className="rounded-full bg-muted px-2.5 py-1">{course.level}</span>
                    <span className="rounded-full bg-muted px-2.5 py-1">{course.lessons}</span>
                  </div>
                  <Button asChild className="mt-5" href="/courses" variant="outline">
                    View courses
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="container-shell py-16">
        <SectionHeading
          align="center"
          eyebrow="Categories"
          title="Learning paths for modern product builders"
          description="Every category maps to SkillSync workflows: course discovery, assignments, reviews, AI planning, and support."
        />
        <div className="mt-10 overflow-x-auto pb-4 [scrollbar-width:thin]">
          <div className="flex snap-x gap-5">
            {categories.map((category) => (
              <a
                className="card group min-w-[280px] snap-start overflow-hidden p-0 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft sm:min-w-[320px] lg:min-w-[360px]"
                href={`/courses?category=${category.slug}`}
                key={category.title}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    alt={category.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="360px"
                    src={category.image}
                  />
                  <div className="absolute left-4 top-4 grid size-11 place-items-center rounded-2xl bg-background/88 text-primary backdrop-blur">
                    <category.icon className="size-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold">{category.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Go to courses <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <details className="group mt-2 rounded-card border border-border bg-card p-4 shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-primary">
            <span>Show all category links</span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs group-open:hidden">Open</span>
            <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs group-open:inline-flex">Close</span>
          </summary>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <a
                className="rounded-card border border-border bg-surface/70 p-4 transition hover:border-primary/40 hover:bg-primary/5"
                href={`/courses?category=${category.slug}`}
                key={`all-${category.title}`}
              >
                <div className="flex items-center gap-3">
                  <category.icon className="size-5 shrink-0 text-primary" />
                  <h3 className="font-bold">{category.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
              </a>
            ))}
          </div>
        </details>
      </section>

      <section id="interactive-dashboard" className="bg-surface/60 py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Interactive dashboard"
              title="Hover through the workspace learners use daily"
              description="The dashboard brings profile data, notifications, enrollments, submissions, support, AI tools, and role-specific actions into one responsive workspace."
            />
            <Button asChild className="mt-8" href="/dashboard" size="lg">
              Open dashboard
            </Button>
          </div>
          <div className="group relative overflow-hidden rounded-[28px] border border-border bg-card shadow-card">
            <Image
              alt="Student dashboard workspace"
              className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105 group-hover:saturate-125"
              height={720}
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
              width={1200}
            />
            <div className="absolute inset-x-4 bottom-4 rounded-card bg-background/88 p-4 backdrop-blur">
              <p className="font-bold">Live learning operations</p>
              <p className="mt-1 text-sm text-muted-foreground">Progress, support, notifications, and AI actions stay connected.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="instructors" className="container-shell py-16">
        <SectionHeading
          align="center"
          eyebrow="Instructor highlights"
          title="Built for guided project feedback"
          description="Instructor workflows focus on course ownership, assignments, submissions, reviews, lessons, and student progress."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {instructors.map((instructor) => (
            <div className="card p-6" key={instructor.name}>
              <div className="grid size-12 place-items-center rounded-full bg-secondary/10 text-secondary">
                <Users className="size-6" />
              </div>
              <h3 className="mt-5 font-bold">{instructor.name}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{instructor.focus}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{instructor.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="support-preview" className="bg-surface/60 py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Support and helpdesk"
              title="Learners can ask for help without leaving the platform"
              description="Support tickets connect students with admins, keep replies organized, and create notifications when admins respond."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild href="/support" size="lg">
                Contact support
              </Button>
              <Button asChild href="/help" size="lg" variant="outline">
                Read helpdesk
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            {["Enrollment course not visible", "Assignment submission review", "AI roadmap guidance"].map((ticket, index) => (
              <div className="flex items-start gap-4 rounded-card border border-border bg-card p-5 shadow-sm" key={ticket}>
                <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold">{ticket}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {index === 0 && "Admin can verify enrollment and reply with a notification."}
                    {index === 1 && "Instructor feedback and submission status keep learners moving."}
                    {index === 2 && "AI plans can be clarified through chat or support workflows."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-workflow-image" className="container-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="group relative order-2 overflow-hidden rounded-[28px] border border-border bg-card shadow-card lg:order-1">
            <Image
              alt="AI workflow planning board"
              className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
              height={720}
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
              width={1200}
            />
            <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              AI + LMS workflow
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Interactive AI planning"
              title="From prompt to project-ready action"
              description="AI outputs are not isolated text. They connect to course discovery, class progress, submissions, review loops, and saved learning history."
            />
            <div className="mt-6 grid gap-3">
              {["Structured JSON AI responses", "Saved roadmap and skill history", "Admin AI logs for observability"].map((item) => (
                <div className="flex items-center gap-3 text-sm font-semibold" key={item}>
                  <CheckCircle2 className="size-5 text-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-surface/60 py-16">
        <div className="container-shell max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Common questions before starting"
            description="Clear answers about AI, roles, dashboards, and instructor promotion workflows."
          />
          <div className="mt-10 grid gap-3">
            {faqs.map((faq) => (
              <details className="rounded-card border border-border bg-card p-5 shadow-sm" key={faq.question}>
                <summary className="cursor-pointer text-sm font-bold text-foreground">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className="container-shell py-16">
        <div className="grid gap-6 rounded-[24px] border border-border bg-card p-8 shadow-card lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-primary" />
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Newsletter</p>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Get project and roadmap updates</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Join SkillSync AI to receive practical course, assignment, and AI workflow updates inside your dashboard.
            </p>
          </div>
          <form action="/register" className="flex w-full flex-col gap-3 sm:w-[360px] sm:flex-row">
            <input
              className="focus-ring h-12 min-w-0 flex-1 rounded-card border border-border bg-surface/80 px-4 text-sm"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
            <Button type="submit">Join</Button>
          </form>
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
