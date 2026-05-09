"use client";

import { Button } from "@/components/ui/button";
import {
  DashboardResourcePage,
  MutedCell,
  StatusBadge,
  TextCell,
  type DashboardColumn,
} from "./dashboard-resource-page";
import {
  aiApi,
  assignmentApi,
  blogApi,
  categoryApi,
  courseApi,
  enrollmentApi,
  publicApi,
  submissionApi,
  supportApi,
  userApi,
  type AiRequestLog,
  type Assignment,
  type AuthUser,
  type Blog,
  type Category,
  type Course,
  type CourseModule,
  type CourseReview,
  type Enrollment,
  type Lesson,
  type Submission,
  type SupportTicket,
} from "@/lib/api/skillsync";

type LessonRow = Lesson & {
  moduleTitle?: string;
  courseTitle?: string;
};

type ModuleRow = CourseModule & {
  courseTitle?: string;
};

const date = (value?: string | null) => (value ? new Date(value).toLocaleDateString() : "Not set");
const money = (value?: number | null) => `$${Number(value ?? 0).toFixed(2)}`;

const userColumns: DashboardColumn<AuthUser>[] = [
  { header: "Name", cell: (user) => <TextCell>{user.name}</TextCell> },
  { header: "Email", cell: (user) => <MutedCell>{user.email}</MutedCell> },
  { header: "Role", cell: (user) => <StatusBadge>{user.role}</StatusBadge> },
  { header: "Verified", cell: (user) => <StatusBadge>{user.emailVerified ? "Verified" : "Pending"}</StatusBadge> },
  { header: "Status", cell: (user) => <StatusBadge>{user.isBlocked ? "Blocked" : "Active"}</StatusBadge> },
];

const categoryColumns: DashboardColumn<Category>[] = [
  { header: "Name", cell: (category) => <TextCell>{category.name}</TextCell> },
  { header: "Slug", cell: (category) => <MutedCell>{category.slug}</MutedCell> },
  { header: "Description", cell: (category) => <MutedCell>{category.description}</MutedCell> },
];

const courseColumns: DashboardColumn<Course>[] = [
  { header: "Course", cell: (course) => <TextCell>{course.title}</TextCell> },
  { header: "Category", cell: (course) => <MutedCell>{course.category?.name}</MutedCell> },
  { header: "Instructor", cell: (course) => <MutedCell>{course.instructor?.name}</MutedCell> },
  { header: "Level", cell: (course) => <StatusBadge>{course.level}</StatusBadge> },
  { header: "Status", cell: (course) => <StatusBadge>{course.status}</StatusBadge> },
  { header: "Price", cell: (course) => <TextCell>{money(course.price)}</TextCell> },
  { header: "Lessons", cell: (course) => <MutedCell>{course.totalLessons}</MutedCell> },
];

const assignmentColumns: DashboardColumn<Assignment>[] = [
  { header: "Assignment", cell: (assignment) => <TextCell>{assignment.title}</TextCell> },
  { header: "Course", cell: (assignment) => <MutedCell>{assignment.course?.title}</MutedCell> },
  { header: "Due", cell: (assignment) => <MutedCell>{date(assignment.dueDate)}</MutedCell> },
  { header: "Status", cell: (assignment) => <StatusBadge>{assignment.status}</StatusBadge> },
  { header: "Submissions", cell: (assignment) => <MutedCell>{assignment.submissionCount ?? 0}</MutedCell> },
];

const submissionColumns: DashboardColumn<Submission>[] = [
  { header: "Assignment", cell: (submission) => <TextCell>{submission.assignment?.title ?? submission.assignmentId}</TextCell> },
  { header: "Student", cell: (submission) => <MutedCell>{submission.student?.name ?? submission.studentId}</MutedCell> },
  { header: "Status", cell: (submission) => <StatusBadge>{submission.status}</StatusBadge> },
  { header: "Submitted", cell: (submission) => <MutedCell>{date(submission.createdAt)}</MutedCell> },
  {
    header: "Links",
    cell: (submission) => (
      <div className="flex flex-wrap gap-2">
        {submission.githubUrl ? (
          <Button asChild href={submission.githubUrl} rel="noreferrer" size="sm" target="_blank" variant="outline">
            GitHub
          </Button>
        ) : null}
        {submission.liveUrl ? (
          <Button asChild href={submission.liveUrl} rel="noreferrer" size="sm" target="_blank" variant="outline">
            Live
          </Button>
        ) : null}
      </div>
    ),
  },
];

const enrollmentColumns: DashboardColumn<Enrollment>[] = [
  { header: "Course", cell: (enrollment) => <TextCell>{enrollment.course?.title ?? enrollment.courseId}</TextCell> },
  { header: "Level", cell: (enrollment) => <StatusBadge>{enrollment.course?.level ?? "Enrolled"}</StatusBadge> },
  { header: "Progress", cell: (enrollment) => <TextCell>{enrollment.progress}%</TextCell> },
  { header: "Enrolled", cell: (enrollment) => <MutedCell>{date(enrollment.createdAt)}</MutedCell> },
];

const supportColumns: DashboardColumn<SupportTicket>[] = [
  { header: "Subject", cell: (ticket) => <TextCell>{ticket.subject}</TextCell> },
  { header: "User", cell: (ticket) => <MutedCell>{ticket.user?.email ?? ticket.userId}</MutedCell> },
  { header: "Priority", cell: (ticket) => <StatusBadge>{ticket.priority}</StatusBadge> },
  { header: "Status", cell: (ticket) => <StatusBadge>{ticket.status}</StatusBadge> },
  { header: "Created", cell: (ticket) => <MutedCell>{date(ticket.createdAt)}</MutedCell> },
];

const blogColumns: DashboardColumn<Blog>[] = [
  { header: "Title", cell: (blog) => <TextCell>{blog.title}</TextCell> },
  { header: "Author", cell: (blog) => <MutedCell>{blog.author?.name}</MutedCell> },
  { header: "Tags", cell: (blog) => <MutedCell>{blog.tags?.join(", ")}</MutedCell> },
  { header: "Status", cell: (blog) => <StatusBadge>{blog.published ? "Published" : "Draft"}</StatusBadge> },
  { header: "Created", cell: (blog) => <MutedCell>{date(blog.createdAt)}</MutedCell> },
];

const aiLogColumns: DashboardColumn<AiRequestLog>[] = [
  { header: "Feature", cell: (log) => <TextCell>{log.feature}</TextCell> },
  { header: "User", cell: (log) => <MutedCell>{log.user?.email ?? "Anonymous"}</MutedCell> },
  { header: "Status", cell: (log) => <StatusBadge>{log.status}</StatusBadge> },
  { header: "Prompt", cell: (log) => <MutedCell>{log.prompt}</MutedCell> },
  { header: "Created", cell: (log) => <MutedCell>{date(log.createdAt)}</MutedCell> },
];

const reviewColumns: DashboardColumn<CourseReview>[] = [
  { header: "Course", cell: (review) => <TextCell>{review.courseId}</TextCell> },
  { header: "User", cell: (review) => <MutedCell>{review.user?.email ?? review.userId}</MutedCell> },
  { header: "Rating", cell: (review) => <StatusBadge>{`${review.rating}/5`}</StatusBadge> },
  { header: "Comment", cell: (review) => <MutedCell>{review.comment}</MutedCell> },
  { header: "Created", cell: (review) => <MutedCell>{date(review.createdAt)}</MutedCell> },
];

const moduleColumns: DashboardColumn<ModuleRow>[] = [
  { header: "Module", cell: (moduleItem) => <TextCell>{moduleItem.title}</TextCell> },
  { header: "Course", cell: (moduleItem) => <MutedCell>{moduleItem.courseTitle ?? moduleItem.course?.title}</MutedCell> },
  { header: "Order", cell: (moduleItem) => <MutedCell>{moduleItem.order}</MutedCell> },
  { header: "Lessons", cell: (moduleItem) => <MutedCell>{moduleItem.lessonCount ?? 0}</MutedCell> },
  { header: "Description", cell: (moduleItem) => <MutedCell>{moduleItem.description}</MutedCell> },
];

const lessonColumns: DashboardColumn<LessonRow>[] = [
  { header: "Lesson", cell: (lesson) => <TextCell>{lesson.title}</TextCell> },
  { header: "Module", cell: (lesson) => <MutedCell>{lesson.moduleTitle}</MutedCell> },
  { header: "Course", cell: (lesson) => <MutedCell>{lesson.courseTitle}</MutedCell> },
  { header: "Order", cell: (lesson) => <MutedCell>{lesson.order}</MutedCell> },
  { header: "Preview", cell: (lesson) => <StatusBadge>{lesson.isPreview ? "Preview" : "Locked"}</StatusBadge> },
];

async function loadCourseDetails() {
  const coursesResult = await courseApi.list({ limit: 20 });
  return Promise.all(coursesResult.data.map((course) => courseApi.bySlug(course.slug).then((result) => result.data)));
}

async function loadModules(): Promise<ModuleRow[]> {
  const courses = await loadCourseDetails();
  return courses.flatMap((course) =>
    (course.modules ?? []).map((moduleItem) => ({
      ...moduleItem,
      courseId: course.id,
      courseTitle: course.title,
      lessonCount: moduleItem.lessons?.length ?? 0,
    })),
  );
}

async function loadLessons(): Promise<LessonRow[]> {
  const courses = await loadCourseDetails();
  return courses.flatMap((course) =>
    (course.modules ?? []).flatMap((moduleItem) =>
      (moduleItem.lessons ?? []).map((lesson) => ({
        ...lesson,
        moduleId: moduleItem.id,
        moduleTitle: moduleItem.title,
        courseTitle: course.title,
      })),
    ),
  );
}

async function loadReviews(): Promise<CourseReview[]> {
  const coursesResult = await courseApi.list({ limit: 20 });
  const reviewGroups = await Promise.all(
    coursesResult.data.map((course) => publicApi.courseReviews(course.id).then((result) => result.data).catch(() => [])),
  );
  return reviewGroups.flat();
}

export function UsersManagementView() {
  return (
    <DashboardResourcePage
      eyebrow="Admin"
      title="Users management"
      description="Manage users, role changes, and blocked status using live backend data."
      query={() => userApi.list({ limit: 100 })}
      columns={userColumns}
      getRowKey={(user) => user.id}
      getSearchText={(user) => `${user.name} ${user.email} ${user.role}`}
    />
  );
}

export function CategoryManagementView() {
  return (
    <DashboardResourcePage
      eyebrow="Admin"
      title="Category management"
      description="Review course categories currently available in the backend."
      query={categoryApi.list}
      columns={categoryColumns}
      getRowKey={(category) => category.id}
      getSearchText={(category) => `${category.name} ${category.slug} ${category.description ?? ""}`}
    />
  );
}

export function CoursesManagementView({ eyebrow = "Admin", title = "Courses management" }: { eyebrow?: string; title?: string }) {
  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Review courses, publishing state, pricing, instructors, and catalog metadata."
      query={() => courseApi.list({ limit: 100 })}
      columns={courseColumns}
      getRowKey={(course) => course.id}
      getSearchText={(course) => `${course.title} ${course.level} ${course.status} ${course.instructor?.name ?? ""}`}
    />
  );
}

export function SupportManagementView({ eyebrow = "Admin", title = "Support tickets" }: { eyebrow?: string; title?: string }) {
  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Review support tickets, priority, ownership, and resolution status."
      query={() => supportApi.tickets({ limit: 100 })}
      columns={supportColumns}
      getRowKey={(ticket) => ticket.id}
      getSearchText={(ticket) => `${ticket.subject} ${ticket.status} ${ticket.priority} ${ticket.user?.email ?? ""}`}
    />
  );
}

export function AiLogsView() {
  return (
    <DashboardResourcePage
      eyebrow="Admin"
      title="AI logs"
      description="Monitor AI feature usage, prompts, status, and user context."
      query={() => aiApi.logs({ limit: 100 })}
      columns={aiLogColumns}
      getRowKey={(log) => log.id}
      getSearchText={(log) => `${log.feature} ${log.status} ${log.prompt} ${log.user?.email ?? ""}`}
    />
  );
}

export function BlogsManagementView({ eyebrow = "Admin", title = "Blog management" }: { eyebrow?: string; title?: string }) {
  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Review blog content, authors, tags, and publish state."
      query={() => blogApi.list({ limit: 100 })}
      columns={blogColumns}
      getRowKey={(blog) => blog.id}
      getSearchText={(blog) => `${blog.title} ${blog.excerpt} ${blog.tags?.join(" ") ?? ""}`}
    />
  );
}

export function AssignmentsView({ eyebrow = "Student", title = "Assignments" }: { eyebrow?: string; title?: string }) {
  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="View assignments from the backend with course, status, due date, and submission counts."
      query={() => assignmentApi.list({ limit: 100 })}
      columns={assignmentColumns}
      getRowKey={(assignment) => assignment.id}
      getSearchText={(assignment) => `${assignment.title} ${assignment.status} ${assignment.course?.title ?? ""}`}
    />
  );
}

export function PendingSubmissionsView() {
  return (
    <DashboardResourcePage
      eyebrow="Instructor"
      title="Submission reviews"
      description="Review pending student submissions and submitted work links."
      query={() => submissionApi.pending({ limit: 100 })}
      columns={submissionColumns}
      getRowKey={(submission) => submission.id}
      getSearchText={(submission) => `${submission.assignment?.title ?? ""} ${submission.student?.email ?? ""} ${submission.status}`}
    />
  );
}

export function MySubmissionsView({ eyebrow = "Common", title = "My submissions" }: { eyebrow?: string; title?: string }) {
  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Track your assignment submissions, status, feedback, and submitted links."
      query={submissionApi.mySubmissions}
      columns={submissionColumns}
      getRowKey={(submission) => submission.id}
      getSearchText={(submission) => `${submission.assignment?.title ?? ""} ${submission.status}`}
    />
  );
}

export function MyClassesView({ eyebrow = "Common", title = "My classes" }: { eyebrow?: string; title?: string }) {
  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Review enrolled courses and learning progress from the enrollment API."
      query={enrollmentApi.myClasses}
      columns={enrollmentColumns}
      getRowKey={(enrollment) => enrollment.id}
      getSearchText={(enrollment) => `${enrollment.course?.title ?? ""} ${enrollment.progress}`}
    />
  );
}

export function CourseModulesView() {
  return (
    <DashboardResourcePage
      eyebrow="Instructor"
      title="Course modules"
      description="Review module structure by loading course details from the backend."
      query={loadModules}
      columns={moduleColumns}
      getRowKey={(moduleItem) => moduleItem.id}
      getSearchText={(moduleItem) => `${moduleItem.title} ${moduleItem.courseTitle ?? ""}`}
    />
  );
}

export function LessonsView() {
  return (
    <DashboardResourcePage
      eyebrow="Instructor"
      title="Lessons"
      description="Review lessons nested under course modules from the backend course details API."
      query={loadLessons}
      columns={lessonColumns}
      getRowKey={(lesson) => lesson.id}
      getSearchText={(lesson) => `${lesson.title} ${lesson.moduleTitle ?? ""} ${lesson.courseTitle ?? ""}`}
    />
  );
}

export function ReviewsView() {
  return (
    <DashboardResourcePage
      eyebrow="Common"
      title="Course reviews"
      description="Review course ratings and comments from the backend course review API."
      query={loadReviews}
      columns={reviewColumns}
      getRowKey={(review) => review.id}
      getSearchText={(review) => `${review.courseId} ${review.user?.email ?? ""} ${review.comment ?? ""}`}
    />
  );
}
