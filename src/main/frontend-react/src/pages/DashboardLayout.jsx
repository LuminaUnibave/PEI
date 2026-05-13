import { NavLink, Outlet, useNavigate } from 'react-router-dom';

// Contratos esperados:
// - hooks/useAuth          → { user: { nome }, logout(): void }
// - components/UserAvatar  → <UserAvatar nome={...} />
// - components/ThemeToggle → <ThemeToggle />
import { useAuth } from '../hooks/useAuth';
import { UserAvatar } from '../components/UserAvatar';
import { ThemeToggle } from '../components/ThemeToggle';

const SECOES = [
  { path: '/pacientes', label: 'Pacientes' },
  { path: '/agendamentos', label: 'Agendamentos' },
  { path: '/eventos', label: 'Eventos' },
  { path: '/relatorios', label: 'Relatórios' },
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="screen active" id="dashboardScreen">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">Lumina</div>
          <div className="user-info">
            <UserAvatar nome={user?.nome} />
            <span>{user?.nome ?? 'Usuário'}</span>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Sair
            </button>
          </div>

          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
        </div>

        <nav className="dashboard-nav">
          <div className="nav-container">
            <div className="nav-buttons">
              {SECOES.map((s) => (
                <NavLink
                  key={s.path}
                  to={s.path}
                  className={({ isActive }) => `nav-btn${isActive ? ' active' : ''}`}
                >
                  {s.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
