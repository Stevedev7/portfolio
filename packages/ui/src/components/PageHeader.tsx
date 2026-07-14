import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}

export const PageHeader = ({ eyebrow, title, action }: PageHeaderProps) => (
  <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {eyebrow && (
        <p className="mb-1 font-mono text-[11px] uppercase tracking-wide text-text-faint">{eyebrow}</p>
      )}
      <h1 className="text-xl font-semibold text-text">{title}</h1>
    </div>
    {action}
  </div>
);
