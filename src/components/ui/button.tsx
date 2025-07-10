import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "default" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

export function Button({
  children,
  className = "",
  variant = "default",
  ...props
}: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded font-semibold transition duration-200";

  const variants: Record<ButtonVariant, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-white text-white hover:bg-white hover:text-black",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
