import type { ReactNode } from "react";
import { cn } from "../lib/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary";
}

export const Badge = ({ children, variant = "default" }: BadgeProps) => {
  const styles = {
    default: "bg-border text-text-muted",
    primary: "bg-primary-950 text-primary-400",
  };

  return (
    <span className={cn(`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium w-fit`,styles[variant])}>
      {children}
    </span>
  );
};
