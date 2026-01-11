import React from "react";
import { useThemeStore } from "../../store/themeStore";

const Loader: React.FC = () => {
   const isDark = useThemeStore((s) => s.isDark);

  return (
    <div className="flex justify-center items-center py-6">
      <div
        className={`
          h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-2 border-t-transparent
          ${isDark ? "border-white" : "border-black"}
        `}
      />
    </div>
  );
};

export default Loader;