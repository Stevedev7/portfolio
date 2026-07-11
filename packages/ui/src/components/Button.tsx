import React from 'react';
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export const Button = ({ variant = "primary", className = "", ...props }: ButtonProps) => {
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`rounded px-4 py-2 text-sm font-medium disabled:opacity-50 ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
};
