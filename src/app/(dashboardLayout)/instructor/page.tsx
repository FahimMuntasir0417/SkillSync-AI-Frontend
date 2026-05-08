import { redirect } from "next/navigation";

export default function InstructorRedirectPage() {
  redirect("/instructor/dashboard");
}
