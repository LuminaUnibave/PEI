// PLACEHOLDER — substituir por implementação real que verifica autenticação.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
