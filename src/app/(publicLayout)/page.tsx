import {
  BarChart3,
  BookOpen,
  Bot,
  CheckCircle2,
  GraduationCap,
  Layers,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/courses/course-card";
import { HeroActions } from "@/components/home/hero-actions";
import { Button } from "@/components/ui/button";
import { CardSkeleton } from "@/components/ui/skeletons";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusMessage } from "@/components/ui/status";
import { publicApi, type Blog, type Category } from "@/lib/api/skillsync";

async function loadHomeData() {
  const [courses, categories, blogs] = await Promise.allSettled([
    publicApi.featuredCourses(),
    publicApi.categories(),
    publicApi.blogs(),
  ]);

  return {
    courses: courses.status === "fulfilled" ? courses.value.data : [],
    categories: categories.status === "fulfilled" ? categories.value.data : [],
    blogs: blogs.status === "fulfilled" ? blogs.value.data : [],
    hasError: [courses, categories, blogs].some((result) => result.status === "rejected"),
  };
}

const featureCards = [
  {
    title: "Structured LMS",
    description: "Courses, modules, lessons, assignments, submissions, and reviews work as one learning system.",
    icon: Layers,
  },
  {
    title: "AI Learning Tools",
    description: "Roadmaps, study chat, skill-gap analysis, project recommendations, and assignment feedback.",
    icon: Bot,
  },
  {
    title: "Role-Based Dashboards",
    description: "Separate student, instructor, and admin workspaces keep each workflow focused.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    question: "Can students enroll and track progress?",
    answer: "Yes. The backend supports enrollments, lesson completion, progress calculation, and my-classes views.",
  },
  {
    question: "Can instructors review submissions?",
    answer: "Yes. Instructors can manage own course assignments and review pending student submissions.",
  },
  {
    question: "Does the AI return fake content when keys are missing?",
    answer: "No. AI routes return a clear configuration error when OpenAI or Gemini is not configured.",
  },
];

export default async function HomePage() {
  const { courses, categories, blogs, hasError } = await loadHomeData();
  const publishedCourses = courses.slice(0, 4);
  const totalLessons = courses.reduce((sum, course) => sum + course.totalLessons, 0);
  const totalEnrollments = courses.reduce((sum, course) => sum + course.totalEnrollments, 0);
  const averageRating =
    courses.length > 0
      ? (courses.reduce((sum, course) => sum + course.averageRating, 0) / courses.length).toFixed(1)
      : "0.0";

  return (
    <main>
      <section className="bg-surface">
        <div className="container-shell grid min-h-[66vh] items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-sm font-semibold text-primary">
              AI-powered learning management platform
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              SkillSync AI turns learning into a measurable workflow.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Discover courses, complete lessons, submit assignments, receive instructor
              reviews, manage support, and use AI tools for practical career growth.
            </p>
            <div className="mt-8">
              <HeroActions />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Platform overview</p>
                  <p className="mt-1 text-3xl font-bold">{courses.length}</p>
                </div>
                <BookOpen className="size-10 text-primary" />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <Metric label="Lessons" value={totalLessons} />
                <Metric label="Enrollments" value={totalEnrollments} />
                <Metric label="Rating" value={averageRating} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <WorkflowCard icon={GraduationCap} label="Student" text="Learn, submit, review progress" />
              <WorkflowCard icon={MessageSquareText} label="Instructor" text="Manage courses and reviews" />
              <WorkflowCard icon={BarChart3} label="Admin" text="Monitor analytics and users" />
              <WorkflowCard icon={Sparkles} label="AI" text="Generate guidance and feedback" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <SectionHeading
          eyebrow="Core systems"
          title="Everything needed for a serious learning platform"
          description="The product experience is designed around real student, instructor, and admin workflows."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featureCards.map((feature) => (
            <article className="card p-6" key={feature.title}>
              <feature.icon className="size-9 text-primary" />
              <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Featured courses"
            title="Courses built for measurable progress"
            description="Courses include practical modules, lessons, assignments, reviews, and progress tracking."
          />
          {hasError ? (
            <div className="mt-6">
              <StatusMessage
                message="Start the backend API and seed the database to load live courses."
                title="Course data is unavailable"
                tone="danger"
              />
            </div>
          ) : null}
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {publishedCourses.length > 0
              ? publishedCourses.map((course) => <CourseCard course={course} key={course.id} />)
              : Array.from({ length: 4 }).map((_, index) => <CardSkeleton key={index} />)}
          </div>
          <div className="mt-8">
            <Button asChild href="/courses" variant="outline">
              View all courses
            </Button>
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <SectionHeading
          eyebrow="Categories"
          title="Explore by learning path"
          description="Categories come from the backend catalog and help learners find a focused path."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category: Category) => (
            <Link className="card flex items-center gap-4 p-5 transition hover:-translate-y-1" href={`/courses?categoryId=${category.id}`} key={category.id}>
              <span className="flex size-12 items-center justify-center rounded-card bg-muted text-primary">
                <BookOpen className="size-5" />
              </span>
              <span>
                <strong className="block">{category.name}</strong>
                <span className="text-sm text-muted-foreground">{category.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-4">
          <StatCard icon={BookOpen} label="Published courses" value={courses.length} />
          <StatCard icon={CheckCircle2} label="Course lessons" value={totalLessons} />
          <StatCard icon={Users} label="Enrollments" value={totalEnrollments} />
          <StatCard icon={Star} label="Average rating" value={averageRating} />
        </div>
      </section>

      <section className="container-shell py-16">
        <SectionHeading
          eyebrow="Operational quality"
          title="Designed around professional workflows"
          description="The frontend maps to the backend's advanced engineering concepts instead of being a static marketing shell."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {[
            "Service-layer ownership boundaries",
            "Transactional learning operations",
            "AI audit logging and admin review",
            "Role-based dashboards",
            "Course progress analytics",
            "Support ticket lifecycle",
          ].map((item) => (
            <div className="card flex items-center gap-3 p-5" key={item}>
              <CheckCircle2 className="size-5 text-success" />
              <span className="font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Latest blogs"
            title="Learning guidance from the platform"
            description="Blog content is loaded from the backend and supports the learning experience."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {blogs.slice(0, 3).map((blog: Blog) => (
              <Link className="card flex min-h-64 flex-col p-6 transition hover:-translate-y-1" href={`/blogs/${blog.slug}`} key={blog.id}>
                <p className="text-sm font-semibold text-primary">{new Date(blog.createdAt).toLocaleDateString()}</p>
                <h3 className="mt-3 text-xl font-bold">{blog.title}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">{blog.excerpt}</p>
                <span className="mt-auto pt-5 text-sm font-bold text-secondary">Read article</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <SectionHeading eyebrow="FAQ" title="Questions teams ask before implementation" />
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article className="card p-5" key={faq.question}>
              <h3 className="font-bold">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-16">
        <div className="card grid gap-6 bg-primary p-8 text-primary-foreground md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Start with real course data and role workflows.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 opacity-90">
              Use the backend seed command, log in with demo credentials, and test the student,
              instructor, and admin experiences end to end.
            </p>
          </div>
          <Button asChild href="/login" variant="secondary">
            Login to dashboard
          </Button>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-card bg-muted p-3">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function WorkflowCard({
  icon: Icon,
  label,
  text,
}: {
  icon: typeof BookOpen;
  label: string;
  text: string;
}) {
  return (
    <div className="card p-5">
      <Icon className="size-7 text-primary" />
      <p className="mt-3 font-bold">{label}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number | string;
}) {
  return (
    <div className="card p-6">
      <Icon className="size-8 text-primary" />
      <p className="mt-5 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
