import { useEffect, useMemo, useState } from 'react';
import { EventoPublico, fetchEventosPublicos } from '../core/api';
import { formatDate } from '../utils/format';
import { LoadingSpinner } from './LoadingSpinner';

export function AgendaList() {
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
      <h1>Calendário público de ações e encontros</h1>
      {loading && <LoadingSpinner text="Carregando eventos..." />}
      {error && <div className="notice warning">Não foi possível carregar os eventos.</div>}
      <div className="agenda-grid">
        {futuros.map((evento) => (
          <article className="agenda-card" key={evento.id}>
            <span className="chip">{formatDate(evento.dtEvento)}</span>
            <h3>{evento.nmEvento || 'Evento institucional'}</h3>
            <p>{evento.descricao || 'Descrição não disponível.'}</p>
            <small>{evento.situacao}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
