"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, ExternalLink, ListChecks, PlayCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { StatusMessage } from "@/components/ui/status";
import { courseApi, enrollmentApi, lessonApi, type Course } from "@/lib/api/skillsync";
import { getApiErrorMessage } from "@/lib/api-error";

type CourseLesson = NonNullable<Course["modules"]>[number]["lessons"][number] & {
  moduleTitle: string;
};

const flattenLessons = (course?: Course): CourseLesson[] =>
  course?.modules?.flatMap((moduleItem) =>
    moduleItem.lessons.map((lesson) => ({
      ...lesson,
      moduleTitle: moduleItem.title,
    })),
  ) ?? [];

export default function LearnPage() {
  const params = useParams<{ enrollmentId: string }>();
  const enrollmentId = params.enrollmentId;
  const queryClient = useQueryClient();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const enrollmentQuery = useQuery({
    queryKey: ["learning-enrollment", enrollmentId],
    queryFn: async () => (await enrollmentApi.byId(enrollmentId)).data,
  });

  const courseSlug = enrollmentQuery.data?.course?.slug;

  const courseQuery = useQuery({
    enabled: Boolean(courseSlug),
    queryKey: ["learning-course", courseSlug],
    queryFn: async () => (await courseApi.bySlug(courseSlug ?? "")).data,
  });

  const lessons = useMemo(() => flattenLessons(courseQuery.data), [courseQuery.data]);
  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessons[0];
  const selectedIndex = selectedLesson ? lessons.findIndex((lesson) => lesson.id === selectedLesson.id) : -1;
  const previousLesson = selectedIndex > 0 ? lessons[selectedIndex - 1] : undefined;
  const nextLesson = selectedIndex >= 0 && selectedIndex < lessons.length - 1 ? lessons[selectedIndex + 1] : undefined;

  const completeMutation = useMutation({
    mutationFn: async (lessonId: string) => (await lessonApi.complete(lessonId)).data,
    onSuccess: async (result) => {
      toast.success(`Lesson completed. Course progress is now ${result.courseProgress}%.`);
      await queryClient.invalidateQueries({ queryKey: ["learning-enrollment", enrollmentId] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const isLoading = enrollmentQuery.isFetching || courseQuery.isFetching;
  const error = enrollmentQuery.error ?? courseQuery.error;

  return (
    <main className="grid gap-6 p-4 md:p-8">
      <PageHeader
        eyebrow="Student classroom"
        title={courseQuery.data?.title ?? enrollmentQuery.data?.course?.title ?? "Learning workspace"}
        description="Watch lessons, read resources, complete lessons, and keep your course progress moving."
        actions={
          <Button asChild href="/my-classes" variant="outline">
            <ArrowLeft className="size-4" />
            My classes
          </Button>
        }
      />

      {error ? <ErrorState title="Learning data unavailable" description={getApiErrorMessage(error)} /> : null}

      {isLoading ? (
        <Card className="grid gap-4">
          <div className="h-5 w-48 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </Card>
      ) : null}

      {!isLoading && !error && courseQuery.data ? (
        <>
          <section className="grid gap-4 lg:grid-cols-4">
            <MetricCard icon={BookOpen} label="Lessons" value={courseQuery.data.totalLessons} />
            <MetricCard icon={ListChecks} label="Modules" value={courseQuery.data.modules?.length ?? 0} />
            <MetricCard icon={Clock} label="Duration" value={`${courseQuery.data.durationInHours}h`} />
            <MetricCard icon={CheckCircle2} label="Progress" value={`${enrollmentQuery.data?.progress ?? 0}%`} />
          </section>

          <Card>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Course progress</CardTitle>
                <CardDescription>Completing lessons updates your enrollment progress automatically.</CardDescription>
              </div>
              <span className="text-sm font-bold text-primary">{enrollmentQuery.data?.progress ?? 0}% complete</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${enrollmentQuery.data?.progress ?? 0}%` }} />
            </div>
          </Card>

          {lessons.length ? (
            <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
              <Card className="self-start p-0">
                <CardHeader>
                  <CardTitle>Lessons</CardTitle>
                  <CardDescription>Select a lesson to continue learning.</CardDescription>
                </CardHeader>
                <div className="grid max-h-[680px] gap-2 overflow-y-auto p-4 pt-0">
                  {lessons.map((lesson, index) => (
                    <button
                      className={`focus-ring rounded-card border p-3 text-left transition ${
                        selectedLesson?.id === lesson.id
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-surface hover:bg-muted"
                      }`}
                      key={lesson.id}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      type="button"
                    >
                      <span className="text-xs font-semibold uppercase text-muted-foreground">{lesson.moduleTitle}</span>
                      <span className="mt-1 flex items-start gap-2 font-semibold">
                        <span className="text-primary">{index + 1}.</span>
                        {lesson.title}
                      </span>
                      {lesson.isPreview ? <span className="mt-2 inline-flex text-xs font-bold text-primary">Preview lesson</span> : null}
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="grid gap-5">
                {selectedLesson ? (
                  <>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">{selectedLesson.moduleTitle}</p>
                      <h2 className="mt-2 text-2xl font-bold">{selectedLesson.title}</h2>
                    </div>

                    {selectedLesson.videoUrl ? (
                      <div className="overflow-hidden rounded-card border border-border bg-black">
                        <iframe
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="aspect-video w-full"
                          src={selectedLesson.videoUrl}
                          title={selectedLesson.title}
                        />
                      </div>
                    ) : (
                      <div className="grid min-h-56 place-items-center rounded-card border border-border bg-muted text-center">
                        <div>
                          <PlayCircle className="mx-auto size-10 text-primary" />
                          <p className="mt-3 text-sm font-semibold text-muted-foreground">No lesson video attached</p>
                        </div>
                      </div>
                    )}

                    <div className="prose prose-sm max-w-none rounded-card border border-border bg-surface p-4 text-foreground">
                      <p className="whitespace-pre-line leading-7">{selectedLesson.content}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedLesson.resourceUrl ? (
                        <Button asChild href={selectedLesson.resourceUrl} rel="noreferrer" target="_blank" variant="outline">
                          <ExternalLink className="size-4" />
                          Resource
                        </Button>
                      ) : null}
                      <Button disabled={completeMutation.isPending} onClick={() => completeMutation.mutate(selectedLesson.id)}>
                        <CheckCircle2 className="size-4" />
                        Mark complete
                      </Button>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        disabled={!previousLesson}
                        onClick={() => previousLesson && setSelectedLessonId(previousLesson.id)}
                        variant="outline"
                      >
                        <ArrowLeft className="size-4" />
                        Previous
                      </Button>
                      <Button disabled={!nextLesson} onClick={() => nextLesson && setSelectedLessonId(nextLesson.id)}>
                        Next
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <EmptyState title="No lesson selected" description="Choose a lesson from the course outline." />
                )}
              </Card>
            </section>
          ) : (
            <EmptyState title="No lessons available" description="This course does not have lessons published yet." />
          )}

          <StatusMessage
            title="Next step"
            message="After finishing lessons, open assignments from the dashboard and submit your work for instructor feedback."
          />
        </>
      ) : null}
    </main>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: typeof BookOpen; label: string; value: number | string }) {
  return (
    <Card className="p-5">
      <Icon className="size-6 text-primary" />
      <p className="mt-4 text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </Card>
  );
}

