export function Toolbar({
  query,
  queryPlaceholder,
  onQueryChange,
  onCreate,
  createLabel = 'Novo cadastro',
  children,
}: {
  query: string;
  queryPlaceholder: string;
  onQueryChange: (value: string) => void;
  onCreate: () => void;
  createLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="toolbar split">
      <div className="search-wrap">
        <input onChange={(event) => onQueryChange(event.target.value)} placeholder={queryPlaceholder} value={query} />
        {children}
      </div>
      <button className="primary-btn" onClick={onCreate} type="button">
        {createLabel}
      </button>
    </div>
  );
}
