import React from "react";
import type { Board } from "../../types/board";
import { useThemeStore } from "../../store/themeStore";

interface Props {
  board: Board;
  onSelect: (id: string) => void;
}

const BoardCard: React.FC<Props> = ({ board, onSelect }) => {
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <div
      onClick={() => onSelect(board.id)}
      className={`
        p-4 rounded-xl cursor-pointer transition-all duration-300
        border hover:scale-[1.02] active:scale-[0.99]
        ${isDark
          ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 hover:border-zinc-600"
          : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200 hover:border-gray-300"
        }
        shadow-sm hover:shadow-lg
        group
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base lg:text-lg truncate group-hover:text-emerald-500 transition-colors">
            {board.title}
          </h3>

        </div>
        {/* <div className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${isDark ? "bg-zinc-700 text-zinc-300" : "bg-gray-100 text-gray-600"}`}>
          {board.todoCount || 0}
        </div> */}
      </div>
    </div>
  );
};

export default BoardCard;