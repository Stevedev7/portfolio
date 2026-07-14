import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={cn(
        `w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text placeholder:text-text-faint focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 `,
        className,
      )}
      {...props}
    />
  );
};
