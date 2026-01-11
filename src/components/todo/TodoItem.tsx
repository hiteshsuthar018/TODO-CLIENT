import React, { useState } from "react";
import type { Todo } from "../../types/todo";
import Button from "../common/Button";
import Input from "../common/Input";
import { useTodoStore } from "../../store/todoStore";
import { useThemeStore } from "../../store/themeStore";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodoStore();
  const isDark = useThemeStore((s) => s.isDark);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const handleSave = async () => {
    if (!title.trim()) return;

    await updateTodo(todo.id, { title, description });
    setEditing(false);
  };

  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all duration-200
        ${isDark 
          ? "bg-zinc-800/90 border-zinc-700 hover:bg-zinc-800/95 text-white" 
          : "bg-white border-gray-200 hover:bg-gray-50/95 text-gray-800"
        }
        ${todo.completed ? "opacity-80" : "opacity-100"}
        shadow-sm hover:shadow-md
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="flex items-start pt-1">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
              className={`
                w-5 h-5 rounded cursor-pointer transition-all duration-200
                appearance-none border-2
                ${isDark 
                  ? "border-zinc-500 checked:bg-emerald-500 checked:border-emerald-500" 
                  : "border-gray-300 checked:bg-emerald-400 checked:border-emerald-400"
                }
                checked:after:content-['✓'] checked:after:text-white checked:after:absolute
                checked:after:flex checked:after:items-center checked:after:justify-center
                checked:after:text-sm checked:after:font-bold
              `}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full font-medium ${
                  isDark 
                    ? "bg-zinc-700 border-zinc-600 focus:border-emerald-500" 
                    : "bg-gray-50 border-gray-300 focus:border-emerald-400"
                }`}
                autoFocus
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                rows={2}
                className={`
                  w-full px-3 py-2 rounded-lg border outline-none text-sm
                  transition-colors duration-200 resize-none
                  ${isDark
                    ? "bg-zinc-700 border-zinc-600 placeholder:text-zinc-400 text-white focus:border-emerald-500"
                    : "bg-gray-50 border-gray-300 placeholder:text-gray-400 text-gray-800 focus:border-emerald-400"
                  }
                `}
              />
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`
                    font-medium text-base wrap-break-words
                    ${todo.completed 
                      ? "line-through opacity-60" 
                      : ""
                    }
                  `}
                >
                  {todo.title}
                </span>
                {todo.completed && (
                  <span className={`
                    px-2 py-0.5 text-xs font-medium rounded-full
                    ${isDark 
                      ? "bg-emerald-900/30 text-emerald-300" 
                      : "bg-emerald-100 text-emerald-700"
                    }
                  `}>
                    Completed
                  </span>
                )}
              </div>
              
              {todo.description && (
                <p className={`
                  text-sm wrap-break-words mt-1
                  ${isDark ? "text-zinc-300" : "text-gray-600"}
                  ${todo.completed ? "opacity-50" : ""}
                `}>
                  {todo.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 ml-2">
          {editing ? (
            <>
              <Button 
                onClick={handleSave}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm"
              >
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={() => setEditing(false)}
                className={`
                  px-4 py-1.5 font-medium text-sm
                  ${isDark
                    ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }
                `}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setEditing(true)}
                className={`
                  px-3 py-1.5 font-medium text-sm
                  ${isDark
                    ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }
                `}
              >
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={() => deleteTodo(todo.id)}
                className={`
                  px-3 py-1.5 font-medium text-sm
                  ${isDark
                    ? "bg-zinc-700 hover:bg-red-900/30 text-red-400 hover:text-red-300"
                    : "bg-gray-100 hover:bg-red-50 text-red-600 hover:text-red-700"
                  }
                `}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Status indicator */}
      {!editing && (
        <div className="mt-2 pt-2 border-t border-gray-200/50 dark:border-zinc-700/50">
          <div className="flex items-center justify-between text-xs">
            <span className={`
              ${isDark ? "text-zinc-400" : "text-gray-500"}
            `}>
              {todo.completed ? "Completed" : "In progress"}
            </span>
            <span className={`
              ${isDark ? "text-zinc-400" : "text-gray-500"}
            `}>
              Updated: {new Date(todo.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;