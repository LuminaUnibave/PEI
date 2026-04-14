export function ActionRow({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="action-strip">
      <button className="ghost-btn" onClick={onEdit} type="button">
        Editar
      </button>
      <button className="ghost-btn danger" onClick={onDelete} type="button">
        Excluir
      </button>
    </div>
  );
}
