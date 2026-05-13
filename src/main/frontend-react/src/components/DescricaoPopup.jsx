// PLACEHOLDER — substituir por popup real.
export function DescricaoPopup({ texto, onClose }) {
  return (
    <div className="descricao-popup active" role="dialog" aria-label="Descrição do evento">
      <div className="descricao-popup-content">
        <button type="button" onClick={onClose} aria-label="Fechar">&times;</button>
        <div className="descricao-text">{texto}</div>
      </div>
    </div>
  );
}
