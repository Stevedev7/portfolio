import type { HTMLAttributes } from "react";

export const Card = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-lg border border-canvas-400 bg-white dark:border-ink-700 dark:bg-ink-800 ${className}`} {...props} />
);
