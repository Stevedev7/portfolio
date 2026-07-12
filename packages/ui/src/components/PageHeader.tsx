import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export const PageHeader = ({ eyebrow, title, action }: PageHeaderProps) => (
  <div className="mb-6 flex flex-col gap-3 border-b border-canvas-400 pb-4 dark:border-ink-700 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow && (
        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-500 dark:text-ink-300">{eyebrow}</p>
      )}
      <h1 className="text-2xl font-semibold text-ink-900 dark:text-canvas-100">{title}</h1>
    </div>
    {action}
  </div>
);
