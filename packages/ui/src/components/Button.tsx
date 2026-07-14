import { cn } from "../lib/cn";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};


export const Button = ({ variant = "primary", className = "", ...props }: ButtonProps) => {
  const variantStyles = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white border border-transparent",
    secondary: "bg-surface hover:bg-border text-text border border-border",
    danger: "bg-transparent hover:bg-primary-600 hover:text-white text-primary-400 border border-primary-700",
  };

  return (
    <button
      className={cn("rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50", variantStyles[variant], className)}
      {...props}
    />
  );
};
