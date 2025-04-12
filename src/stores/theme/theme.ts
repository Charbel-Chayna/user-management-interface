import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeState } from "./theme.type";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage", 
    }
  )
);
