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
    <div className="rounded-full bg-surface p-3">
      <Icon size={20} className="text-text-faint" />
    </div>
    <div>
      <p className="font-medium text-text">{title}</p>
      <p className="text-sm text-text-faint">{description}</p>
    </div>
    {action}
  </div>
);
