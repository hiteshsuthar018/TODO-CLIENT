import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useThemeStore } from "../../store/themeStore";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const isDark = useThemeStore((s) => s.isDark);
  const location = useLocation();
  
  // Check if we're viewing a board
  const isBoardView = location.pathname.startsWith("/boards/");

  return (
    <div
      className={`
        min-h-screen flex flex-col lg:flex-row
        ${isDark ? "bg-black text-white" : "bg-gray-50 text-black"}
      `}
    >

      <div className={`${isBoardView ? 'hidden lg:block' : 'block'} lg:w-80 xl:w-96`}>
        <Sidebar />
      </div>

      {/* Main content  */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-4 lg:p-6 xl:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;