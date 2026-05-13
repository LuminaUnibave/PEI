// PLACEHOLDER — substituir por modal de form real.
export function AgendamentoFormModal({ agendamento, onClose, onSaved }) {
  return (
    <div className="modal-overlay" role="dialog" aria-label="Formulário de agendamento">
      <div className="modal-content">
        <h3>{agendamento?.id ? 'Editar Agendamento' : 'Novo Agendamento'}</h3>
        <button type="button" onClick={onClose}>Cancelar</button>
        <button type="button" onClick={onSaved}>Salvar</button>
      </div>
    </div>
  );
}
