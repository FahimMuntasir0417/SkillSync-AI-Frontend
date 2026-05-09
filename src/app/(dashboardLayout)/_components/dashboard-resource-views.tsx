"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DashboardResourcePage,
  MutedCell,
  StatusBadge,
  TextCell,
  type DashboardColumn,
  type DashboardCrudAction,
  type DashboardField,
  type DashboardPayload,
} from "./dashboard-resource-page";
import {
  aiApi,
  assignmentApi,
  blogApi,
  categoryApi,
  courseApi,
  courseModuleApi,
  courseReviewApi,
  enrollmentApi,
  lessonApi,
  publicApi,
  reviewApi,
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

const date = (value?: string | null) => {
  if (!value) return "Not set";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString().slice(0, 10);
};
const money = (value?: number | null) => `$${Number(value ?? 0).toFixed(2)}`;
const showDetails = (title: string, value: unknown) => {
  window.alert(`${title}\n\n${JSON.stringify(value, null, 2)}`);
};

const levelOptions = [
  { label: "Beginner", value: "BEGINNER" },
  { label: "Intermediate", value: "INTERMEDIATE" },
  { label: "Advanced", value: "ADVANCED" },
];

const courseStatusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

const assignmentStatusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Closed", value: "CLOSED" },
];

const submissionStatusOptions = [
  { label: "Pending", value: "PENDING" },
  { label: "In review", value: "IN_REVIEW" },
  { label: "Approved", value: "APPROVED" },
  { label: "Changes requested", value: "CHANGES_REQUESTED" },
  { label: "Rejected", value: "REJECTED" },
];

const ticketPriorityOptions = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
];

const ticketStatusOptions = [
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Resolved", value: "RESOLVED" },
  { label: "Closed", value: "CLOSED" },
];

const roleOptions = [
  { label: "Student", value: "STUDENT" },
  { label: "Instructor", value: "INSTRUCTOR" },
  { label: "Admin", value: "ADMIN" },
];

function useOptionData() {
  const categories = useQuery({
    queryKey: ["dashboard-form-categories"],
    queryFn: async () => (await categoryApi.list()).data,
  });
  const courses = useQuery({
    queryKey: ["dashboard-form-courses"],
    queryFn: async () => (await courseApi.list({ limit: 100 })).data,
  });
  const instructors = useQuery({
    queryKey: ["dashboard-form-instructors"],
    queryFn: async () => (await userApi.list({ role: "INSTRUCTOR", limit: 100 })).data,
  });

  return {
    categoryOptions:
      categories.data?.map((category) => ({ label: category.name, value: category.id })) ?? [],
    courseOptions: courses.data?.map((course) => ({ label: course.title, value: course.id })) ?? [],
    instructorOptions:
      instructors.data?.map((instructor) => ({
        label: `${instructor.name} (${instructor.email})`,
        value: instructor.id,
      })) ?? [],
  };
}

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
  const coursesResult = await courseApi.list({ limit: 100 });
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
  const coursesResult = await courseApi.list({ limit: 100 });
  const reviewGroups = await Promise.all(
    coursesResult.data.map((course) => publicApi.courseReviews(course.id).then((result) => result.data).catch(() => [])),
  );
  return reviewGroups.flat();
}

const categoryFields: DashboardField<Category>[] = [
  { name: "name", label: "Name", required: true, getValue: (category) => category.name },
  { name: "description", label: "Description", type: "textarea", getValue: (category) => category.description },
  { name: "iconUrl", label: "Icon URL", getValue: (category) => category.iconUrl },
];

const courseFields = (
  categoryOptions: { label: string; value: string }[],
  instructorOptions: { label: string; value: string }[] = [],
): DashboardField<Course>[] => [
  { name: "title", label: "Title", required: true, getValue: (course) => course.title },
  { name: "thumbnail", label: "Thumbnail URL", required: true, getValue: (course) => course.thumbnail },
  { name: "shortDescription", label: "Short description", required: true, type: "textarea", getValue: (course) => course.shortDescription },
  { name: "description", label: "Description", required: true, type: "textarea", getValue: (course) => course.description },
  { name: "categoryId", label: "Category", required: true, type: "select", options: categoryOptions, getValue: (course) => course.categoryId },
  { name: "level", label: "Level", required: true, type: "select", options: levelOptions, getValue: (course) => course.level },
  { name: "status", label: "Status", type: "select", options: courseStatusOptions, getValue: (course) => course.status },
  { name: "price", label: "Price", type: "number", getValue: (course) => course.price },
  { name: "durationInHours", label: "Duration hours", type: "number", getValue: (course) => course.durationInHours },
  { name: "previewVideoUrl", label: "Preview video URL", getValue: (course) => course.previewVideoUrl },
  {
    name: "instructorId",
    label: "Instructor",
    type: instructorOptions.length > 0 ? "select" : "text",
    options: instructorOptions,
    getValue: (course) => course.instructorId,
  },
];

const moduleFields = (courseOptions: { label: string; value: string }[]): DashboardField<ModuleRow>[] => [
  { name: "title", label: "Title", required: true, getValue: (moduleItem) => moduleItem.title },
  { name: "courseId", label: "Course", required: true, type: "select", options: courseOptions, getValue: (moduleItem) => moduleItem.courseId },
  { name: "order", label: "Order", required: true, type: "number", getValue: (moduleItem) => moduleItem.order },
  { name: "description", label: "Description", type: "textarea", getValue: (moduleItem) => moduleItem.description },
];

const lessonFields = (moduleOptions: { label: string; value: string }[]): DashboardField<LessonRow>[] => [
  { name: "title", label: "Title", required: true, getValue: (lesson) => lesson.title },
  { name: "moduleId", label: "Module", required: true, type: "select", options: moduleOptions, getValue: (lesson) => lesson.moduleId },
  { name: "order", label: "Order", required: true, type: "number", getValue: (lesson) => lesson.order },
  { name: "content", label: "Content", required: true, type: "textarea", getValue: (lesson) => lesson.content },
  { name: "videoUrl", label: "Video URL", getValue: (lesson) => lesson.videoUrl },
  { name: "resourceUrl", label: "Resource URL", getValue: (lesson) => lesson.resourceUrl },
  { name: "isPreview", label: "Preview lesson", type: "checkbox", getValue: (lesson) => lesson.isPreview },
];

const assignmentFields = (courseOptions: { label: string; value: string }[]): DashboardField<Assignment>[] => [
  { name: "title", label: "Title", required: true, getValue: (assignment) => assignment.title },
  { name: "courseId", label: "Course", required: true, type: "select", options: courseOptions, getValue: (assignment) => assignment.courseId },
  { name: "description", label: "Description", required: true, type: "textarea", getValue: (assignment) => assignment.description },
  { name: "dueDate", label: "Due date", type: "datetime-local", getValue: (assignment) => assignment.dueDate },
  { name: "status", label: "Status", type: "select", options: assignmentStatusOptions, getValue: (assignment) => assignment.status },
];

const blogFields: DashboardField<Blog>[] = [
  { name: "title", label: "Title", required: true, getValue: (blog) => blog.title },
  { name: "excerpt", label: "Excerpt", required: true, type: "textarea", getValue: (blog) => blog.excerpt },
  { name: "content", label: "Content", required: true, type: "textarea", getValue: (blog) => blog.content },
  { name: "thumbnail", label: "Thumbnail URL", getValue: (blog) => blog.thumbnail },
  { name: "tags", label: "Tags", type: "tags", placeholder: "react, node, ai", getValue: (blog) => blog.tags },
  { name: "published", label: "Published", type: "checkbox", getValue: (blog) => blog.published },
];

const ticketCreateFields: DashboardField<SupportTicket>[] = [
  { name: "subject", label: "Subject", required: true },
  { name: "message", label: "Message", required: true, type: "textarea" },
  { name: "priority", label: "Priority", type: "select", options: ticketPriorityOptions },
];

function submissionCreateAction(assignmentOptions: { label: string; value: string }[] = [], assignmentId?: string): DashboardCrudAction<Submission> {
  return {
    label: "Submit assignment",
    fields: [
      {
        name: "assignmentId",
        label: "Assignment",
        required: true,
        type: assignmentOptions.length > 0 ? "select" : "text",
        options: assignmentOptions,
        getValue: () => assignmentId ?? "",
      },
      { name: "githubUrl", label: "GitHub URL" },
      { name: "liveUrl", label: "Live URL" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
    mutation: (payload) => submissionApi.create(payload as Parameters<typeof submissionApi.create>[0]),
  };
}

export function UsersManagementView() {
  return (
    <DashboardResourcePage
      eyebrow="Admin workspace"
      title="Users management"
      description="Manage user roles and blocked status using the backend users API."
      query={() => userApi.list({ limit: 100 })}
      columns={userColumns}
      getRowKey={(user) => user.id}
      getSearchText={(user) => `${user.name} ${user.email} ${user.role}`}
      updateAction={{
        label: "Change role",
        fields: [{ name: "role", label: "Role", required: true, type: "select", options: roleOptions, getValue: (user) => user.role }],
        mutation: (payload, user) => userApi.changeRole(user?.id ?? "", String(payload.role) as AuthUser["role"]),
      }}
      rowActions={[
        {
          label: "Toggle block",
          variant: "danger",
          confirm: "Change this user's blocked status?",
          run: (user) => userApi.block(user.id, !user.isBlocked),
        },
      ]}
    />
  );
}

export function CategoryManagementView() {
  return (
    <DashboardResourcePage
      eyebrow="Admin workspace"
      title="Category management"
      description="Create, edit, and delete course categories."
      query={categoryApi.list}
      columns={categoryColumns}
      getRowKey={(category) => category.id}
      getSearchText={(category) => `${category.name} ${category.slug} ${category.description ?? ""}`}
      createAction={{ label: "Create category", fields: categoryFields, mutation: (payload) => categoryApi.create(payload as Parameters<typeof categoryApi.create>[0]) }}
      updateAction={{ label: "Edit category", fields: categoryFields, mutation: (payload, category) => categoryApi.update(category?.id ?? "", payload) }}
      deleteAction={(category) => categoryApi.delete(category.id)}
      rowActions={[
        {
          label: "Details",
          run: async (category) => {
            const result = await categoryApi.byId(category.id);
            showDetails("Category details", result.data);
          },
        },
      ]}
    />
  );
}

export function CoursesManagementView({ eyebrow = "Admin workspace", title = "Courses management" }: { eyebrow?: string; title?: string }) {
  const { categoryOptions, instructorOptions } = useOptionData();
  const fields = courseFields(categoryOptions, eyebrow.toLowerCase().includes("admin") ? instructorOptions : []);
  const editable = eyebrow.toLowerCase().includes("admin") || eyebrow.toLowerCase().includes("instructor");

  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Create, edit, publish, archive, and delete courses."
      query={() => courseApi.list({ limit: 100 })}
      columns={courseColumns}
      getRowKey={(course) => course.id}
      getSearchText={(course) => `${course.title} ${course.level} ${course.status} ${course.instructor?.name ?? ""}`}
      createAction={editable ? { label: "Create course", fields, mutation: (payload) => courseApi.create(payload as Parameters<typeof courseApi.create>[0]) } : undefined}
      updateAction={editable ? { label: "Edit course", fields, mutation: (payload, course) => courseApi.update(course?.id ?? "", payload) } : undefined}
      deleteAction={editable ? (course) => courseApi.delete(course.id) : undefined}
      rowActions={[
        ...(editable
          ? [
              {
                label: "Details",
                run: async (course: Course) => {
                  const result = await courseApi.bySlug(course.slug);
                  showDetails("Course details", result.data);
                },
              },
              { label: "Publish", run: (course: Course) => courseApi.update(course.id, { status: "PUBLISHED" }), isVisible: (course: Course) => course.status !== "PUBLISHED" },
              { label: "Archive", variant: "danger" as const, run: (course: Course) => courseApi.update(course.id, { status: "ARCHIVED" }), isVisible: (course: Course) => course.status !== "ARCHIVED" },
            ]
          : [
              {
                label: "Details",
                run: async (course: Course) => {
                  const result = await courseApi.bySlug(course.slug);
                  showDetails("Course details", result.data);
                },
              },
              { label: "Enroll", run: (course: Course) => enrollmentApi.enroll(course.id) },
            ]),
      ]}
    />
  );
}

export function SupportManagementView({ eyebrow = "Common workspace", title = "Support tickets" }: { eyebrow?: string; title?: string }) {
  const canUpdateStatus = eyebrow.toLowerCase().includes("admin");

  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Create support tickets, update ticket status, and reply to existing tickets."
      query={() => supportApi.tickets({ limit: 100 })}
      columns={supportColumns}
      getRowKey={(ticket) => ticket.id}
      getSearchText={(ticket) => `${ticket.subject} ${ticket.status} ${ticket.priority} ${ticket.user?.email ?? ""}`}
      createAction={{ label: "Create ticket", fields: ticketCreateFields, mutation: (payload) => supportApi.createTicket(payload as Parameters<typeof supportApi.createTicket>[0]) }}
      updateAction={
        canUpdateStatus
          ? {
              label: "Update ticket status",
              fields: [{ name: "status", label: "Status", required: true, type: "select", options: ticketStatusOptions, getValue: (ticket) => ticket.status }],
              mutation: (payload, ticket) => supportApi.updateTicketStatus(ticket?.id ?? "", String(payload.status) as SupportTicket["status"]),
            }
          : undefined
      }
      rowActions={[
        {
          label: "Details",
          run: async (ticket) => {
            const result = await supportApi.ticketById(ticket.id);
            showDetails("Support ticket details", result.data);
          },
        },
        {
          label: "Reply",
          run: (ticket) => {
            const message = window.prompt("Reply message");
            return message ? supportApi.createReply(ticket.id, message) : Promise.resolve();
          },
        },
      ]}
    />
  );
}

export function AiLogsView() {
  return (
    <DashboardResourcePage
      eyebrow="Admin workspace"
      title="AI logs"
      description="Monitor AI feature usage, prompts, status, and user context."
      query={() => aiApi.logs({ limit: 100 })}
      columns={aiLogColumns}
      getRowKey={(log) => log.id}
      getSearchText={(log) => `${log.feature} ${log.status} ${log.prompt} ${log.user?.email ?? ""}`}
    />
  );
}

export function BlogsManagementView({ eyebrow = "Admin workspace", title = "Blog management" }: { eyebrow?: string; title?: string }) {
  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Create, edit, publish, and delete blog posts."
      query={() => blogApi.list({ limit: 100 })}
      columns={blogColumns}
      getRowKey={(blog) => blog.id}
      getSearchText={(blog) => `${blog.title} ${blog.excerpt} ${blog.tags?.join(" ") ?? ""}`}
      createAction={{ label: "Create blog", fields: blogFields, mutation: (payload) => blogApi.create(payload as Parameters<typeof blogApi.create>[0]) }}
      updateAction={{ label: "Edit blog", fields: blogFields, mutation: (payload, blog) => blogApi.update(blog?.id ?? "", payload) }}
      deleteAction={(blog) => blogApi.delete(blog.id)}
    />
  );
}

export function AssignmentsView({ eyebrow = "Student workspace", title = "Assignments", editable = false }: { eyebrow?: string; title?: string; editable?: boolean }) {
  const { courseOptions } = useOptionData();
  const fields = assignmentFields(courseOptions);

  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Manage assignments through the backend assignments API."
      query={() => assignmentApi.list({ limit: 100 })}
      columns={assignmentColumns}
      getRowKey={(assignment) => assignment.id}
      getSearchText={(assignment) => `${assignment.title} ${assignment.status} ${assignment.course?.title ?? ""}`}
      createAction={editable ? { label: "Create assignment", fields, mutation: (payload) => assignmentApi.create(payload as Parameters<typeof assignmentApi.create>[0]) } : undefined}
      updateAction={editable ? { label: "Edit assignment", fields, mutation: (payload, assignment) => assignmentApi.update(assignment?.id ?? "", payload) } : undefined}
      deleteAction={editable ? (assignment) => assignmentApi.delete(assignment.id) : undefined}
      rowActions={
        editable
          ? [
              {
                label: "Details",
                run: async (assignment) => {
                  const result = await assignmentApi.byId(assignment.id);
                  showDetails("Assignment details", result.data);
                },
              },
              { label: "Close", variant: "danger", run: (assignment) => assignmentApi.update(assignment.id, { status: "CLOSED" }), isVisible: (assignment) => assignment.status !== "CLOSED" },
              { label: "Reopen", run: (assignment) => assignmentApi.update(assignment.id, { status: "ACTIVE" }), isVisible: (assignment) => assignment.status !== "ACTIVE" },
            ]
          : [
              {
                label: "Details",
                run: async (assignment) => {
                  const result = await assignmentApi.byId(assignment.id);
                  showDetails("Assignment details", result.data);
                },
              },
              {
                label: "Submit",
                run: (assignment) => {
                  const githubUrl = window.prompt("GitHub URL");
                  const liveUrl = window.prompt("Live URL");
                  const notes = window.prompt("Notes");
                  return submissionApi.create({
                    assignmentId: assignment.id,
                    ...(githubUrl ? { githubUrl } : {}),
                    ...(liveUrl ? { liveUrl } : {}),
                    ...(notes ? { notes } : {}),
                  });
                },
              },
            ]
      }
    />
  );
}

export function PendingSubmissionsView() {
  return (
    <DashboardResourcePage
      eyebrow="Instructor workspace"
      title="Submission reviews"
      description="Review student submissions and update status or feedback."
      query={() => submissionApi.pending({ limit: 100 })}
      columns={submissionColumns}
      getRowKey={(submission) => submission.id}
      getSearchText={(submission) => `${submission.assignment?.title ?? ""} ${submission.student?.email ?? ""} ${submission.status}`}
      updateAction={{
        label: "Update submission status",
        fields: [{ name: "status", label: "Status", required: true, type: "select", options: submissionStatusOptions, getValue: (submission) => submission.status }],
        mutation: (payload, submission) => submissionApi.updateStatus(submission?.id ?? "", String(payload.status) as Submission["status"]),
      }}
      rowActions={[
        {
          label: "Details",
          run: async (submission) => {
            const result = await submissionApi.byId(submission.id);
            showDetails("Submission details", result.data);
          },
        },
        {
          label: "Review",
          run: (submission) => {
            const feedback = window.prompt("Feedback");
            if (!feedback) return Promise.resolve();
            const scoreValue = window.prompt("Score 0-100");
            const status = window.prompt("Submission status", "APPROVED") as Submission["status"] | null;
            return reviewApi.createSubmissionReview(submission.id, {
              feedback,
              ...(scoreValue ? { score: Number(scoreValue) } : {}),
              submissionStatus: status || "APPROVED",
            });
          },
        },
        {
          label: "Review details",
          isVisible: (submission) => Boolean(submission.review?.id),
          run: async (submission) => {
            const result = await reviewApi.submissionReviewById(submission.review?.id ?? "");
            showDetails("Submission review details", result.data);
          },
        },
      ]}
    />
  );
}

export function MySubmissionsView({ eyebrow = "Common workspace", title = "My submissions" }: { eyebrow?: string; title?: string }) {
  const assignments = useQuery({
    queryKey: ["submission-form-assignments"],
    queryFn: async () => (await assignmentApi.list({ limit: 100 })).data,
  });
  const assignmentOptions =
    assignments.data?.map((assignment) => ({
      label: `${assignment.title}${assignment.course?.title ? ` - ${assignment.course.title}` : ""}`,
      value: assignment.id,
    })) ?? [];

  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Track your assignment submissions, status, feedback, and submitted links."
      query={submissionApi.mySubmissions}
      columns={submissionColumns}
      getRowKey={(submission) => submission.id}
      getSearchText={(submission) => `${submission.assignment?.title ?? ""} ${submission.status}`}
      createAction={submissionCreateAction(assignmentOptions)}
      rowActions={[
        {
          label: "Details",
          run: async (submission) => {
            const result = await submissionApi.byId(submission.id);
            showDetails("Submission details", result.data);
          },
        },
      ]}
    />
  );
}

export function MyClassesView({ eyebrow = "Common workspace", title = "My classes" }: { eyebrow?: string; title?: string }) {
  return (
    <DashboardResourcePage
      eyebrow={eyebrow}
      title={title}
      description="Review enrolled courses and update learning progress from the enrollment API."
      query={enrollmentApi.myClasses}
      columns={enrollmentColumns}
      getRowKey={(enrollment) => enrollment.id}
      getSearchText={(enrollment) => `${enrollment.course?.title ?? ""} ${enrollment.progress}`}
      updateAction={{
        label: "Update progress",
        fields: [{ name: "progress", label: "Progress percent", required: true, type: "number", getValue: (enrollment) => enrollment.progress }],
        mutation: (payload, enrollment) => enrollmentApi.updateProgress(enrollment?.id ?? "", Number(payload.progress)),
      }}
      rowActions={[
        {
          label: "Details",
          run: async (enrollment) => {
            const result = await enrollmentApi.byId(enrollment.id);
            showDetails("Enrollment details", result.data);
          },
        },
      ]}
    />
  );
}

export function CourseModulesView() {
  const { courseOptions } = useOptionData();
  const fields = moduleFields(courseOptions);

  return (
    <DashboardResourcePage
      eyebrow="Instructor workspace"
      title="Course modules"
      description="Create, edit, and delete modules for instructor courses."
      query={loadModules}
      columns={moduleColumns}
      getRowKey={(moduleItem) => moduleItem.id}
      getSearchText={(moduleItem) => `${moduleItem.title} ${moduleItem.courseTitle ?? ""}`}
      createAction={{ label: "Create module", fields, mutation: (payload) => courseModuleApi.create(payload as Parameters<typeof courseModuleApi.create>[0]) }}
      updateAction={{ label: "Edit module", fields, mutation: (payload, moduleItem) => courseModuleApi.update(moduleItem?.id ?? "", payload) }}
      deleteAction={(moduleItem) => courseModuleApi.delete(moduleItem.id)}
    />
  );
}

export function LessonsView() {
  const modules = useQuery({ queryKey: ["dashboard-form-modules"], queryFn: loadModules });
  const moduleOptions =
    modules.data?.map((moduleItem) => ({ label: `${moduleItem.courseTitle ?? "Course"} / ${moduleItem.title}`, value: moduleItem.id })) ?? [];
  const fields = lessonFields(moduleOptions);

  return (
    <DashboardResourcePage
      eyebrow="Instructor workspace"
      title="Lessons"
      description="Create, edit, delete, and mark lessons complete through the lessons API."
      query={loadLessons}
      columns={lessonColumns}
      getRowKey={(lesson) => lesson.id}
      getSearchText={(lesson) => `${lesson.title} ${lesson.moduleTitle ?? ""} ${lesson.courseTitle ?? ""}`}
      createAction={{ label: "Create lesson", fields, mutation: (payload) => lessonApi.create(payload as Parameters<typeof lessonApi.create>[0]) }}
      updateAction={{ label: "Edit lesson", fields, mutation: (payload, lesson) => lessonApi.update(lesson?.id ?? "", payload) }}
      deleteAction={(lesson) => lessonApi.delete(lesson.id)}
      rowActions={[{ label: "Complete", run: (lesson) => lessonApi.complete(lesson.id) }]}
    />
  );
}

export function ReviewsView() {
  const { courseOptions } = useOptionData();
  const reviewFields: DashboardField<CourseReview>[] = [
    { name: "courseId", label: "Course", required: true, type: "select", options: courseOptions, getValue: (review) => review.courseId },
    { name: "rating", label: "Rating", required: true, type: "number", getValue: (review) => review.rating },
    { name: "comment", label: "Comment", type: "textarea", getValue: (review) => review.comment },
  ];

  const createReview = (payload: DashboardPayload) => {
    const courseId = String(payload.courseId);
    const { courseId: _courseId, ...body } = payload;
    void _courseId;
    return courseReviewApi.create(courseId, body as Parameters<typeof courseReviewApi.create>[1]);
  };

  return (
    <DashboardResourcePage
      eyebrow="Common workspace"
      title="Course reviews"
      description="Create, edit, and delete course ratings and comments."
      query={loadReviews}
      columns={reviewColumns}
      getRowKey={(review) => review.id}
      getSearchText={(review) => `${review.courseId} ${review.user?.email ?? ""} ${review.comment ?? ""}`}
      createAction={{ label: "Create review", fields: reviewFields, mutation: createReview }}
      updateAction={{ label: "Edit review", fields: reviewFields, mutation: (payload, review) => courseReviewApi.update(review?.id ?? "", payload) }}
      deleteAction={(review) => courseReviewApi.delete(review.id)}
    />
  );
}
