import { useMemo, useState } from 'react';
import apiClient from '../api/apiClient';
import { AuthContext } from './auth-context';
import type { AuthUser, LoginRequest, LoginResponse } from '../types/Auth';

const USER_KEY = 'authUser';
const TOKEN_KEY = 'token';

function getStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getStoredToken());

  const login = async (credentials: LoginRequest): Promise<AuthUser> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);

    const loginData = response.data;

    const authUser: AuthUser = {
      id: loginData.id,
      userName: loginData.userName,
      tipo: loginData.tipo,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    localStorage.setItem(TOKEN_KEY, loginData.token);

    setUser(authUser);
    setToken(loginData.token);

    return authUser;
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}