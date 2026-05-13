// PLACEHOLDER — substituir por modal de form real.
export function EventoFormModal({ evento, onClose, onSaved }) {
  return (
    <div className="modal-overlay" role="dialog" aria-label="Formulário de evento">
      <div className="modal-content">
        <h3>{evento?.id ? 'Editar Evento' : 'Novo Evento'}</h3>
        <button type="button" onClick={onClose}>Cancelar</button>
        <button type="button" onClick={onSaved}>Salvar</button>
      </div>
    </div>
  );
}
