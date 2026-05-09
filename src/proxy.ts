import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/admin",
  "/instructor",
  "/profile",
  "/settings",
  "/saved-roadmaps",
  "/ai",
  "/ai-chat",
  "/roadmap-generator",
  "/skill-gap-analyzer",
  "/project-recommender",
  "/my-classes",
  "/my-reviews",
  "/my-submissions",
  "/saved-courses",
  "/support-tickets",
  "/change-password",
];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const accessToken =
    request.cookies.get("skillsync_access_token")?.value ||
    request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
