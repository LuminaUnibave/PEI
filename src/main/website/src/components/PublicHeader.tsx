import { NavLink } from 'react-router-dom';

export function PublicHeader() {
  return (
    <header className="site-header">
      <div className="brand">
        <span className="badge">Lumina</span>
        <strong>Rede Feminina de Combate ao Câncer</strong>
      </div>
      <nav className="site-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/agenda">Agenda</NavLink>
        <NavLink to="/cuidados">Cuidados</NavLink>
        <NavLink to="/historia">História</NavLink>
      </nav>
    </header>
  );
}
