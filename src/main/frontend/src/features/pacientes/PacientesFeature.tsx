import { useAuth } from '../../core/auth';
import { ToastTone } from '../../core/types';
import { PacienteModal } from './components/PacienteModal';
import { PacientesTable } from './components/PacientesTable';
import { usePacientes } from './hooks/usePacientes';

type PacientesFeatureProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function PacientesFeature({ onToast }: PacientesFeatureProps) {
  const { user } = useAuth();
  const {
    pacientes,
    carregando,
    modalAberto,
    pacienteSelecionado,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
    salvarPaciente,
    excluirPaciente,
  } = usePacientes({ onToast });

  if (!user) {
    return <p>Usuario nao autenticado.</p>;
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Pacientes</h1>
          <p>Gerencie os pacientes cadastrados no sistema.</p>
        </div>

        <button className="primary-btn" type="button" onClick={abrirCadastro}>
          Novo paciente
        </button>
      </div>

      <div className="content-card">
        <PacientesTable
          pacientes={pacientes}
          carregando={carregando}
          onEditar={abrirEdicao}
          onExcluir={excluirPaciente}
        />
      </div>

      <PacienteModal
        idUsuario={user.id}
        initial={pacienteSelecionado}
        isOpen={modalAberto}
        onClose={fecharModal}
        onSave={salvarPaciente}
      />
    </section>
  );
}
