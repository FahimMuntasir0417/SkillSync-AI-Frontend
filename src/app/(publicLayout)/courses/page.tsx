import { CourseExplorer } from "@/components/courses/course-explorer";
import { SectionHeading } from "@/components/ui/section-heading";
import { publicApi } from "@/lib/api/skillsync";

type CoursesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams?.category;
  const initialCategory = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam;
  const [coursesResult, categoriesResult] = await Promise.allSettled([
    publicApi.courses({ limit: 100 }),
    publicApi.categories(),
  ]);

  const courses = coursesResult.status === "fulfilled" ? coursesResult.value.data : [];
  const categories = categoriesResult.status === "fulfilled" ? categoriesResult.value.data : [];
  const error =
    coursesResult.status === "rejected"
      ? "Start the backend API to browse courses from the live catalog."
      : undefined;

  return (
    <main className="container-shell py-12">
      <SectionHeading
        eyebrow="Explore"
        title="Find the right course"
        description="Search, filter, sort, and paginate through the live SkillSync AI course catalog."
      />
      <div className="mt-8">
        <CourseExplorer
          categories={categories}
          courses={courses}
          error={error}
          initialCategory={initialCategory}
        />
      </div>
    </main>
  );
}
