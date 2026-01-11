import { create } from "zustand";
import type { Todo } from "../types/todo";
import {
  fetchTodosApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../api/todos";

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;

  fetchTodos: (boardId: string) => Promise<void>;
  createTodo: (data: {
    title: string;
    description?: string;
    boardId: string;
  }) => Promise<void>;
  updateTodo: (
    id: string,
    data: Partial<Todo>
  ) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async (boardId) => {
    set({ loading: true, error: null });

    try {
      const todos = await fetchTodosApi(boardId);
      set({ todos });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch todos",
      });
    } finally {
      set({ loading: false });
    }
  },

  createTodo: async (data) => {
    set({ loading: true, error: null });

    try {
      const todo = await createTodoApi(data);
      set((state) => ({
        todos: [...state.todos, todo],
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create todo",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateTodo: async (id, data) => {
    try {
      const updated = await updateTodoApi(id, data);
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? updated : t
        ),
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update todo",
      });
      throw err;
    }
  },

  deleteTodo: async (id) => {
    try {
      await deleteTodoApi(id);
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to delete todo",
      });
      throw err;
    }
  },
}));
