import { InfoCard } from './InfoCard';
import { ButtonLink } from './ButtonLink';

export function AboutSection() {
  return (
    <section className="grid-section">
      <InfoCard title="Sobre a instituição" text="Apresentação da missão da RFCC Orleans, reforçando acolhimento, informação e vínculo comunitário." />
      <InfoCard title="Ações e campanhas" text="Espaço para divulgar mobilizações locais, atendimento e trabalho com a comunidade." />
      <div className="info-card cta-card">
        <h3>Conheça nossa história</h3>
        <p>Um caminho construído com cuidado, presença e apoio contínuo.</p>
        <ButtonLink to="/historia">Saiba mais</ButtonLink>
      </div>
    </section>
  );
}
