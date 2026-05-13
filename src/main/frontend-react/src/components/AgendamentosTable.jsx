// PLACEHOLDER — substituir por componente real.
export function AgendamentosTable({ rows = [], onEdit, onDelete, onShowObservacao, onShowArquivos }) {
  return (
    <table className="data-table" aria-label="Lista de agendamentos">
      <thead>
        <tr>
          <th>ID</th><th>Paciente</th><th>Tipo</th><th>Data/Hora</th>
          <th>Status</th><th>Observações</th><th>Arquivos</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={8}>Nenhum agendamento encontrado</td></tr>
        ) : rows.map((a) => (
          <tr key={a.id}>
            <td>{a.id}</td>
            <td>{a.paciente?.nome}</td>
            <td>{a.tpVisita}</td>
            <td>{a.dtAgendamento}</td>
            <td>{a.status}</td>
            <td>
              <button type="button" onClick={() => onShowObservacao?.(a.observacao)}>Ver</button>
            </td>
            <td>
              <button type="button" onClick={() => onShowArquivos?.(a.id)}>Arquivos</button>
            </td>
            <td>
              <button type="button" onClick={() => onEdit?.(a)}>Editar</button>
              <button type="button" onClick={() => onDelete?.(a.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
