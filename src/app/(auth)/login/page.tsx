import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="container-shell grid min-h-screen place-items-center py-10">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
