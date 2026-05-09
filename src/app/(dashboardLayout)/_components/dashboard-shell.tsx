"use client";

import {
  BarChart3,
  BookOpen,
  ClipboardList,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status";
import { apiFetch, getStoredToken, type Course } from "@/lib/api/skillsync";

type DashboardRole = "student" | "instructor" | "admin";

export function DashboardShell({ role }: { role: DashboardRole }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const token = getStoredToken();
    Promise.all([
      apiFetch<Course[]>("/courses", { query: { limit: 100 }, token }),
    ])
      .then(([courseResult]) => {
        setCourses(courseResult.data);
      })
      .catch((requestError: unknown) => {
        setError(requestError instanceof Error ? requestError.message : "Dashboard data unavailable");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = useMemo(() => {
    const normalized = filter.toLowerCase().trim();
    return courses.filter((course) => !normalized || course.title.toLowerCase().includes(normalized));
  }, [courses, filter]);

  const visible = filteredCourses.slice((page - 1) * 5, page * 5);
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / 5));
  const totalLessons = courses.reduce((sum, course) => sum + course.totalLessons, 0);
  const totalEnrollments = courses.reduce((sum, course) => sum + course.totalEnrollments, 0);
  const avgRating = courses.length
    ? (courses.reduce((sum, course) => sum + course.averageRating, 0) / courses.length).toFixed(1)
    : "0.0";

  return (
    <main className="space-y-6 p-4 md:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-primary">Overview</p>
            <h1 className="mt-1 text-3xl font-bold capitalize">{role} workspace</h1>
          </div>
          <Button asChild href="/profile" variant="outline">
            Edit profile
          </Button>
        </div>

        {error ? <StatusMessage message={error} title="Live dashboard data unavailable" tone="danger" /> : null}

        <div className="grid gap-4 md:grid-cols-4">
          <OverviewCard icon={BookOpen} label="Courses" value={loading ? "..." : courses.length} />
          <OverviewCard icon={ClipboardList} label="Lessons" value={loading ? "..." : totalLessons} />
          <OverviewCard icon={Users} label="Enrollments" value={loading ? "..." : totalEnrollments} />
          <OverviewCard icon={BarChart3} label="Avg rating" value={loading ? "..." : avgRating} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="card p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Course performance</h2>
              <span className="text-sm text-muted-foreground">Live catalog data</span>
            </div>
            <BarChart courses={courses.slice(0, 6)} />
          </div>
          <div className="card p-5">
            <h2 className="text-xl font-bold">Course levels</h2>
            <PieChart courses={courses} />
          </div>
        </div>

        <div className="card overflow-hidden" id={role === "admin" ? "users" : "submissions"}>
          <div className="flex flex-col justify-between gap-3 border-b border-border p-4 md:flex-row md:items-center">
            <h2 className="text-xl font-bold">Course table</h2>
            <input
              className="focus-ring h-10 rounded-card border border-border bg-background px-3 text-sm"
              onChange={(event) => {
                setFilter(event.target.value);
                setPage(1);
              }}
              placeholder="Filter table"
              value={filter}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-4">Course</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Lessons</th>
                  <th className="p-4">Rating</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((course) => (
                  <tr className="border-t border-border" key={course.id}>
                    <td className="p-4 font-semibold">{course.title}</td>
                    <td className="p-4">{course.level}</td>
                    <td className="p-4">${course.price}</td>
                    <td className="p-4">{course.totalLessons}</td>
                    <td className="p-4">{course.averageRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border p-4">
            <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <Button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} size="sm" variant="outline">Previous</Button>
              <Button disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)} size="sm" variant="outline">Next</Button>
            </div>
          </div>
        </div>
    </main>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number | string;
}) {
  return (
    <div className="card p-5">
      <Icon className="size-7 text-primary" />
      <p className="mt-5 text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function BarChart({ courses }: { courses: Course[] }) {
  const max = Math.max(...courses.map((course) => course.totalEnrollments), 1);
  return (
    <div className="flex h-64 items-end gap-3">
      {courses.map((course) => (
        <div className="flex flex-1 flex-col items-center gap-2" key={course.id}>
          <div className="flex h-48 w-full items-end rounded-card bg-muted p-1">
            <div
              className="w-full rounded-card bg-primary"
              style={{ height: `${Math.max(8, (course.totalEnrollments / max) * 100)}%` }}
            />
          </div>
          <span className="line-clamp-2 min-h-10 text-center text-xs text-muted-foreground">{course.title}</span>
        </div>
      ))}
    </div>
  );
}

function PieChart({ courses }: { courses: Course[] }) {
  const counts = {
    BEGINNER: courses.filter((course) => course.level === "BEGINNER").length,
    INTERMEDIATE: courses.filter((course) => course.level === "INTERMEDIATE").length,
    ADVANCED: courses.filter((course) => course.level === "ADVANCED").length,
  };
  const total = Math.max(1, courses.length);
  const beginner = (counts.BEGINNER / total) * 100;
  const intermediate = beginner + (counts.INTERMEDIATE / total) * 100;

  return (
    <div className="mt-6 grid place-items-center gap-5">
      <div
        className="size-44 rounded-full"
        style={{
          background: `conic-gradient(var(--primary) 0 ${beginner}%, var(--secondary) ${beginner}% ${intermediate}%, var(--accent) ${intermediate}% 100%)`,
        }}
      />
      <div className="grid w-full gap-2 text-sm">
        <Legend color="bg-primary" label="Beginner" value={counts.BEGINNER} />
        <Legend color="bg-secondary" label="Intermediate" value={counts.INTERMEDIATE} />
        <Legend color="bg-accent" label="Advanced" value={counts.ADVANCED} />
      </div>
    </div>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <span className={`size-3 rounded-full ${color}`} />
        {label}
      </span>
      <strong>{value}</strong>
    </div>
  );
}
