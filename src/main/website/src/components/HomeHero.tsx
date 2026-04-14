import { NavLink } from 'react-router-dom';

export function HomeHero() {
  return (
    <section className="hero">
      <div>
        <h1>Informação, acolhimento e prevenção em uma experiência web mais clara.</h1>
        <p>Um espaço para acolher, orientar e aproximar a comunidade.</p>
        <div className="hero-actions">
          <NavLink className="primary-btn" to="/agenda">
            Ver agenda
          </NavLink>
          <NavLink className="secondary-btn" to="/cuidados">
            Ler cuidados
          </NavLink>
        </div>
      </div>
      <div className="hero-card">
        <h3>Destaques</h3>
        <ul>
          <li>Acolhimento e orientação</li>
          <li>Informações sobre prevenção</li>
          <li>Eventos e campanhas</li>
          <li>Contato com a instituição</li>
        </ul>
      </div>
    </section>
  );
}
