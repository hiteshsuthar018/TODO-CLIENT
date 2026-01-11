import { create } from "zustand";
import type { Board } from "../types/board";
import {
  fetchBoardsApi,
  createBoardApi,
  updateBoardApi,
  deleteBoardApi,
} from "../api/boards";

interface BoardStore {
  boards: Board[];
  loading: boolean;
  error: string | null;

  fetchBoards: () => Promise<void>;
  getBoardById: (id: string) => Board | undefined;
  createBoard: (title: string) => Promise<Board>;
  updateBoard: (id: string, title: string) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  loading: false,
  error: null,

  //  Fetch all boards
  fetchBoards: async () => {
    set({ loading: true, error: null });

    try {
      const boards = await fetchBoardsApi();
      set({ boards });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch boards",
      });
    } finally {
      set({ loading: false });
    }
  },

  //  Get board from store (no API call)
  getBoardById: (id) => {
    return get().boards.find((b) => b.id === id);
  },

  //  Create board
  createBoard: async (title) => {
    set({ loading: true, error: null });

    try {
      const board = await createBoardApi(title);
      set((state) => ({
        boards: [...state.boards, board],
      }));
      return board;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create board",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  //  Update board title
  updateBoard: async (id, title) => {
    set({ loading: true, error: null });

    try {
      const updated = await updateBoardApi(id, title);
      set((state) => ({
        boards: state.boards.map((b) =>
          b.id === id ? updated : b
        ),
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update board",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Delete board
  deleteBoard: async (id) => {
    set({ loading: true, error: null });

    try {
      await deleteBoardApi(id);
      set((state) => ({
        boards: state.boards.filter((b) => b.id !== id),
      }));
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to delete board",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
