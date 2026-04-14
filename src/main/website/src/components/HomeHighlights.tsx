import { InfoCard } from './InfoCard';

export function HomeHighlights() {
  return (
    <>
      <section className="grid-section">
        <InfoCard title="Sobre a instituição" text="Apresentação da missão da RFCC Orleans, reforçando acolhimento, informação e vínculo comunitário." />
        <InfoCard title="Cuidados e prevenção" text="Conteúdo organizado em blocos de leitura rápida para orientar o público." />
        <InfoCard title="Eventos e campanhas" text="Área para divulgar ações, datas importantes e mobilizações locais." />
      </section>
      <section className="grid-section">
        <InfoCard title="Endereço" text="Espaço para o endereço físico da instituição e referências para visita." />
        <InfoCard title="Contato" text="Bloco para telefone, WhatsApp, e-mail e atendimento institucional." />
        <InfoCard title="Rede de apoio" text="Área voltada a ações de suporte, voluntariado e vínculo com a comunidade." />
      </section>
    </>
  );
}
