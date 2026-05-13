import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contrato esperado:
// - components/RequireAuth → bloqueia acesso quando não autenticado, redireciona para /login
import { RequireAuth } from './components/RequireAuth';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardLayout } from './pages/DashboardLayout';
import { PacientesPage } from './pages/PacientesPage';
import { AgendamentosPage } from './pages/AgendamentosPage';
import { EventosPage } from './pages/EventosPage';
import { RelatoriosPage } from './pages/RelatoriosPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        <Route
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/pacientes" replace />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/agendamentos" element={<AgendamentosPage />} />
          <Route path="/eventos" element={<EventosPage />} />
          <Route path="/relatorios" element={<RelatoriosPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
