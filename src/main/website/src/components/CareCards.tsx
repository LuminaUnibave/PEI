import { InfoCard } from './InfoCard';

export function CareCards() {
  return (
    <section className="page-block">
      <h1>Conteúdo educativo para apoiar a prevenção</h1>
      <div className="reading-layout">
        <InfoCard title="Exames de rotina" text="Orientações sobre frequência, atenção aos sinais e cuidados essenciais." />
        <InfoCard title="Autocuidado" text="Hábitos saudáveis, apoio emocional e reforço de acompanhamento profissional." />
        <InfoCard title="Rede de apoio" text="Contatos, campanhas e ações comunitárias ligadas à RFCC." />
      </div>
    </section>
  );
}
