import { UsuarioRespostaDTO } from '../../../core/types';
import { FeatureTable } from '../../shared/FeatureTable';
import { TableActions } from '../../shared/TableActions';

type UsuariosTableProps = {
  usuarios: UsuarioRespostaDTO[];
  carregando: boolean;
  onEditar: (usuario: UsuarioRespostaDTO) => void;
  onExcluir: (id: number) => void;
};

export function UsuariosTable({
  usuarios,
  carregando,
  onEditar,
  onExcluir,
}: UsuariosTableProps) {
  return (
    <FeatureTable
      carregando={carregando}
      columns={['Nome', 'Email', 'Tipo', 'Situacao', 'Acoes']}
      emptyText="Nenhum usuario cadastrado."
      loadingText="Carregando usuarios..."
      rows={usuarios.map((usuario) => ({
        key: usuario.id,
        cells: [
          usuario.nome,
          usuario.email,
          usuario.tpUsuario,
          usuario.situacao,
          <TableActions
            item={usuario}
            id={usuario.id}
            onEditar={onEditar}
            onExcluir={onExcluir}
          />,
        ],
      }))}
    />
  );
}
