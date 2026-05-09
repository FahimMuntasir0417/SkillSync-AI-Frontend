export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";

export function normalizeUserRole(role?: string | null): UserRole {
  const normalized = role?.toUpperCase();

  if (normalized === "ADMIN" || normalized === "SUPER_ADMIN" || normalized === "INSTRUCTOR") {
    return normalized;
  }

  return "STUDENT";
}

export function getDefaultDashboardRoute(role?: string | null): string {
  switch (normalizeUserRole(role)) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return "/admin/dashboard";
    case "INSTRUCTOR":
      return "/instructor/dashboard";
    case "STUDENT":
    default:
      return "/dashboard";
  }
}
