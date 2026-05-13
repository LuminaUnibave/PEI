// PLACEHOLDER — substituir por popup real.
export function ArquivosPopup({ agendamentoId, eventoId, onClose }) {
  const id = agendamentoId ?? eventoId;
  return (
    <div className="arquivos-popup active" role="dialog" aria-label="Arquivos">
      <div className="arquivos-popup-content">
        <button type="button" onClick={onClose} aria-label="Fechar">&times;</button>
        <p>Arquivos do item #{id}</p>
      </div>
    </div>
  );
}
