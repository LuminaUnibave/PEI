import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../core/auth';
import { TpUsuario } from '../core/types';

export function ProtectedRoute({
  roles,
  children,
}: {
  roles?: TpUsuario[];
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />;
  }

  if (roles?.length && !auth.hasRole(roles)) {
    return <Navigate replace to="/admin" />;
  }

  return <>{children}</>;
}
