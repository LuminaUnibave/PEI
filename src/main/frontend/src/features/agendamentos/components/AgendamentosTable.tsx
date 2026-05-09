import { AgendamentoRespostaDTO } from '../../../core/types';
import { FeatureTable } from '../../shared/FeatureTable';
import { formatarDataHora } from '../../shared/formatters';
import { TableActions } from '../../shared/TableActions';

type AgendamentosTableProps = {
  agendamentos: AgendamentoRespostaDTO[];
  carregando: boolean;
  onEditar: (agendamento: AgendamentoRespostaDTO) => void;
  onExcluir: (id: number) => void;
};

export function AgendamentosTable({
  agendamentos,
  carregando,
  onEditar,
  onExcluir,
}: AgendamentosTableProps) {
  return (
    <FeatureTable
      carregando={carregando}
      columns={['Paciente', 'Tipo', 'Data', 'Situacao', 'Observacao', 'Acoes']}
      emptyText="Nenhum agendamento cadastrado."
      loadingText="Carregando agendamentos..."
      rows={agendamentos.map((agendamento) => ({
        key: agendamento.id,
        cells: [
          `${agendamento.paciente?.nome ?? ''} ${agendamento.paciente?.sobrenome ?? ''}`.trim() || '-',
          agendamento.tpVisita,
          formatarDataHora(agendamento.dtAgendamento),
          agendamento.situacao,
          agendamento.observacao || '-',
          <TableActions
            item={agendamento}
            id={agendamento.id}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />,
        ],
      }))}
    />
  );
}
