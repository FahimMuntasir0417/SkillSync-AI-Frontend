import { ArrowLeft, BookOpen, CheckCircle2, Clock, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnrollCourseButton } from "@/components/courses/enroll-course-button";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { publicApi } from "@/lib/api/skillsync";

type CourseDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const { slug } = await params;
  const [courseResult, relatedResult] = await Promise.allSettled([
    publicApi.courseBySlug(slug),
    publicApi.featuredCourses(),
  ]);

  if (courseResult.status === "rejected") {
    notFound();
  }

  const course = courseResult.value.data;
  const related =
    relatedResult.status === "fulfilled"
      ? relatedResult.value.data.filter((item) => item.id !== course.id).slice(0, 4)
      : [];

  return (
    <main>
      <section className="bg-surface">
        <div className="container-shell grid gap-8 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground" href="/courses">
              <ArrowLeft className="size-4" />
              Back to courses
            </Link>
            <p className="mt-6 text-sm font-bold uppercase text-primary">{course.category?.name}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{course.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{course.shortDescription}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              <Info icon={Clock} label={`${course.durationInHours} hours`} />
              <Info icon={BookOpen} label={`${course.totalLessons} lessons`} />
              <Info icon={Star} label={`${course.averageRating || 0} rating`} />
              <Info icon={Users} label={`${course.totalEnrollments} enrolled`} />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <EnrollCourseButton courseId={course.id} />
              <Button asChild href="/support" size="lg" variant="outline">
                Ask support
              </Button>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image alt={course.title} className="object-cover" fill priority src={course.thumbnail} />
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-14 lg:grid-cols-[1fr_360px]">
        <article className="space-y-10">
          <div>
            <SectionHeading title="Overview" />
            <p className="mt-5 text-base leading-8 text-muted-foreground">{course.description}</p>
          </div>

          <div>
            <SectionHeading title="Course modules" />
            <div className="mt-6 grid gap-4">
              {course.modules?.map((module) => (
                <div className="card p-5" key={module.id}>
                  <h3 className="text-xl font-bold">{module.order}. {module.title}</h3>
                  {module.description ? <p className="mt-2 text-sm text-muted-foreground">{module.description}</p> : null}
                  <div className="mt-4 grid gap-2">
                    {module.lessons.map((lesson) => (
                      <div className="flex items-center gap-3 rounded-card bg-muted p-3" key={lesson.id}>
                        <CheckCircle2 className="size-5 text-success" />
                        <span className="text-sm font-semibold">{lesson.title}</span>
                        {lesson.isPreview ? <span className="ml-auto rounded-full bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">Preview</span> : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading title="Reviews and ratings" />
            <div className="mt-6 grid gap-4">
              {course.reviews && course.reviews.length > 0 ? (
                course.reviews.map((review) => (
                  <article className="card p-5" key={review.id}>
                    <div className="flex items-center justify-between">
                      <strong>{review.user.name}</strong>
                      <span className="flex items-center gap-1 text-sm font-bold text-accent">
                        <Star className="size-4" />
                        {review.rating}
                      </span>
                    </div>
                    {review.comment ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{review.comment}</p> : null}
                  </article>
                ))
              ) : (
                <div className="card p-5 text-sm text-muted-foreground">No reviews have been submitted for this course yet.</div>
              )}
            </div>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="card p-6">
            <p className="text-sm text-muted-foreground">Course price</p>
            <p className="mt-2 text-4xl font-bold">${course.price}</p>
            <div className="mt-5 grid gap-3 text-sm">
              <Spec label="Level" value={course.level} />
              <Spec label="Instructor" value={course.instructor?.name ?? "SkillSync Instructor"} />
              <Spec label="Status" value={course.status} />
              <Spec label="Category" value={course.category?.name ?? "Course"} />
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 ? (
        <section className="bg-surface py-14">
          <div className="container-shell">
            <SectionHeading title="Related courses" />
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => <CourseCard course={item} key={item.id} />)}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function Info({ icon: Icon, label }: { icon: typeof Clock; label: string }) {
  return (
    <div className="rounded-card bg-muted p-3 text-sm font-semibold">
      <Icon className="mb-2 size-5 text-primary" />
      {label}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
