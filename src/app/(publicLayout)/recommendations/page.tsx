"use client";

import { WandSparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AiEndpointPage, toOptionalString } from "@/features/ai-tools/components/ai-endpoint-page";
import { aiApi, publicApi, type Course } from "@/lib/api/skillsync";

function replaceCourseIdsWithNames(value: unknown, courseNameById: Map<string, string>): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => replaceCourseIdsWithNames(item, courseNameById));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const entries = Object.entries(value);
  const courseId = entries.find(([key, item]) => key.toLowerCase() === "courseid" && typeof item === "string")?.[1];
  const title = entries.find(([key, item]) => key.toLowerCase() === "title" && typeof item === "string")?.[1];
  const courseName =
    (typeof courseId === "string" ? courseNameById.get(courseId) : undefined) ??
    (typeof title === "string" ? title : undefined);
  const result: Record<string, unknown> = {};

  if (courseName) {
    result.courseName = courseName;
  }

  entries.forEach(([key, item]) => {
    if (key.toLowerCase() === "courseid" && courseName) {
      return;
    }

    if (key.toLowerCase() === "title" && item === courseName) {
      return;
    }

    result[key] = replaceCourseIdsWithNames(item, courseNameById);
  });

  return result;
}

export default function RecommendationsPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    let mounted = true;

    publicApi
      .courses()
      .then((response) => {
        if (mounted) {
          setCourses(response.data);
        }
      })
      .catch(() => {
        if (mounted) {
          setCourses([]);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const courseNameById = useMemo(
    () => new Map(courses.map((course) => [course.id, course.title])),
    [courses],
  );

  return (
    <AiEndpointPage
      title="Recommendations"
      description="Generate general AI learning recommendations from an optional interest."
      submitLabel="Get recommendations"
      icon={WandSparkles}
      fields={[
        { name: "interest", label: "Interest", placeholder: "backend development" },
      ]}
      defaultValues={{ interest: "" }}
      buildPayload={(values) => ({ interest: toOptionalString(values.interest) })}
      submit={aiApi.recommendations}
      transformResult={(result) => replaceCourseIdsWithNames(result, courseNameById)}
    />
  );
}
