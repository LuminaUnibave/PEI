import { InfoCard } from './InfoCard';
import { ButtonLink } from './ButtonLink';

export function PreventionSection() {
  return (
    <section className="grid-section">
      <InfoCard title="Cuidados e prevenção" text="Conteúdo organizado em blocos de leitura rápida para orientar o público." />
      <InfoCard title="Autocuidado" text="Orientações sobre hábitos saudáveis, atenção aos sinais e acompanhamento regular." />
      <div className="info-card cta-card">
        <h3>Conteúdo educativo</h3>
        <p>Dicas reunidas de forma simples para consulta no dia a dia.</p>
        <ButtonLink to="/cuidados" variant="secondary">
          Ver cuidados
        </ButtonLink>
      </div>
    </section>
  );
}
