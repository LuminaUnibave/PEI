import { PacienteRespostaDTO } from '../../../core/types';

type PacientesTableProps = {
  pacientes: PacienteRespostaDTO[];
  carregando: boolean;
  onEditar: (paciente: PacienteRespostaDTO) => void;
  onExcluir: (id: number) => void;
};

export function PacientesTable({
  pacientes,
  carregando,
  onEditar,
  onExcluir,
}: PacientesTableProps) {
  if (carregando) {
    return <p>Carregando pacientes...</p>;
  }

  if (!pacientes.length) {
    return <p>Nenhum paciente cadastrado.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de nascimento</th>
            <th>Contato</th>
            <th>Email</th>
            <th>Situação</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>
                {paciente.nome} {paciente.sobrenome}
              </td>
              <td>{paciente.cpf}</td>
              <td>{formatarData(paciente.dtNascimento)}</td>
              <td>{paciente.contato || '-'}</td>
              <td>{paciente.email || '-'}</td>
              <td>{paciente.situacao}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="ghost-btn"
                    type="button"
                    onClick={() => onEditar(paciente)}
                  >
                    Editar
                  </button>

                  <button
                    className="danger-btn"
                    type="button"
                    onClick={() => onExcluir(paciente.id)}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatarData(data?: string) {
  if (!data) return '-';

  const [ano, mes, dia] = data.slice(0, 10).split('-');

  if (!ano || !mes || !dia) return data;

  return `${dia}/${mes}/${ano}`;
}