import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mocka todas as pages para isolar o teste no roteamento.
vi.mock('../src/pages/LoginPage', () => ({ LoginPage: () => <div>LOGIN_PAGE</div> }));
vi.mock('../src/pages/RegisterPage', () => ({ RegisterPage: () => <div>REGISTER_PAGE</div> }));
vi.mock('../src/pages/DashboardLayout', () => ({ DashboardLayout: () => <div>DASHBOARD_LAYOUT</div> }));
vi.mock('../src/pages/PacientesPage', () => ({ PacientesPage: () => <div>PACIENTES_PAGE</div> }));
vi.mock('../src/pages/AgendamentosPage', () => ({ AgendamentosPage: () => <div>AGENDAMENTOS_PAGE</div> }));
vi.mock('../src/pages/EventosPage', () => ({ EventosPage: () => <div>EVENTOS_PAGE</div> }));
vi.mock('../src/pages/RelatoriosPage', () => ({ RelatoriosPage: () => <div>RELATORIOS_PAGE</div> }));
vi.mock('../src/pages/NotFoundPage', () => ({ NotFoundPage: () => <div>NOT_FOUND_PAGE</div> }));

// RequireAuth deixa passar — testes específicos cobrem o guard.
vi.mock('../src/components/RequireAuth', () => ({ RequireAuth: ({ children }) => children }));

// Substitui BrowserRouter por MemoryRouter pra controlar a URL.
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, BrowserRouter: actual.MemoryRouter };
});

async function loadApp(initialEntries) {
  vi.resetModules();
  const { MemoryRouter } = await import('react-router-dom');
  vi.doMock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    const Wrapped = (props) => <MemoryRouter {...props} initialEntries={initialEntries} />;
    return { ...actual, BrowserRouter: Wrapped };
  });
  const mod = await import('../src/App');
  return mod.App;
}

describe('App router', () => {
  it('rota /login renderiza LoginPage', async () => {
    const App = await loadApp(['/login']);
    render(<App />);
    expect(screen.getByText('LOGIN_PAGE')).toBeInTheDocument();
  });

  it('rota /cadastro renderiza RegisterPage', async () => {
    const App = await loadApp(['/cadastro']);
    render(<App />);
    expect(screen.getByText('REGISTER_PAGE')).toBeInTheDocument();
  });

  it('rota /pacientes renderiza DashboardLayout (que contém o Outlet)', async () => {
    const App = await loadApp(['/pacientes']);
    render(<App />);
    expect(screen.getByText('DASHBOARD_LAYOUT')).toBeInTheDocument();
  });

  it('rota desconhecida renderiza NotFoundPage', async () => {
    const App = await loadApp(['/nao-existe']);
    render(<App />);
    expect(screen.getByText('NOT_FOUND_PAGE')).toBeInTheDocument();
  });
});
