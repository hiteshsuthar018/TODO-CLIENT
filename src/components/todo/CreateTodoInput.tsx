import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useTodoStore } from "../../store/todoStore";
import { useThemeStore } from "../../store/themeStore";

interface Props {
  boardId: string;
}

const CreateTodoInput: React.FC<Props> = ({ boardId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createTodo, loading } = useTodoStore();
  const isDark = useThemeStore((s) => s.isDark);

  const handleCreate = async () => {
    if (!title.trim()) return;

    await createTodo({
      title,
      description,
      boardId,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div
      className={`
        flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border
        ${isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-gray-200"}
        shadow-sm
      `}
    >
      <Input
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-sm sm:text-base"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className={`
          w-full px-3 py-2 rounded-lg border outline-none text-sm sm:text-base
          transition-colors duration-200 resize-none
          ${isDark
            ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-emerald-500"
            : "bg-white border-gray-300 text-black placeholder:text-gray-400 focus:border-emerald-400"
          }
        `}
      />

      <Button 
        onClick={handleCreate} 
        disabled={loading}
        className="text-sm sm:text-base"
      >
        {loading ? "Adding..." : "Add Todo"}
      </Button>
    </div>
  );
};

export default CreateTodoInput;