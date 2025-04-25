import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeState } from "./theme.type";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => {
      const detectSystemTheme = () => {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        return systemTheme;
      };

      return {
        theme: detectSystemTheme(), 
        setTheme: (theme) => set({ theme }), 
        clearTheme: () => set({ theme: detectSystemTheme() }), 
      };
    },
    {
      name: "theme-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQuery.addEventListener("change", (event) => {
    const newTheme = event.matches ? "dark" : "light";
    useThemeStore.getState().setTheme(newTheme);
  });
}
