import axios from "../config/axiosConfig";
import type { Board } from "../types/board";

interface FetchBoardsResponse {
  message: string;
  boards: Board[];
}
interface FetchBoardResponse {
  message: string;
  board: Board;
}


// fetch board by id
export async function fetchBoardApi(boardId: string): Promise<Board> {
  const res = await axios.get<FetchBoardResponse>(`/boards/${boardId}`);
  return res.data.board;
}

// update board title
export async function updateBoardApi(
  boardId: string,
  title: string
): Promise<Board> {
  const res = await axios.put<FetchBoardResponse>(`/boards/${boardId}`, { title });
  return res.data.board;
}

// delete board by id
export async function deleteBoardApi(boardId: string): Promise<void> {
  await axios.delete(`/boards/${boardId}`);
}

export async function fetchBoardsApi(): Promise<Board[]> {
  const res = await axios.get<FetchBoardsResponse>("/boards");
  return res.data.boards;
}

export async function createBoardApi(title: string): Promise<Board> {
  const res = await axios.post<FetchBoardResponse>("/boards", { title });
  return res.data.board;
}