import React from "react";
import { useThemeStore } from "../../store/themeStore";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const isDark = useThemeStore((s) => s.isDark);

  const base =
    "px-3 sm:px-4 py-1.5 sm:py-2 rounded font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base";

  const styles =
    variant === "primary"
      ? isDark
        ? "bg-white text-black hover:bg-gray-200 active:bg-gray-300 shadow hover:shadow-md"
        : "bg-black text-white hover:bg-gray-800 active:bg-gray-900 shadow hover:shadow-md"
      : isDark
      ? "border border-zinc-700 text-white hover:bg-zinc-800 active:bg-zinc-900"
      : "border border-gray-300 text-gray-800 hover:bg-gray-100 active:bg-gray-200";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;