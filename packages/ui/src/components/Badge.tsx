import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary";
}

export const Badge = ({ children, variant = "default" }: BadgeProps) => {
  const styles = {
    default: "bg-canvas-100 text-ink-500 dark:bg-ink-700 dark:text-ink-300",
    primary: "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
};
