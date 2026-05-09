import { ToastTone } from '../../core/types';
import { useAuth } from '../../core/auth';
import { EventoModal } from './components/EventoModal';
import { EventosTable } from './components/EventosTable';
import { useEventos } from './hooks/useEventos';

type EventosFeatureProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function EventosFeature({ onToast }: EventosFeatureProps) {
  const { user } = useAuth();
  const {
    eventos,
    carregando,
    modalAberto,
    eventoSelecionado,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
    salvarEvento,
    excluirEvento,
  } = useEventos({ onToast });

  if (!user) {
    return <p>Usuario nao autenticado.</p>;
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Eventos</h1>
          <p>Gerencie os eventos cadastrados no sistema.</p>
        </div>

        <button className="primary-btn" type="button" onClick={abrirCadastro}>
          Novo evento
        </button>
      </div>

      <div className="content-card">
        <EventosTable
          eventos={eventos}
          carregando={carregando}
          onEditar={abrirEdicao}
          onExcluir={excluirEvento}
        />
      </div>

      <EventoModal
        idUsuario={user.id}
        initial={eventoSelecionado}
        isOpen={modalAberto}
        onClose={fecharModal}
        onSave={salvarEvento}
      />
    </section>
  );
}
