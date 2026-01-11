import React from "react";
import type { Board } from "../../types/board";
import BoardCard from "./BoardCard";

interface Props {
  boards: Board[];
  onSelect: (id: string) => void;
}

const BoardList: React.FC<Props> = ({ boards, onSelect }) => {

  return (
    <div className="flex flex-col gap-3">
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default BoardList;