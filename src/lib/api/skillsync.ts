import { env } from "@/config/env";
import {
  clearAuthSession,
  getAccessToken,
  persistAuthSession,
} from "@/lib/auth/session";

export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type ApiListQuery = Record<string, string | number | boolean | undefined>;

export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";
export type UserStatus = "ACTIVE" | "BLOCKED" | "INACTIVE";
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type AssignmentStatus = "ACTIVE" | "CLOSED";
export type SubmissionStatus =
  | "PENDING"
  | "IN_REVIEW"
  | "APPROVED"
  | "CHANGES_REQUESTED"
  | "REJECTED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";
export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type AiLevel = "beginner" | "intermediate" | "advanced";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  image?: string | null;
  contactNumber?: string | null;
  address?: string | null;
  bio?: string | null;
  role: UserRole;
  emailVerified: boolean;
  isBlocked?: boolean;
  createdAt?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  iconUrl?: string | null;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  previewVideoUrl?: string | null;
  price: number;
  level: CourseLevel;
  status: CourseStatus;
  durationInHours: number;
  totalLessons: number;
  averageRating: number;
  totalReviews: number;
  totalEnrollments: number;
  enrollmentCount?: number;
  categoryId: string;
  instructorId: string;
  createdAt: string;
  category?: Category;
  instructor?: Pick<AuthUser, "id" | "name" | "email" | "avatarUrl" | "image" | "bio" | "role">;
  modules?: {
    id: string;
    title: string;
    description?: string | null;
    order: number;
    lessons: {
      id: string;
      title: string;
      content: string;
      videoUrl?: string | null;
      resourceUrl?: string | null;
      order: number;
      isPreview: boolean;
    }[];
  }[];
  reviews?: {
    id: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
    user: Pick<AuthUser, "id" | "name" | "email" | "avatarUrl" | "image" | "role">;
  }[];
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail?: string | null;
  tags: string[];
  published: boolean;
  createdAt: string;
  author?: Pick<AuthUser, "id" | "name" | "email" | "avatarUrl" | "image" | "role">;
};

export type DashboardMetric = {
  label: string;
  value: number | string;
};

export type CourseModule = {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  courseId: string;
  createdAt?: string;
  updatedAt?: string;
  lessonCount?: number;
  course?: Pick<Course, "id" | "title" | "slug" | "instructorId">;
};

export type Lesson = {
  id: string;
  title: string;
  content: string;
  videoUrl?: string | null;
  resourceUrl?: string | null;
  order: number;
  isPreview: boolean;
  moduleId: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Enrollment = {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  course?: Course;
};

export type Assignment = {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate?: string | null;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt: string;
  course?: Course;
  submissionCount?: number;
};

export type Submission = {
  id: string;
  assignmentId: string;
  studentId: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  notes?: string | null;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
  assignment?: Assignment;
  student?: AuthUser;
  review?: SubmissionReview | null;
};

export type SubmissionReview = {
  id: string;
  submissionId: string;
  reviewerId: string;
  feedback: string;
  score?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CourseReview = {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: Pick<AuthUser, "id" | "name" | "email" | "avatarUrl" | "image" | "role">;
};

export type SupportTicket = {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  user?: AuthUser;
  messages?: SupportMessage[];
};

export type SupportMessage = {
  id: string;
  ticketId: string;
  senderId: string;
  message: string;
  createdAt: string;
  sender?: AuthUser;
};

export type AiRequestLog = {
  id: string;
  userId?: string | null;
  feature: string;
  prompt: string;
  response?: unknown;
  status: "SUCCESS" | "FAILED";
  error?: string | null;
  createdAt: string;
  user?: Pick<AuthUser, "id" | "name" | "email" | "role"> | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthPayload = {
  accessToken: string;
  refreshToken?: string;
  user: AuthUser;
};

export type SupportTicketPayload = {
  subject: string;
  message: string;
  priority?: TicketPriority;
};

export type RoadmapPayload = {
  goal: string;
  level: AiLevel;
  weeklyHours: number;
};

export type UpdateProfilePayload = {
  name?: string;
  contactNumber?: string;
  address?: string;
  bio?: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type VerifyEmailPayload = {
  email: string;
  otp: string;
};

export type ForgetPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
};

export type CreateCategoryPayload = {
  name: string;
  description?: string;
  iconUrl?: string;
};

export type CreateCoursePayload = {
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  previewVideoUrl?: string;
  price?: number;
  level: CourseLevel;
  status?: CourseStatus;
  durationInHours?: number;
  categoryId: string;
  instructorId?: string;
};

export type CreateCourseModulePayload = {
  title: string;
  description?: string;
  order: number;
  courseId: string;
};

export type CreateLessonPayload = {
  title: string;
  content: string;
  videoUrl?: string;
  resourceUrl?: string;
  order: number;
  isPreview?: boolean;
  moduleId: string;
};

export type CreateAssignmentPayload = {
  title: string;
  description: string;
  courseId: string;
  dueDate?: string;
  status?: AssignmentStatus;
};

export type CreateSubmissionPayload = {
  assignmentId: string;
  githubUrl?: string;
  liveUrl?: string;
  notes?: string;
};

export type CreateSubmissionReviewPayload = {
  feedback: string;
  score?: number;
  submissionStatus: SubmissionStatus;
};

export type CreateCourseReviewPayload = {
  rating: number;
  comment?: string;
};

export type CreateBlogPayload = {
  title: string;
  excerpt: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  published?: boolean;
};

export type CourseSummaryPayload = {
  courseId: string;
};

export type StudyChatPayload = {
  message: string;
  courseId?: string;
  lessonId?: string;
};

export type RecommendationPayload = {
  interest?: string;
};

export type AssignmentFeedbackPayload = {
  submissionId?: string;
  githubUrl?: string;
  liveUrl?: string;
  notes?: string;
};

export type BlogGeneratorPayload = {
  topic: string;
  tone?: string;
  targetAudience?: string;
};

export type SkillGapPayload = {
  targetRole: string;
  currentSkills: string[];
};

export type ProjectRecommendationPayload = {
  role: string;
  level: AiLevel;
  skills: string[];
};

export type CareerChatPayload = {
  message: string;
  context?: {
    goal?: string;
    level?: AiLevel;
    currentSkills?: string[];
  };
};

type FetchOptions = RequestInit & {
  token?: string | null;
  query?: Record<string, string | number | boolean | undefined>;
  skipAuthRefresh?: boolean;
};

const buildUrl = (path: string, query?: FetchOptions["query"]) => {
  const apiBaseUrl =
    typeof window === "undefined"
      ? env.NEXT_PUBLIC_API_BASE_URL
      : `${window.location.origin}/api/v1`;
  const url = new URL(`${apiBaseUrl.replace(/\/+$/, "")}${path}`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

const apiRootUrl = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/api\/v1\/?$/, "");

const jsonBody = (payload: unknown) => JSON.stringify(payload);

export async function apiFetch<T>(
  path: string,
  { token, query, headers, skipAuthRefresh, ...options }: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const accessToken = token ?? getStoredToken();
  const response = await fetch(buildUrl(path, query), {
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    credentials: "include",
    cache: options.cache ?? "no-store",
  });

  const result = (await response.json()) as ApiResponse<T>;

  if (response.status === 401 && !skipAuthRefresh && typeof window !== "undefined") {
    try {
      const refreshed = await apiFetch<{ accessToken: string }>("/auth/refresh-token", {
        method: "POST",
        skipAuthRefresh: true,
      });
      setStoredToken(refreshed.data.accessToken);

      return apiFetch<T>(path, {
        ...options,
        query,
        headers,
        skipAuthRefresh: true,
      });
    } catch {
      clearStoredToken();
    }
  }

  if (!response.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result;
}

export const publicApi = {
  health: async () => {
    const response = await fetch(`${apiRootUrl}/health`, { cache: "no-store" });
    const result = (await response.json()) as Omit<ApiResponse<null>, "data"> & { data?: null };

    if (!response.ok) {
      throw new Error(result.message || "Health check failed");
    }

    return result;
  },
  courses: (query?: FetchOptions["query"]) => apiFetch<Course[]>("/courses", { query }),
  featuredCourses: () => apiFetch<Course[]>("/courses/featured"),
  courseBySlug: (slug: string) => apiFetch<Course>(`/courses/${slug}`),
  categories: () => apiFetch<Category[]>("/categories"),
  blogs: () => apiFetch<Blog[]>("/blogs"),
  blogBySlug: (slug: string) => apiFetch<Blog>(`/blogs/${slug}`),
  courseReviews: (courseId: string) => apiFetch<CourseReview[]>(`/courses/${courseId}/reviews`),
};

export const authApi = {
  login: (payload: LoginPayload) =>
    apiFetch<AuthPayload>("/auth/login", {
      method: "POST",
      body: jsonBody(payload),
    }),
  register: (payload: RegisterPayload) =>
    apiFetch<AuthPayload>("/auth/register", {
      method: "POST",
      body: jsonBody(payload),
    }),
  me: () => apiFetch<AuthUser>("/auth/me"),
  usersMe: () => apiFetch<AuthUser>("/auth/users/me"),
  refreshToken: () =>
    apiFetch<{ accessToken: string }>("/auth/refresh-token", {
      method: "POST",
    }),
  logout: () =>
    apiFetch<null>("/auth/logout", {
      method: "POST",
    }),
  changePassword: (payload: ChangePasswordPayload) =>
    apiFetch<null>("/auth/change-password", {
      method: "POST",
      body: jsonBody(payload),
    }),
  verifyEmail: (payload: VerifyEmailPayload) =>
    apiFetch<AuthUser>("/auth/verify-email", {
      method: "POST",
      body: jsonBody(payload),
    }),
  forgetPassword: (payload: ForgetPasswordPayload) =>
    apiFetch<{ otp: string | null }>("/auth/forget-password", {
      method: "POST",
      body: jsonBody(payload),
    }),
  resetPassword: (payload: ResetPasswordPayload) =>
    apiFetch<null>("/auth/reset-password", {
      method: "POST",
      body: jsonBody(payload),
    }),
  googleLoginUrl: (callbackURL?: string) =>
    `${apiRootUrl}/api/v1/auth/google${
      callbackURL ? `?callbackURL=${encodeURIComponent(callbackURL)}` : ""
    }`,
  googleLoginAliasUrl: (callbackURL?: string) =>
    `${apiRootUrl}/api/v1/auth/login/google${
      callbackURL ? `?callbackURL=${encodeURIComponent(callbackURL)}` : ""
    }`,
  googleSuccess: () => apiFetch<null>("/auth/google/success"),
};

export const userApi = {
  list: (query?: ApiListQuery) => apiFetch<AuthUser[]>("/users", { query }),
  me: () => apiFetch<AuthUser>("/users/me"),
  updateProfile: (payload: UpdateProfilePayload) =>
    apiFetch<AuthUser>("/users/me", {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  changeRole: (id: string, role: UserRole) =>
    apiFetch<AuthUser>(`/users/${id}/role`, {
      method: "PATCH",
      body: jsonBody({ role }),
    }),
  block: (id: string, isBlocked: boolean) =>
    apiFetch<AuthUser>(`/users/${id}/block`, {
      method: "PATCH",
      body: jsonBody({ isBlocked }),
    }),
};

export const categoryApi = {
  create: (payload: CreateCategoryPayload) =>
    apiFetch<Category>("/categories", {
      method: "POST",
      body: jsonBody(payload),
    }),
  list: () => apiFetch<Category[]>("/categories"),
  byId: (id: string) => apiFetch<Category>(`/categories/${id}`),
  update: (id: string, payload: Partial<CreateCategoryPayload>) =>
    apiFetch<Category>(`/categories/${id}`, {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  delete: (id: string) =>
    apiFetch<null>(`/categories/${id}`, {
      method: "DELETE",
    }),
};

export const courseApi = {
  create: (payload: CreateCoursePayload) =>
    apiFetch<Course>("/courses", {
      method: "POST",
      body: jsonBody(payload),
    }),
  list: (query?: ApiListQuery) => apiFetch<Course[]>("/courses", { query }),
  featured: () => apiFetch<Course[]>("/courses/featured"),
  related: (courseId: string, query?: ApiListQuery) =>
    apiFetch<Course[]>(`/courses/related/${courseId}`, { query }),
  bySlug: (slug: string) => apiFetch<Course>(`/courses/${slug}`),
  update: (id: string, payload: Partial<CreateCoursePayload>) =>
    apiFetch<Course>(`/courses/${id}`, {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  delete: (id: string) =>
    apiFetch<null>(`/courses/${id}`, {
      method: "DELETE",
    }),
};

export const courseModuleApi = {
  create: (payload: CreateCourseModulePayload) =>
    apiFetch<CourseModule>("/course-modules", {
      method: "POST",
      body: jsonBody(payload),
    }),
  update: (id: string, payload: Partial<CreateCourseModulePayload>) =>
    apiFetch<CourseModule>(`/course-modules/${id}`, {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  delete: (id: string) =>
    apiFetch<null>(`/course-modules/${id}`, {
      method: "DELETE",
    }),
};

export const lessonApi = {
  create: (payload: CreateLessonPayload) =>
    apiFetch<Lesson>("/lessons", {
      method: "POST",
      body: jsonBody(payload),
    }),
  update: (id: string, payload: Partial<CreateLessonPayload>) =>
    apiFetch<Lesson>(`/lessons/${id}`, {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  delete: (id: string) =>
    apiFetch<null>(`/lessons/${id}`, {
      method: "DELETE",
    }),
  complete: (id: string) =>
    apiFetch<{ completed: boolean; courseProgress: number }>(`/lessons/${id}/complete`, {
      method: "PATCH",
    }),
};

export const dashboardApi = {
  student: () => apiFetch<unknown>("/dashboard/student"),
  instructor: () => apiFetch<unknown>("/dashboard/instructor"),
  admin: () => apiFetch<unknown>("/dashboard/admin"),
};

export const enrollmentApi = {
  enroll: (courseId: string) =>
    apiFetch<Enrollment>(`/enrollments/${courseId}`, {
      method: "POST",
    }),
  myClasses: () => apiFetch<Enrollment[]>("/enrollments/my-classes"),
  byId: (id: string) => apiFetch<Enrollment>(`/enrollments/${id}`),
  updateProgress: (id: string, progress: number) =>
    apiFetch<Enrollment>(`/enrollments/${id}/progress`, {
      method: "PATCH",
      body: jsonBody({ progress }),
    }),
};

export const assignmentApi = {
  create: (payload: CreateAssignmentPayload) =>
    apiFetch<Assignment>("/assignments", {
      method: "POST",
      body: jsonBody(payload),
    }),
  list: (query?: ApiListQuery) => apiFetch<Assignment[]>("/assignments", { query }),
  byId: (id: string) => apiFetch<Assignment>(`/assignments/${id}`),
  update: (id: string, payload: Partial<CreateAssignmentPayload>) =>
    apiFetch<Assignment>(`/assignments/${id}`, {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  delete: (id: string) =>
    apiFetch<null>(`/assignments/${id}`, {
      method: "DELETE",
    }),
};

export const submissionApi = {
  create: (payload: CreateSubmissionPayload) =>
    apiFetch<Submission>("/submissions", {
      method: "POST",
      body: jsonBody(payload),
    }),
  mySubmissions: () => apiFetch<Submission[]>("/submissions/my-submissions"),
  pending: (query?: ApiListQuery) => apiFetch<Submission[]>("/submissions/pending", { query }),
  byId: (id: string) => apiFetch<Submission>(`/submissions/${id}`),
  updateStatus: (id: string, status: SubmissionStatus) =>
    apiFetch<Submission>(`/submissions/${id}/status`, {
      method: "PATCH",
      body: jsonBody({ status }),
    }),
};

export const reviewApi = {
  createSubmissionReview: (submissionId: string, payload: CreateSubmissionReviewPayload) =>
    apiFetch<SubmissionReview>(`/submissions/${submissionId}/review`, {
      method: "POST",
      body: jsonBody(payload),
    }),
  updateSubmissionReview: (id: string, payload: Partial<CreateSubmissionReviewPayload>) =>
    apiFetch<SubmissionReview>(`/reviews/${id}`, {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  submissionReviewById: (id: string) => apiFetch<SubmissionReview>(`/reviews/${id}`),
};

export const courseReviewApi = {
  create: (courseId: string, payload: CreateCourseReviewPayload) =>
    apiFetch<CourseReview>(`/courses/${courseId}/reviews`, {
      method: "POST",
      body: jsonBody(payload),
    }),
  list: (courseId: string) => apiFetch<CourseReview[]>(`/courses/${courseId}/reviews`),
  update: (id: string, payload: Partial<CreateCourseReviewPayload>) =>
    apiFetch<CourseReview>(`/course-reviews/${id}`, {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  delete: (id: string) =>
    apiFetch<null>(`/course-reviews/${id}`, {
      method: "DELETE",
    }),
};

export const blogApi = {
  create: (payload: CreateBlogPayload) =>
    apiFetch<Blog>("/blogs", {
      method: "POST",
      body: jsonBody(payload),
    }),
  list: (query?: ApiListQuery) => apiFetch<Blog[]>("/blogs", { query }),
  bySlug: (slug: string) => apiFetch<Blog>(`/blogs/${slug}`),
  update: (id: string, payload: Partial<CreateBlogPayload>) =>
    apiFetch<Blog>(`/blogs/${id}`, {
      method: "PATCH",
      body: jsonBody(payload),
    }),
  delete: (id: string) =>
    apiFetch<null>(`/blogs/${id}`, {
      method: "DELETE",
    }),
};

export const supportApi = {
  createTicket: (payload: SupportTicketPayload) =>
    apiFetch<SupportTicket>("/support/tickets", {
      method: "POST",
      body: jsonBody(payload),
    }),
  tickets: (query?: ApiListQuery) => apiFetch<SupportTicket[]>("/support/tickets", { query }),
  ticketById: (id: string) => apiFetch<SupportTicket>(`/support/tickets/${id}`),
  updateTicketStatus: (id: string, status: TicketStatus) =>
    apiFetch<SupportTicket>(`/support/tickets/${id}/status`, {
      method: "PATCH",
      body: jsonBody({ status }),
    }),
  createReply: (id: string, message: string) =>
    apiFetch<SupportMessage>(`/support/tickets/${id}/replies`, {
      method: "POST",
      body: jsonBody({ message }),
    }),
};

export const aiApi = {
  courseSummary: (payload: CourseSummaryPayload) =>
    apiFetch<unknown>("/ai/course-summary", {
      method: "POST",
      body: jsonBody(payload),
    }),
  chat: (payload: CareerChatPayload) =>
    apiFetch<unknown>("/ai/chat", {
      method: "POST",
      body: jsonBody(payload),
    }),
  roadmap: (payload: RoadmapPayload) =>
    apiFetch<unknown>("/ai/roadmap", {
      method: "POST",
      body: jsonBody(payload),
    }),
  skillGap: (payload: SkillGapPayload) =>
    apiFetch<unknown>("/ai/skill-gap", {
      method: "POST",
      body: jsonBody(payload),
    }),
  projectRecommendations: (payload: ProjectRecommendationPayload) =>
    apiFetch<unknown>("/ai/project-recommendations", {
      method: "POST",
      body: jsonBody(payload),
    }),
  studyChat: (payload: StudyChatPayload) =>
    apiFetch<unknown>("/ai/study-chat", {
      method: "POST",
      body: jsonBody(payload),
    }),
  recommendations: (payload: RecommendationPayload = {}) =>
    apiFetch<unknown>("/ai/recommendations", {
      method: "POST",
      body: jsonBody(payload),
    }),
  assignmentFeedback: (payload: AssignmentFeedbackPayload) =>
    apiFetch<unknown>("/ai/assignment-feedback", {
      method: "POST",
      body: jsonBody(payload),
    }),
  blogGenerator: (payload: BlogGeneratorPayload) =>
    apiFetch<unknown>("/ai/blog-generator", {
      method: "POST",
      body: jsonBody(payload),
    }),
  roadmapGenerator: (payload: RoadmapPayload) =>
    apiFetch<unknown>("/ai/roadmap-generator", {
      method: "POST",
      body: jsonBody(payload),
    }),
  skillGapAnalyzer: (payload: SkillGapPayload) =>
    apiFetch<unknown>("/ai/skill-gap-analyzer", {
      method: "POST",
      body: jsonBody(payload),
    }),
  projectRecommender: (payload: ProjectRecommendationPayload) =>
    apiFetch<unknown>("/ai/project-recommender", {
      method: "POST",
      body: jsonBody(payload),
    }),
  careerChat: (payload: CareerChatPayload) =>
    apiFetch<unknown>("/ai/career-chat", {
      method: "POST",
      body: jsonBody(payload),
    }),
  logs: (query?: ApiListQuery) => apiFetch<AiRequestLog[]>("/ai/logs", { query }),
};

export const getStoredToken = () =>
  getAccessToken();

export const setStoredToken = (token: string, role?: UserRole, refreshToken?: string) => {
  persistAuthSession({ accessToken: token, role, refreshToken });
};

export const clearStoredToken = () => {
  clearAuthSession();
};
