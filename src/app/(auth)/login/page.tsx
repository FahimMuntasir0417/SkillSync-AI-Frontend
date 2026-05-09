import { LoginForm } from "@/features/auth/components/login-form";
import { AuthVisual } from "@/features/auth/components/auth-visual";

export default function LoginPage() {
  return (
    <main className="container-shell grid min-h-screen items-center gap-8 py-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="mx-auto w-full max-w-md lg:mx-0">
        <LoginForm />
      </div>
      <AuthVisual />
    </main>
  );
}
