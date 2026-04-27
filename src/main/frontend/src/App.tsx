import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './core/auth';
import { ToastMessage, ToastTone } from './core/types';
import { ToastStack } from './components/ui/ToastStack';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { PacientesPage } from './pages/PacientesPage';
import { AgendamentosPage } from './pages/AgendamentosPage';
import { EventosPage } from './pages/EventosPage';
import { UsuariosPage } from './pages/UsuariosPage';
import { RelatoriosPage } from './pages/RelatoriosPage';
import './styles/app.css';

function AppShell() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (!toasts.length) return;
    const timer = window.setTimeout(() => setToasts((current) => current.slice(1)), 3500);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  const pushToast = (tone: ToastTone, text: string) => {
    setToasts((current) => [...current, { id: Date.now(), tone, text }]);
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage onToast={pushToast} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage onToast={pushToast} />} />
          <Route path="pacientes" element={<PacientesPage onToast={pushToast} />} />
          <Route path="agendamentos" element={<AgendamentosPage onToast={pushToast} />} />
          <Route path="eventos" element={<EventosPage onToast={pushToast} />} />
          <Route path="relatorios" element={<RelatoriosPage onToast={pushToast} />} />
          <Route
            path="usuarios"
            element={
              <ProtectedRoute roles={['ADMINISTRADOR']}>
                <UsuariosPage onToast={pushToast} />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/" element={<Navigate replace to="/admin" />} />
        <Route path="*" element={<Navigate replace to="/admin" />} />
      </Routes>
      <ToastStack items={toasts} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}
