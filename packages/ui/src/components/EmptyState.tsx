import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
    <div className="rounded-full bg-canvas-100 p-3 dark:bg-ink-700">
      <Icon size={20} className="text-ink-500 dark:text-ink-300" />
    </div>
    <div>
      <p className="font-medium text-ink-900 dark:text-canvas-100">{title}</p>
      <p className="text-sm text-ink-500 dark:text-ink-300">{description}</p>
    </div>
    {action}
  </div>
);
