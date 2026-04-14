import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/auth';

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={to}>
      {children}
    </NavLink>
  );
}

export function AdminLayout() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="brand-card">
          <span className="brand-kicker">Lumina</span>
          <strong>RFCC Orleans</strong>
        </div>
        <nav className="sidebar-nav">
          <NavItem to="/admin">Dashboard</NavItem>
          <NavItem to="/admin/pacientes">Pacientes</NavItem>
          <NavItem to="/admin/agendamentos">Agendamentos</NavItem>
          <NavItem to="/admin/eventos">Eventos</NavItem>
          {auth.user?.tpUsuario === 'ADMINISTRADOR' && <NavItem to="/admin/usuarios">Usuários</NavItem>}
          <NavItem to="/admin/relatorios">Relatórios</NavItem>
        </nav>
        <button
          className="ghost-btn danger"
          onClick={() => {
            auth.logout();
            navigate('/login');
          }}
          type="button"
        >
          Sair
        </button>
      </aside>
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Gestão Lumina</h1>
          </div>
          <div className="user-chip">
            <strong>{auth.user?.nome}</strong>
            <span>{auth.user?.tpUsuario}</span>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
