import React from "react";
import Button from "../common/Button";
import DarkModeToggle from "../common/DarkModeToggle";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";

const Topbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <header
      className={`
        flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4 border-b
        ${isDark
          ? "bg-zinc-900/95 border-zinc-800 backdrop-blur-sm"
          : "bg-white/95 border-gray-200 backdrop-blur-sm"
        }
      `}
    >
      {/* User info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm lg:text-lg font-medium truncate">
          {user ? `Welcome, ${user.name}` : "Dashboard"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        <DarkModeToggle />
        <Button
          variant="secondary"
          onClick={logout}
          className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Topbar;