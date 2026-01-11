import React from "react";
import type { Todo } from "../../types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
}

const TodoList: React.FC<Props> = ({ todos }) => {

  return (
    <div className="flex flex-col gap-2 sm:gap-3 mt-4 max-h-125 sm:max-h-150  h-80 overflow-y-auto pr-1">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;