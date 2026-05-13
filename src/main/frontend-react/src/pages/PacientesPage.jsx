import { useState } from 'react';

// Contratos esperados:
// - hooks/usePacientes        → { data, isLoading, error, refetch }
// - hooks/usePacienteMutation → { salvar, atualizar, deletar }
// - components/SectionHeader  → <SectionHeader title, subtitle, action />
// - components/ContentCard    → <ContentCard title, actions, children />
// - components/SearchInput    → <SearchInput value, onChange, placeholder />
// - components/PacientesTable → <PacientesTable rows, onEdit, onDelete />
// - components/PacienteFormModal → <PacienteFormModal paciente, onClose, onSaved />
// - components/ui/Button      → <Button onClick, children />
// - components/ui/Loading     → <Loading />
import { usePacientes } from '../hooks/usePacientes';
import { usePacienteMutation } from '../hooks/usePacienteMutation';
import { SectionHeader } from '../components/SectionHeader';
import { ContentCard } from '../components/ContentCard';
import { SearchInput } from '../components/SearchInput';
import { PacientesTable } from '../components/PacientesTable';
import { PacienteFormModal } from '../components/PacienteFormModal';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';

export function PacientesPage() {
  const [busca, setBusca] = useState('');
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const { data: pacientes, isLoading, refetch } = usePacientes({ busca });
  const { deletar } = usePacienteMutation();

  function abrirNovo() {
    setPacienteSelecionado({});
  }

  function abrirEdicao(paciente) {
    setPacienteSelecionado(paciente);
  }

  function fecharModal() {
    setPacienteSelecionado(null);
  }

  async function handleDelete(id) {
    if (!confirm('Deseja realmente excluir este paciente?')) return;
    await deletar(id);
    refetch();
  }

  return (
    <section className="content-section active" id="pacientes">
      <SectionHeader
        title="Gestão de Pacientes"
        subtitle="Gerencie todos os pacientes do sistema"
        action={
          <Button className="btn-new" onClick={abrirNovo}>
            Novo Paciente
          </Button>
        }
      />

      <ContentCard
        title="Lista de Pacientes"
        actions={
          <SearchInput
            value={busca}
            onChange={setBusca}
            placeholder="Buscar por ID, nome, cpf.."
          />
        }
      >
        {isLoading ? (
          <Loading />
        ) : (
          <PacientesTable
            rows={pacientes ?? []}
            onEdit={abrirEdicao}
            onDelete={handleDelete}
          />
        )}
      </ContentCard>

      {pacienteSelecionado && (
        <PacienteFormModal
          paciente={pacienteSelecionado}
          onClose={fecharModal}
          onSaved={() => {
            fecharModal();
            refetch();
          }}
        />
      )}
    </section>
  );
}
