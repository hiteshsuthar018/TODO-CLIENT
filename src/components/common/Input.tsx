import React from "react";
import { useThemeStore } from "../../store/themeStore";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
   const isDark = useThemeStore((s) => s.isDark);

  return (
    <input
      {...props}
      className={`
        w-full px-3 py-2 rounded-lg border outline-none 
        transition-all duration-200 focus:ring-2 focus:ring-opacity-50
        text-sm sm:text-base
        ${isDark
          ? "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-500 focus:ring-emerald-500/30"
          : "bg-white border-gray-300 text-black focus:border-emerald-400 focus:ring-emerald-400/30"
        }
        ${className}
      `}
    />
  );
};

export default Input;