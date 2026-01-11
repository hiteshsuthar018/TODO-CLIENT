import React from "react";
import { useThemeStore } from "../../store/themeStore";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
   const isDark = useThemeStore((s) => s.isDark);

  return (
    <div
      className={`
        text-center py-8 sm:py-12 px-4
        ${isDark ? "text-gray-400" : "text-gray-600"}
      `}
    >
      <p className="text-sm sm:text-base">{message}</p>
    </div>
  );
};

export default EmptyState;