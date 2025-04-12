export interface AuthState {
    accessToken: string | null;
    expiresIn: number | null;
    setAuth: (token: string, expiresIn: number) => void;
    logout: () => void;
  }
  