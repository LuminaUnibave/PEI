type TableActionsProps<TItem> = {
  item: TItem;
  id: number;
  onEditar: (item: TItem) => void;
  onExcluir: (id: number) => void;
};

export function TableActions<TItem>({
  item,
  id,
  onEditar,
  onExcluir,
}: TableActionsProps<TItem>) {
  return (
    <div className="table-actions">
      <button
        className="ghost-btn"
        type="button"
        onClick={() => onEditar(item)}
      >
        Editar
      </button>

      <button
        className="danger-btn"
        type="button"
        onClick={() => onExcluir(id)}
      >
        Excluir
      </button>
    </div>
  );
}
