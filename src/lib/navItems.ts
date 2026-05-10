import type { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, type UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        { title: "Home", href: "/", icon: "Home" },
        { title: "Dashboard", href: defaultDashboard, icon: "LayoutDashboard" },
        { title: "My Profile", href: "/profile", icon: "User" },
        { title: "Notifications", href: "/notifications", icon: "Bell" },
        { title: "Settings", href: "/settings", icon: "Settings" },
      ],
    },
    {
      title: "AI Workspace",
      icon: "Sparkles",
      items: [
        { title: "Course Summary", href: "/course-summary", icon: "BookOpen" },
        { title: "Study Assistant", href: "/study-chat", icon: "MessageSquare" },
        { title: "Recommendations", href: "/recommendations", icon: "WandSparkles" },
        { title: "Roadmap Generator", href: "/roadmap-generator", icon: "Route" },
        { title: "Skill Gap Analyzer", href: "/skill-gap-analyzer", icon: "Target" },
        { title: "Project Recommender", href: "/project-recommender", icon: "WandSparkles" },
        { title: "AI Chat Assistant", href: "/ai-chat", icon: "Bot" },
        { title: "Career Chat", href: "/career-chat", icon: "Bot" },
        { title: "Assignment Feedback", href: "/assignment-feedback", icon: "ClipboardList" },
        { title: "Blog Generator", href: "/blog-generator", icon: "Newspaper" },
        { title: "Saved Roadmaps", href: "/saved-roadmaps", icon: "FolderClock" },
      ],
    },
    {
      title: "Learning Activity",
      icon: "GraduationCap",
      items: [
        { title: "My Enrollments", href: "/my-enrollments", icon: "GraduationCap" },
        { title: "My Submissions", href: "/my-submissions", icon: "Send" },
        { title: "Course Reviews", href: "/course-reviews", icon: "MessageSquare" },
        { title: "Support Tickets", href: "/support-tickets", icon: "Ticket" },
        ...(role === "STUDENT"
          ? [{ title: "Instructor Request", href: "/promotion-requests", icon: "UserRoundPlus" }]
          : []),
        { title: "Change Password", href: "/change-password", icon: "KeyRound" },
      ],
    },
  ];
};

export const instructorNavItems: NavSection[] = [
  {
    title: "Instructor Workspace",
    icon: "BookOpen",
    items: [
      { title: "My Courses", href: "/instructor/dashboard/my-courses", icon: "BookOpen" },
      { title: "Modules", href: "/instructor/dashboard/course-modules", icon: "ClipboardList" },
      { title: "Lessons", href: "/instructor/dashboard/lessons", icon: "GraduationCap" },
      { title: "Assignments", href: "/instructor/dashboard/assignments", icon: "ClipboardList" },
      { title: "Reviews", href: "/instructor/dashboard/submissions", icon: "MessageSquare" },
      { title: "Blogs", href: "/instructor/dashboard/blogs", icon: "Newspaper" },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    icon: "Users",
    items: [
      { title: "Users", href: "/admin/dashboard/users-management", icon: "Users" },
      { title: "Instructor Requests", href: "/admin/dashboard/promotion-requests", icon: "UserRoundPlus" },
    ],
  },
  {
    title: "Platform Management",
    icon: "LayoutDashboard",
    items: [
      { title: "Categories", href: "/admin/dashboard/category-management", icon: "ClipboardList" },
      { title: "Courses", href: "/admin/dashboard/courses-management", icon: "BookOpen" },
      { title: "Course Reviews", href: "/admin/dashboard/course-reviews", icon: "MessageSquare" },
      { title: "Support", href: "/admin/dashboard/support-management", icon: "Ticket" },
      { title: "AI Logs", href: "/admin/dashboard/ai-logs", icon: "Bot" },
      { title: "Blogs", href: "/admin/dashboard/blog-management", icon: "Newspaper" },
    ],
  },
];

export const memberNavItems: NavSection[] = [
  {
    title: "Student Workspace",
    icon: "Compass",
    items: [
      { title: "Browse Courses", href: "/dashboard/browse-courses", icon: "Compass" },
      { title: "My Learning", href: "/dashboard/my-learning", icon: "GraduationCap" },
      { title: "Assignments", href: "/dashboard/assignments", icon: "ClipboardList" },
      { title: "Submissions", href: "/dashboard/submissions", icon: "Send" },
      { title: "Student AI Tools", href: "/dashboard/ai-tools", icon: "Sparkles" },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "INSTRUCTOR":
      return [...commonNavItems, ...instructorNavItems];
    case "STUDENT":
    default:
      return [...commonNavItems, ...memberNavItems];
  }
};
