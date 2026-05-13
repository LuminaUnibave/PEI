// PLACEHOLDER — substituir por componente real.
export function ContentCard({ title, actions, children }) {
  return (
    <div className="content-card">
      <div className="card-header">
        <h3>{title}</h3>
        {actions && <div className="table-actions">{actions}</div>}
      </div>
      <div className="table-container">{children}</div>
    </div>
  );
}
