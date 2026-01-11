import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import BoardHeader from "../components/board/BoardHeader";
import TodoList from "../components/todo/TodoList";
import CreateTodoInput from "../components/todo/CreateTodoInput";
import EmptyState from "../components/common/EmptyState";

import { useBoardStore } from "../store/boardStore";
import { useTodoStore } from "../store/todoStore";

const Board: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    boards,
    updateBoard,
    deleteBoard,
  } = useBoardStore();

  const {
    todos,
    fetchTodos,
  } = useTodoStore();

  const board = boards.find((b) => b.id === id);

  useEffect(() => {
    if (!id) return;
    fetchTodos(id);
  }, [id]);

  const handleDeleteBoard = async () => {
    if (!id) return;
    await deleteBoard(id);
    navigate("/");
  };

  if (!board) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <EmptyState message="Board not found" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Board header */}
        <BoardHeader
          title={board.title}
          onUpdate={(title) => updateBoard(board.id, title)}
          onDelete={handleDeleteBoard}
        />

        {/* Create todo */}
        <CreateTodoInput
          boardId={board.id}
        />

        {/* Todos */}
        {todos.length === 0 ? (
          <div className="mt-8">
            <EmptyState message="No todos yet. Add one to get started" />
          </div>
        ) : (
          <TodoList
            todos={todos}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Board;