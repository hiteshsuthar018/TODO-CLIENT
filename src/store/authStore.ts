import { create } from "zustand";
import { signinApi, signupApi } from "../api/auth";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  signin: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,

  hydrate: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
      });
    }
  },

  signin: async ({ email, password }) => {
    set({ loading: true, error: null });

    try {
      const { token, user } = await signinApi({ email, password });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
      });
      
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  signup: async ({ name, email, password }) => {
    set({ loading: true, error: null });

    try {
      const res = await signupApi({ name, email, password });

      if (!res.success) {
        throw new Error(res.message || "Signup failed");
      }

    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Signup failed",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
