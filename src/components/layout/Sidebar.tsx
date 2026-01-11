import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BoardList from "../board/BoardList";
import Button from "../common/Button";
import CreateBoardModal from "../board/CreateBoardModal";
import { useThemeStore } from "../../store/themeStore";
import { useBoardStore } from "../../store/boardStore";

const Sidebar: React.FC = () => {
  const isDark = useThemeStore((s) => s.isDark);
  const navigate = useNavigate();

  const { boards, createBoard, fetchBoards } = useBoardStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <aside
      className={`
        w-full h-full p-4 border-r overflow-y-auto
        ${isDark
          ? "bg-zinc-900 border-zinc-800"
          : "bg-white border-gray-200"
        }
      `}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">Todo Boards</h2>
        <p className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
          Organize your tasks efficiently
        </p>
      </div>

      <Button
        className="w-full mb-6 py-2.5 hover:scale-[1.02] transition-transform"
        onClick={() => setOpen(true)}
      >
        <span className="text-lg mr-2">+</span> Create New Board
      </Button>

      {boards && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold opacity-90">Your Boards</h3>
            <span className={`text-xs px-2 py-1 rounded-full 
              ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-gray-100 text-gray-600"}`}>
              {boards.length} {boards.length === 1 ? 'board' : 'boards'}
            </span>
          </div>

          {boards.length > 0 ? (
            <div className="space-y-3">
              <BoardList
                boards={boards}
                onSelect={(id) => navigate(`/boards/${id}`)}
              />
            </div>
          ) : (
            <div className={`text-center py-8 rounded-lg ${isDark ? "bg-zinc-800/50" : "bg-gray-50"}`}>
              <p className={`text-sm ${isDark ? "text-zinc-400" : "text-gray-500"}`}>
                No boards yet. Create your first board!
              </p>
            </div>
          )}
        </div>
      )}

      <CreateBoardModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={createBoard}
      />
    </aside>
  );
};

export default Sidebar;