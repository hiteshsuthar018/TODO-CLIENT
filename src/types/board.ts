import type { Todo } from "./todo";

export interface Board {
  id: string;
  title: string;
  todos:Todo[];
}