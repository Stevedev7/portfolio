import { cn } from "../lib/cn";
import type { HTMLAttributes } from "react";

export const Card = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(`rounded-xl border border-border bg-surface`, className)} {...props} />
);
