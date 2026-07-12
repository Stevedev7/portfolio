import { Sun, Moon } from "lucide-react";
import React from 'react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => (
  <button
    onClick={onToggle}
    aria-label="Toggle theme"
    className="flex items-center justify-center rounded p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
  >
    {isDark ? <Sun size={16} /> : <Moon size={16} />}
  </button>
);
