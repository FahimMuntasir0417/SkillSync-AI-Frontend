import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonOwnProps = {
  asChild?: false;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "icon";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = {
  asChild: true;
  href: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
  className?: string;
};

type ButtonProps = ButtonOwnProps | ButtonLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  outline: "border border-border bg-surface text-foreground hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const classNames = cn(
    "focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-card font-semibold transition disabled:pointer-events-none disabled:opacity-55",
    variantClasses[variant],
    sizeClasses[size],
    props.className,
  );

  if (props.asChild) {
    const {
      asChild,
      variant: _variant,
      size: _size,
      className: _className,
      ...linkProps
    } = props;
    void asChild;
    void _variant;
    void _size;
    void _className;

    return <Link className={classNames} {...linkProps} />;
  }

  const {
    asChild,
    variant: _variant,
    size: _size,
    className: _className,
    type = "button",
    ...buttonProps
  } = props;
  void asChild;
  void _variant;
  void _size;
  void _className;

  return <button type={type} className={classNames} {...buttonProps} />;
}
