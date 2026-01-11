import React from "react";
import { useThemeStore } from "../../store/themeStore";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
   const isDark = useThemeStore((s) => s.isDark);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50">
      <div
        className={`
          w-full max-w-md rounded-lg p-4 sm:p-6
          ${isDark ? "bg-zinc-900 text-white" : "bg-white text-gray-900"}
          border ${isDark ? "border-zinc-800" : "border-gray-200"}
          shadow-xl
        `}
      >
        {title && (
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{title}</h2>
        )}

        {children}

        <div className="mt-4 sm:mt-6 text-right">
          <button
            onClick={onClose}
            className={`
              text-sm sm:text-base px-3 py-1.5 rounded transition
              ${isDark 
                ? "text-gray-400 hover:text-white hover:bg-zinc-800" 
                : "text-gray-600 hover:text-black hover:bg-gray-100"
              }
            `}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;