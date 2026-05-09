import type { HTMLAttributes } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type PageShellProps = HTMLAttributes<HTMLDivElement> & {
  contained?: boolean;
};

export function PageShell({ children, className, contained = true, ...props }: PageShellProps) {
  const content = (
    <div className={cn("grid gap-8 py-8 md:py-10", className)} {...props}>
      {children}
    </div>
  );

  if (!contained) {
    return content;
  }

  return <Container>{content}</Container>;
}
