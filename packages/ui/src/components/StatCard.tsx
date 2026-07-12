import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
}

export const StatCard = ({ icon: Icon, label, value }: StatCardProps) => (
  <div className="rounded-lg border border-canvas-400 bg-white p-5 dark:border-ink-700 dark:bg-ink-800">
    <div className="mb-3 flex items-center justify-between">
      <p className="font-mono text-xs uppercase tracking-wide text-ink-500 dark:text-ink-300">{label}</p>
      <Icon size={16} className="text-primary-600 dark:text-primary-400" />
    </div>
    <p className="text-3xl font-semibold text-ink-900 dark:text-canvas-100">{value}</p>
  </div>
);
