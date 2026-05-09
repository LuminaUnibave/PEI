import { ToastTone } from '../../core/types';
import { useAuth } from '../../core/auth';
import { AgendamentoModal } from './components/AgendamentoModal';
import { AgendamentosTable } from './components/AgendamentosTable';
import { useAgendamentos } from './hooks/useAgendamentos';

type AgendamentosFeatureProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function AgendamentosFeature({ onToast }: AgendamentosFeatureProps) {
  const { user } = useAuth();
  const {
    agendamentos,
    pacientes,
    carregando,
    modalAberto,
    agendamentoSelecionado,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
    salvarAgendamento,
    excluirAgendamento,
  } = useAgendamentos({ onToast });

  if (!user) {
    return <p>Usuario nao autenticado.</p>;
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Agendamentos</h1>
          <p>Gerencie os agendamentos cadastrados no sistema.</p>
        </div>

        <button className="primary-btn" type="button" onClick={abrirCadastro}>
          Novo agendamento
        </button>
      </div>

      <div className="content-card">
        <AgendamentosTable
          agendamentos={agendamentos}
          carregando={carregando}
          onEditar={abrirEdicao}
          onExcluir={excluirAgendamento}
        />
      </div>

      <AgendamentoModal
        idUsuario={user.id}
        initial={agendamentoSelecionado}
        isOpen={modalAberto}
        pacientes={pacientes}
        onClose={fecharModal}
        onSave={salvarAgendamento}
      />
    </section>
  );
}
