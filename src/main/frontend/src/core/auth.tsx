import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchUsuarioByEmail, login as apiLogin } from './api';
import { SessionUser } from './types';

const STORAGE_KEY = 'lumina.auth';

interface AuthContextValue {
  token: string | null;
  user: SessionUser | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles?: string[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as { token: string; user: SessionUser };
      setToken(parsed.token);
      setUser(parsed.user);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      async login(email, senha) {
        const response = await apiLogin(email, senha);
        const fullUser = await fetchUsuarioByEmail(response.email).catch(() => ({
          id: response.usuarioId,
          nome: response.nome,
          email: response.email,
          tpUsuario: 'OPERADOR' as const,
          situacao: 'ATIVO' as const,
        }));

        const nextUser: SessionUser = {
          id: fullUser.id,
          nome: fullUser.nome,
          email: fullUser.email,
          tpUsuario: fullUser.tpUsuario,
          situacao: fullUser.situacao,
        };

        setToken(response.token);
        setUser(nextUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: response.token, user: nextUser }));
      },
      logout() {
        setToken(null);
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
      },
      hasRole(roles) {
        if (!roles?.length) {
          return true;
        }

        return Boolean(user && roles.includes(user.tpUsuario));
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro de AuthProvider');
  }

  return context;
}