// PLACEHOLDER — substituir por modal de form real.
export function PacienteFormModal({ paciente, onClose, onSaved }) {
  return (
    <div className="modal-overlay" role="dialog" aria-label="Formulário de paciente">
      <div className="modal-content">
        <h3>{paciente?.id ? 'Editar Paciente' : 'Novo Paciente'}</h3>
        <button type="button" onClick={onClose}>Cancelar</button>
        <button type="button" onClick={onSaved}>Salvar</button>
      </div>
    </div>
  );
}
