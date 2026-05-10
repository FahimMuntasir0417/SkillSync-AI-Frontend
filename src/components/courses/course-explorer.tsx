"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";
import { CardSkeleton } from "@/components/ui/skeletons";
import { StatusMessage } from "@/components/ui/status";
import type { Category, Course } from "@/lib/api/skillsync";

type CourseExplorerProps = {
  courses: Course[];
  categories: Category[];
  error?: string;
  initialCategory?: string;
};

const pageSize = 8;

const getCategoryIdFromSlug = (categories: Category[], initialCategory?: string) => {
  if (!initialCategory) return "";

  const normalized = initialCategory.toLowerCase();
  const matchedCategory = categories.find(
    (category) =>
      category.id.toLowerCase() === normalized ||
      category.slug.toLowerCase() === normalized ||
      category.name.toLowerCase() === normalized,
  );

  return matchedCategory?.id ?? "";
};

export function CourseExplorer({ courses, categories, error, initialCategory }: CourseExplorerProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState(() => getCategoryIdFromSlug(categories, initialCategory));
  const [level, setLevel] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("createdAt-desc");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [search]);

  const filtered = useMemo(() => {
    const [sortBy, sortOrder] = sort.split("-");
    const normalizedSearch = debouncedSearch.toLowerCase().trim();
    const max = maxPrice ? Number(maxPrice) : undefined;

    return [...courses]
      .filter((course) => {
        const matchesSearch =
          !normalizedSearch ||
          course.title.toLowerCase().includes(normalizedSearch) ||
          course.shortDescription.toLowerCase().includes(normalizedSearch);
        const matchesCategory = !categoryId || course.categoryId === categoryId;
        const matchesLevel = !level || course.level === level;
        const matchesPrice = max === undefined || course.price <= max;

        return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
      })
      .sort((a, b) => {
        const direction = sortOrder === "asc" ? 1 : -1;
        if (sortBy === "price") return (a.price - b.price) * direction;
        if (sortBy === "rating") return (a.averageRating - b.averageRating) * direction;
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * direction;
      });
  }, [categoryId, courses, debouncedSearch, level, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-8">
      <div className="card grid gap-4 p-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <label className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="focus-ring h-11 w-full rounded-card border border-border bg-background pl-10 pr-3 text-sm"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search courses"
            value={search}
          />
        </label>
        <select
          className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm"
          onChange={(event) => {
            setCategoryId(event.target.value);
            setPage(1);
          }}
          value={categoryId}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm"
          onChange={(event) => {
            setLevel(event.target.value);
            setPage(1);
          }}
          value={level}
        >
          <option value="">All levels</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <select
          className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm"
          onChange={(event) => {
            setMaxPrice(event.target.value);
            setPage(1);
          }}
          value={maxPrice}
        >
          <option value="">Any price</option>
          <option value="30">Up to $30</option>
          <option value="50">Up to $50</option>
          <option value="80">Up to $80</option>
        </select>
        <select
          className="focus-ring h-11 rounded-card border border-border bg-background px-3 text-sm"
          onChange={(event) => {
            setSort(event.target.value);
            setPage(1);
          }}
          value={sort}
        >
          <option value="createdAt-desc">Newest</option>
          <option value="price-asc">Price low to high</option>
          <option value="price-desc">Price high to low</option>
          <option value="rating-desc">Highest rated</option>
        </select>
      </div>

      {error ? <StatusMessage message={error} title="Unable to load live courses" tone="danger" /> : null}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {visible.length > 0
          ? visible.map((course) => <CourseCard course={course} key={course.id} />)
          : error
            ? Array.from({ length: 8 }).map((_, index) => <CardSkeleton key={index} />)
            : (
                <div className="lg:col-span-4">
                  <StatusMessage
                    message="Change search or filter values to see matching courses."
                    title="No courses matched"
                  />
                </div>
              )}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 rounded-card border border-border bg-surface p-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          Showing {visible.length} of {filtered.length} courses
        </p>
        <div className="flex items-center gap-2">
          <Button disabled={currentPage <= 1} onClick={() => setPage((value) => value - 1)} variant="outline">
            Previous
          </Button>
          <span className="text-sm font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <Button disabled={currentPage >= totalPages} onClick={() => setPage((value) => value + 1)} variant="outline">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
