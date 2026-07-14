import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
}

export const StatCard = ({ icon: Icon, label, value }: StatCardProps) => (
  <div className="rounded-xl border border-border bg-surface p-4">
    <div className="mb-5 flex items-center justify-between">
      <p className="font-mono text-[10px] uppercase tracking-wide text-text-faint">{label}</p>
      <div className="rounded-md bg-primary-950 p-1.5">
        <Icon size={13} className="text-primary-400" />
      </div>
    </div>
    <p className="text-2xl font-semibold text-text">{value}</p>
  </div>
);
