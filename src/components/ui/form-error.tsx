import { AlertCircle } from "lucide-react";

type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="flex items-center gap-1.5 text-sm font-medium text-danger">
      <AlertCircle className="size-3.5" />
      {message}
    </p>
  );
}
