import { useState } from 'react';

// Contratos esperados:
// - hooks/useEventos        → { data, isLoading, refetch }
// - hooks/useEventoMutation → { deletar }
// - components/SectionHeader, ContentCard
// - components/EventosTable → <EventosTable rows, onEdit, onDelete, onShowDescricao, onShowArquivos />
// - components/EventoFormModal
// - components/DescricaoPopup → <DescricaoPopup texto, onClose />
// - components/ArquivosPopup  → <ArquivosPopup eventoId, onClose />
// - components/ui/Button, Loading
import { useEventos } from '../hooks/useEventos';
import { useEventoMutation } from '../hooks/useEventoMutation';
import { SectionHeader } from '../components/SectionHeader';
import { ContentCard } from '../components/ContentCard';
import { EventosTable } from '../components/EventosTable';
import { EventoFormModal } from '../components/EventoFormModal';
import { DescricaoPopup } from '../components/DescricaoPopup';
import { ArquivosPopup } from '../components/ArquivosPopup';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';

const FILTROS = [
  { value: '', label: 'Todos os eventos' },
  { value: 'ativo', label: 'Ativos' },
  { value: 'concluido', label: 'Concluídos' },
  { value: 'futuro', label: 'Futuros' },
];

export function EventosPage() {
  const [filtro, setFiltro] = useState('');
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [descricaoAberta, setDescricaoAberta] = useState(null);
  const [arquivosAbertos, setArquivosAbertos] = useState(null);

  const { data: eventos, isLoading, refetch } = useEventos({ filtro });
  const { deletar } = useEventoMutation();

  function abrirNovo() {
    setEventoSelecionado({});
  }

  function abrirEdicao(evento) {
    setEventoSelecionado(evento);
  }

  function fecharModal() {
    setEventoSelecionado(null);
  }

  async function handleDelete(id) {
    if (!confirm('Deseja realmente excluir este evento?')) return;
    await deletar(id);
    refetch();
  }

  return (
    <section className="content-section active" id="eventos">
      <SectionHeader
        title="Gestão de Eventos"
        subtitle="Eventos e atividades do sistema"
        action={
          <Button className="btn-new" onClick={abrirNovo}>
            Novo Evento
          </Button>
        }
      />

      <ContentCard
        title="Lista de Eventos"
        actions={
          <select
            className="search-input"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            {FILTROS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        }
      >
        {isLoading ? (
          <Loading />
        ) : (
          <EventosTable
            rows={eventos ?? []}
            onEdit={abrirEdicao}
            onDelete={handleDelete}
            onShowDescricao={setDescricaoAberta}
            onShowArquivos={setArquivosAbertos}
          />
        )}
      </ContentCard>

      {eventoSelecionado && (
        <EventoFormModal
          evento={eventoSelecionado}
          onClose={fecharModal}
          onSaved={() => {
            fecharModal();
            refetch();
          }}
        />
      )}

      {descricaoAberta && (
        <DescricaoPopup
          texto={descricaoAberta}
          onClose={() => setDescricaoAberta(null)}
        />
      )}

      {arquivosAbertos && (
        <ArquivosPopup
          eventoId={arquivosAbertos}
          onClose={() => setArquivosAbertos(null)}
        />
      )}
    </section>
  );
}
