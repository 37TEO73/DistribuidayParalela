import { createContext } from 'react';
import type { AuthUser, LoginRequest } from '../types/Auth';

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<AuthUser>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);