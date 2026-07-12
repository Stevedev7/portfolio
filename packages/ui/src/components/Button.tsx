import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export const Button = ({ variant = "primary", className = "", ...props }: ButtonProps) => {
  const variantStyles = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white border border-transparent",
    secondary:
      "bg-white hover:bg-canvas-100 text-ink-900 border border-canvas-400 dark:bg-ink-800 dark:text-canvas-100 dark:border-ink-700 dark:hover:bg-ink-700",
    danger:
      "bg-white hover:bg-primary-600 hover:text-white text-primary-600 border border-primary-600 dark:bg-ink-800",
  };

  return (
    <button
      className={`rounded px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
};
