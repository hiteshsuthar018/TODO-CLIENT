import axios from "../config/axiosConfig";
import type { Todo } from "../types/todo";

interface FetchTodosResponse {
  message: string;
  todos: Todo[];
}
interface FetchTodoResponse {
  message: string;
  todo: Todo;
}

// fetch todos by board
export async function fetchTodosApi(boardId: string): Promise<Todo[]> {
  const res = await axios.get<FetchTodosResponse>(`/todos/board/${boardId}`);
  return res.data.todos;
}

// create todo
export async function createTodoApi(data: {
  title: string;
  description?: string;
  boardId: string;
}): Promise<Todo> {
  const res = await axios.post<FetchTodoResponse>("/todos", data);
  return res.data.todo;
}

// update todo
export async function updateTodoApi(
  todoId: string,
  data: Partial<Pick<Todo, "title" | "description" | "completed">>
): Promise<Todo> {
  const res = await axios.put<FetchTodoResponse>(`/todos/${todoId}`, data);
  console.log("updated todo response",res.data.todo);
  return res.data.todo;
}

// delete todo
export async function deleteTodoApi(todoId: string): Promise<void> {
  await axios.delete(`/todos/${todoId}`);
}
