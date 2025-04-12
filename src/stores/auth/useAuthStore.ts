import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthState {
  accessToken: string | null;
  expiresIn: string | null;
  setAuth: (token: string | null, expiresIn: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      setAuth: (token, expiresIn) => {
        set({ accessToken: token, expiresIn });
      },
      logout: () => {
        set({ accessToken: null, expiresIn: null });
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);
