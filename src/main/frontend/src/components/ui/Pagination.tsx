export function Pagination({
  page,
  pageSize,
  totalPages,
  totalItems,
  start,
  end,
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  start: number;
  end: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(Math.max(page - 3, 0), page + 2);

  return (
    <div className="pagination-bar">
      <span className="muted">
        Exibindo {start}-{end} de {totalItems} registros
      </span>
      <div className="pagination-controls">
        <select onChange={(event) => onPageSizeChange(Number(event.target.value))} value={pageSize}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        <button className="ghost-btn small" disabled={page === 1} onClick={() => onPageChange(1)} type="button">
          Primeira
        </button>
        <button className="ghost-btn small" disabled={page === 1} onClick={() => onPageChange(page - 1)} type="button">
          Anterior
        </button>
        {pages.map((pageNumber) => (
          <button
            className={`ghost-btn small ${pageNumber === page ? 'active-page' : ''}`}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            type="button"
          >
            {pageNumber}
          </button>
        ))}
        <button className="ghost-btn small" disabled={page === totalPages} onClick={() => onPageChange(page + 1)} type="button">
          Próxima
        </button>
        <button className="ghost-btn small" disabled={page === totalPages} onClick={() => onPageChange(totalPages)} type="button">
          Última
        </button>
      </div>
    </div>
  );
}
