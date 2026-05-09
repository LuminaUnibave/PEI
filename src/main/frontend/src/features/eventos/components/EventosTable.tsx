import { EventoRespostaDTO } from '../../../core/types';
import { FeatureTable } from '../../shared/FeatureTable';
import { formatarDataHora } from '../../shared/formatters';
import { TableActions } from '../../shared/TableActions';

type EventosTableProps = {
  eventos: EventoRespostaDTO[];
  carregando: boolean;
  onEditar: (evento: EventoRespostaDTO) => void;
  onExcluir: (id: number) => void;
};

export function EventosTable({
  eventos,
  carregando,
  onEditar,
  onExcluir,
}: EventosTableProps) {
  return (
    <FeatureTable
      carregando={carregando}
      columns={['Nome', 'Data', 'Descricao', 'Situacao', 'Acoes']}
      emptyText="Nenhum evento cadastrado."
      loadingText="Carregando eventos..."
      rows={eventos.map((evento) => ({
        key: evento.id,
        cells: [
          evento.nmEvento,
          formatarDataHora(evento.dtEvento),
          evento.descricao || '-',
          evento.situacao,
          <TableActions
            item={evento}
            id={evento.id}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />,
        ],
      }))}
    />
  );
}
