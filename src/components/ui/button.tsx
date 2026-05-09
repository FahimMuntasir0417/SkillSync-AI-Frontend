import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "soft";
type ButtonSize = "sm" | "md" | "lg" | "icon";

type SharedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonOwnProps = {
  asChild?: false;
} & SharedButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = {
  asChild: true;
  href: string;
  children: React.ReactNode;
  className?: string;
} & SharedButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonProps = ButtonOwnProps | ButtonLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_12px_30px_color-mix(in_srgb,var(--primary)_26%,transparent)] hover:-translate-y-0.5 hover:brightness-105",
  secondary:
    "bg-secondary text-secondary-foreground shadow-[0_12px_30px_color-mix(in_srgb,var(--secondary)_22%,transparent)] hover:-translate-y-0.5 hover:brightness-105",
  outline:
    "border border-border bg-surface/80 text-foreground shadow-sm hover:-translate-y-0.5 hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  danger: "bg-danger text-white shadow-[0_12px_30px_rgb(220_38_38_/_0.22)] hover:-translate-y-0.5 hover:brightness-105",
  soft: "bg-muted text-foreground hover:-translate-y-0.5 hover:bg-surface-strong",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const classNames = cn(
    "focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-card font-semibold transition duration-200 disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-55",
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
