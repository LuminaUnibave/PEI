import { useState } from 'react';

// Contratos esperados:
// - hooks/useAgendamentos        → { data, isLoading, refetch }
// - hooks/useAgendamentoMutation → { deletar }
// - components/SectionHeader, ContentCard
// - components/AgendamentosTable → <AgendamentosTable rows, onEdit, onDelete, onShowObservacao, onShowArquivos />
// - components/AgendamentoFormModal
// - components/ObservacaoPopup   → <ObservacaoPopup texto, onClose />
// - components/ArquivosPopup     → <ArquivosPopup agendamentoId, onClose />
// - components/ui/Button, Loading
import { useAgendamentos } from '../hooks/useAgendamentos';
import { useAgendamentoMutation } from '../hooks/useAgendamentoMutation';
import { SectionHeader } from '../components/SectionHeader';
import { ContentCard } from '../components/ContentCard';
import { AgendamentosTable } from '../components/AgendamentosTable';
import { AgendamentoFormModal } from '../components/AgendamentoFormModal';
import { ObservacaoPopup } from '../components/ObservacaoPopup';
import { ArquivosPopup } from '../components/ArquivosPopup';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';

export function AgendamentosPage() {
  const [filtroData, setFiltroData] = useState('');
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [observacaoAberta, setObservacaoAberta] = useState(null);
  const [arquivosAbertos, setArquivosAbertos] = useState(null);

  const { data: agendamentos, isLoading, refetch } = useAgendamentos({ data: filtroData });
  const { deletar } = useAgendamentoMutation();

  function abrirNovo() {
    setAgendamentoSelecionado({});
  }

  function abrirEdicao(agendamento) {
    setAgendamentoSelecionado(agendamento);
  }

  function fecharModal() {
    setAgendamentoSelecionado(null);
  }

  async function handleDelete(id) {
    if (!confirm('Deseja realmente excluir este agendamento?')) return;
    await deletar(id);
    refetch();
  }

  return (
    <section className="content-section active" id="agendamentos">
      <SectionHeader
        title="Gestão de Agendamentos"
        subtitle="Controle de consultas e visitas"
        action={
          <Button className="btn-new" onClick={abrirNovo}>
            Novo Agendamento
          </Button>
        }
      />

      <ContentCard
        title="Agendamentos"
        actions={
          <>
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              className="search-input"
            />
            <Button className="btn-secondary" onClick={() => setFiltroData('')}>
              Limpar
            </Button>
          </>
        }
      >
        {isLoading ? (
          <Loading />
        ) : (
          <AgendamentosTable
            rows={agendamentos ?? []}
            onEdit={abrirEdicao}
            onDelete={handleDelete}
            onShowObservacao={setObservacaoAberta}
            onShowArquivos={setArquivosAbertos}
          />
        )}
      </ContentCard>

      {agendamentoSelecionado && (
        <AgendamentoFormModal
          agendamento={agendamentoSelecionado}
          onClose={fecharModal}
          onSaved={() => {
            fecharModal();
            refetch();
          }}
        />
      )}

      {observacaoAberta && (
        <ObservacaoPopup
          texto={observacaoAberta}
          onClose={() => setObservacaoAberta(null)}
        />
      )}

      {arquivosAbertos && (
        <ArquivosPopup
          agendamentoId={arquivosAbertos}
          onClose={() => setArquivosAbertos(null)}
        />
      )}
    </section>
  );
}
