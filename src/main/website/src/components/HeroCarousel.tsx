import { ButtonLink } from './ButtonLink';

export function HeroCarousel() {
  return (
    <section className="hero">
      <div>
        <h1>Informação, acolhimento e prevenção em uma experiência web mais clara.</h1>
        <p>Um espaço para acolher, orientar e aproximar a comunidade.</p>
        <div className="hero-actions">
          <ButtonLink to="/agenda">Ver agenda</ButtonLink>
          <ButtonLink to="/cuidados" variant="secondary">
            Ler cuidados
          </ButtonLink>
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
