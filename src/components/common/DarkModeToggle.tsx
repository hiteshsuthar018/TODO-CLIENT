import React from "react";
import { useThemeStore } from "../../store/themeStore";
import Button from "./Button";

const DarkModeToggle: React.FC = () => {
   const isDark = useThemeStore((s) => s.isDark);
   const toggleDark = useThemeStore((s) => s.toggleTheme);

  return (
    <Button
      onClick={toggleDark}
      variant="secondary"
      className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
    >
      {isDark ? "🌙" : "☀️"}
    </Button>
  );
};

export default DarkModeToggle;