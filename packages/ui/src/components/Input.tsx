import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`w-full rounded border border-canvas-400 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-ink-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 dark:border-ink-700 dark:bg-ink-800 dark:text-canvas-100 dark:placeholder:text-ink-400 ${className}`}
      {...props}
    />
  );
};
