import type { InputHTMLAttributes } from "react";
import React from 'react';
type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`w-full rounded border px-3 py-2 text-sm ${className}`}
      {...props}
    />
  );
};
