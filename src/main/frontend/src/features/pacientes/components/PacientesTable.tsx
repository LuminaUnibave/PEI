import { PacienteRespostaDTO } from '../../../core/types';
import { FeatureTable } from '../../shared/FeatureTable';
import { formatarData } from '../../shared/formatters';
import { TableActions } from '../../shared/TableActions';

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
  return (
    <FeatureTable
      carregando={carregando}
      columns={[
        'Nome',
        'CPF',
        'Data de nascimento',
        'Contato',
        'Email',
        'Situacao',
        'Acoes',
      ]}
      emptyText="Nenhum paciente cadastrado."
      loadingText="Carregando pacientes..."
      rows={pacientes.map((paciente) => ({
        key: paciente.id,
        cells: [
          `${paciente.nome} ${paciente.sobrenome}`,
          paciente.cpf,
          formatarData(paciente.dtNascimento),
          paciente.contato || '-',
          paciente.email || '-',
          paciente.situacao,
          <TableActions
            item={paciente}
            id={paciente.id}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />,
        ],
      }))}
    />
  );
}
