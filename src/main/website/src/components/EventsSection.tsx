import { InfoCard } from './InfoCard';
import { ButtonLink } from './ButtonLink';

export function EventsSection() {
  return (
    <section className="grid-section">
      <InfoCard title="Eventos e campanhas" text="Área para divulgar ações, datas importantes e mobilizações locais." />
      <InfoCard title="Participação da comunidade" text="Encontros, campanhas e atividades pensadas para aproximar e acolher." />
      <div className="info-card cta-card">
        <h3>Agenda completa</h3>
        <p>Confira os próximos encontros e acompanhe as atividades da instituição.</p>
        <ButtonLink to="/agenda">Ver todos</ButtonLink>
      </div>
    </section>
  );
}
