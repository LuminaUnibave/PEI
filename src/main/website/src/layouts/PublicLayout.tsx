import { Outlet } from 'react-router-dom';
import { PublicHeader } from '../components/PublicHeader';

export function PublicLayout() {
  return (
    <div className="site-shell">
      <PublicHeader />
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <strong>Lumina</strong>
        <span>Rede Feminina de Combate ao Câncer</span>
      </footer>
    </div>
  );
}
