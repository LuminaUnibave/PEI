import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from '../layouts/ProtectedRoute';
import { AgendamentosPage, DashboardPage, EventosPage, LoginPage, PacientesPage, RelatoriosPage, UsuariosPage } from '../pages';
import { ToastTone } from '../core/types';

export function AppRoutes({ onToast }: { onToast: (tone: ToastTone, text: string) => void }) {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onToast={onToast} />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage onToast={onToast} />} />
        <Route path="pacientes" element={<PacientesPage onToast={onToast} />} />
        <Route path="agendamentos" element={<AgendamentosPage onToast={onToast} />} />
        <Route path="eventos" element={<EventosPage onToast={onToast} />} />
        <Route path="relatorios" element={<RelatoriosPage onToast={onToast} />} />
        <Route
          path="usuarios"
          element={
            <ProtectedRoute roles={['ADMINISTRADOR']}>
              <UsuariosPage onToast={onToast} />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/" element={<Navigate replace to="/admin" />} />
      <Route path="*" element={<Navigate replace to="/admin" />} />
    </Routes>
  );
}
