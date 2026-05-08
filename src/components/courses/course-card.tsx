import { Clock, Star, Users } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/api/skillsync";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="card flex h-full min-h-[460px] flex-col overflow-hidden">
      <div className="relative h-48 w-full bg-muted">
        <Image
          alt={course.title}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          src={course.thumbnail}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase text-muted-foreground">
          <span>{course.level}</span>
          <span className="text-primary">${course.price}</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-lg font-bold">{course.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {course.shortDescription}
        </p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-4 text-primary" />
            {course.durationInHours}h
          </span>
          <span className="flex items-center gap-1">
            <Star className="size-4 text-accent" />
            {course.averageRating || 0}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-4 text-secondary" />
            {course.totalEnrollments || course.enrollmentCount || 0}
          </span>
        </div>
        <div className="mt-auto pt-5">
          <Button asChild className="w-full" href={`/courses/${course.slug}`} variant="outline">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
