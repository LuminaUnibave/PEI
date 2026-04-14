import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { EventoPublico, fetchEventosPublicos } from './core/api';
import './App.css';

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/website' : '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/cuidados" element={<CuidadosPage />} />
          <Route path="/historia" element={<HistoriaPage />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

function PublicLayout() {
  return (
    <div className="site-shell">
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
      <main className="site-main">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/cuidados" element={<CuidadosPage />} />
          <Route path="/historia" element={<HistoriaPage />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <strong>Lumina</strong>
        <span>Website público em React + TypeScript alinhado ao levantamento de telas.</span>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Website público</p>
          <h1>Informação, acolhimento e prevenção em uma experiência web mais clara.</h1>
          <p>
            A home reúne o hero, apresentação institucional, prevenção, destaques de eventos, endereço e contato,
            seguindo a estrutura descrita no arquivo de referência.
          </p>
          <div className="hero-actions">
            <NavLink className="primary-btn" to="/agenda">Ver agenda</NavLink>
            <NavLink className="secondary-btn" to="/cuidados">Ler cuidados</NavLink>
          </div>
        </div>
        <div className="hero-card">
          <h3>Destaques</h3>
          <ul>
            <li>Hero com CTA principal</li>
            <li>Bloco sobre a RFCC</li>
            <li>Prevenção e autocuidado</li>
            <li>Eventos e contato</li>
          </ul>
        </div>
      </section>
      <section className="grid-section">
        <InfoCard
          title="Sobre a instituição"
          text="A página inicial apresenta a missão da RFCC Orleans, reforçando acolhimento, informação e vínculo comunitário."
        />
        <InfoCard
          title="Cuidados e prevenção"
          text="Conteúdo estático organizado em cards e blocos de leitura rápida para orientar o público leigo."
        />
        <InfoCard
          title="Localização e contato"
          text="Seção final preparada para endereço, telefone, WhatsApp, email e formulário institucional."
        />
      </section>
    </>
  );
}

function AgendaPage() {
  const [eventos, setEventos] = useState<EventoPublico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEventosPublicos()
      .then(setEventos)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const futuros = useMemo(
    () => [...eventos].sort((a, b) => new Date(a.dtEvento).getTime() - new Date(b.dtEvento).getTime()),
    [eventos],
  );

  return (
    <section className="page-block">
      <p className="eyebrow">Agenda de eventos</p>
      <h1>Calendário público de ações e encontros</h1>
      <p>O layout segue o wireframe do anexo com foco em destaque para data, título, descrição e status.</p>
      {loading && <div className="notice">Carregando eventos...</div>}
      {error && <div className="notice warning">Não foi possível consultar os eventos no backend.</div>}
      <div className="agenda-grid">
        {futuros.map((evento) => (
          <article className="agenda-card" key={evento.id}>
            <span className="chip">{new Date(evento.dtEvento).toLocaleDateString('pt-BR')}</span>
            <h3>{evento.nmEvento || 'Evento institucional'}</h3>
            <p>{evento.descricao || 'Descrição não disponível.'}</p>
            <small>{evento.situacao}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function CuidadosPage() {
  return (
    <section className="page-block">
      <p className="eyebrow">Cuidados e prevenção</p>
      <h1>Conteúdo educativo para apoiar a prevenção</h1>
      <div className="reading-layout">
        <InfoCard title="Exames de rotina" text="Espaço pensado para orientar frequência, atenção aos sinais e encaminhamentos básicos." />
        <InfoCard title="Autocuidado" text="Bloco editorial para hábitos saudáveis, apoio emocional e reforço de acompanhamento profissional." />
        <InfoCard title="Rede de apoio" text="Área preparada para contatos, campanhas e ações comunitárias ligadas à RFCC." />
      </div>
    </section>
  );
}

function HistoriaPage() {
  const timeline = [
    'Fundação da rede e início das ações locais.',
    'Expansão do trabalho de acolhimento à comunidade.',
    'Consolidação de campanhas, eventos e prevenção.',
    'Digitalização da comunicação com website e agenda pública.',
  ];

  return (
    <section className="page-block">
      <p className="eyebrow">História</p>
      <h1>Uma narrativa institucional com linha do tempo</h1>
      <div className="timeline">
        {timeline.map((item, index) => (
          <article className="timeline-item" key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default App;
