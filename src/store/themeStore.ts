import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: localStorage.getItem("dark") === "true",

  toggleTheme: () =>
    set((state) => {
      const next = !state.isDark;
      localStorage.setItem("dark", String(next));
      return { isDark: next };
    }),
}));
