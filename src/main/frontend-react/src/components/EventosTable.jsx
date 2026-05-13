// PLACEHOLDER — substituir por componente real.
export function EventosTable({ rows = [], onEdit, onDelete, onShowDescricao, onShowArquivos }) {
  return (
    <table className="data-table" aria-label="Lista de eventos">
      <thead>
        <tr>
          <th>ID</th><th>Nome</th><th>Data</th><th>Descrição</th>
          <th>Status</th><th>Arquivos</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={7}>Nenhum evento encontrado</td></tr>
        ) : rows.map((e) => (
          <tr key={e.id}>
            <td>{e.id}</td>
            <td>{e.nmEvento}</td>
            <td>{e.dtEvento}</td>
            <td>
              <button type="button" onClick={() => onShowDescricao?.(e.descricao)}>Ver</button>
            </td>
            <td>{e.status}</td>
            <td>
              <button type="button" onClick={() => onShowArquivos?.(e.id)}>Arquivos</button>
            </td>
            <td>
              <button type="button" onClick={() => onEdit?.(e)}>Editar</button>
              <button type="button" onClick={() => onDelete?.(e.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
