"use client";

import { BookOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { StatusMessage } from "@/components/ui/status";
import { AiEndpointPage } from "@/features/ai-tools/components/ai-endpoint-page";
import { aiApi, publicApi, type Course } from "@/lib/api/skillsync";

export default function CourseSummaryPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    publicApi.courses({ limit: 100 })
      .then((response) => {
        if (active) {
          setCourses(response.data);
        }
      })
      .catch((requestError: unknown) => {
        if (active) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load courses");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const courseOptions = useMemo(
    () =>
      courses.length
        ? courses.map((course) => ({ label: course.title, value: course.id }))
        : [{ label: loading ? "Loading courses..." : "No courses available", value: "" }],
    [courses, loading],
  );
  const defaultCourseId = courses[0]?.id ?? "";

  return (
    <div>
      {error ? (
        <div className="container-shell pt-6">
          <StatusMessage title="Courses unavailable" message={error} tone="danger" />
        </div>
      ) : null}
      <AiEndpointPage
        key={defaultCourseId || "course-summary"}
        title="Course Summary"
        description="Choose an existing course and generate a concise AI summary."
        submitLabel="Generate summary"
        icon={BookOpen}
        fields={[
          {
            name: "courseId",
            label: "Course",
            type: "select",
            required: true,
            options: courseOptions,
          },
        ]}
        defaultValues={{ courseId: defaultCourseId }}
        buildPayload={(values) => ({ courseId: values.courseId })}
        submit={aiApi.courseSummary}
      />
    </div>
  );
}
