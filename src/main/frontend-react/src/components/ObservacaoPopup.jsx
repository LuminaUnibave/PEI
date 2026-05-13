// PLACEHOLDER — substituir por popup real.
export function ObservacaoPopup({ texto, onClose }) {
  return (
    <div className="observacao-popup active" role="dialog" aria-label="Observações do agendamento">
      <div className="observacao-popup-content">
        <button type="button" onClick={onClose} aria-label="Fechar">&times;</button>
        <div className="observacao-text">{texto}</div>
      </div>
    </div>
  );
}
