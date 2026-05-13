// PLACEHOLDER — substituir por componente real.
export function PacientesTable({ rows = [], onEdit, onDelete }) {
  return (
    <table className="data-table" aria-label="Lista de pacientes">
      <thead>
        <tr>
          <th>ID</th><th>Nome</th><th>CPF</th><th>Data Nasc.</th>
          <th>Email</th><th>Telefone</th><th>Status</th><th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr><td colSpan={8}>Nenhum paciente encontrado</td></tr>
        ) : rows.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nome}</td>
            <td>{p.cpf}</td>
            <td>{p.dtNascimento}</td>
            <td>{p.email}</td>
            <td>{p.contato}</td>
            <td>{p.situacao}</td>
            <td>
              <button type="button" onClick={() => onEdit?.(p)}>Editar</button>
              <button type="button" onClick={() => onDelete?.(p.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
