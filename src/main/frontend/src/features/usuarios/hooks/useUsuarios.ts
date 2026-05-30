import { ToastTone, UsuarioPayload, UsuarioRespostaDTO } from '../../../core/types';
import {
  deleteUsuario,
  fetchUsuariosByEmail,
  fetchUsuariosByName,
  saveUsuario,
} from '../../../core/api';
import { useCrudFeature } from '../../../hooks/useCrudFeature';

type UseUsuariosParams = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function useUsuarios({ onToast }: UseUsuariosParams) {
  const crud = useCrudFeature<UsuarioRespostaDTO, UsuarioPayload>({
    loadItems: () => fetchUsuariosByName(''),
    saveItem: saveUsuario,
    deleteItem: deleteUsuario,
    onToast,
    messages: {
      loadError: 'Erro ao carregar usuarios.',
      saveError: 'Erro ao salvar usuario.',
      deleteError: 'Erro ao excluir usuario.',
      deleteSuccess: 'Usuario excluido com sucesso.',
      deleteConfirm: 'Tem certeza que deseja excluir este usuario?',
      saveSuccess: (payload: UsuarioPayload) =>
        payload.id ? 'Usuario atualizado com sucesso.' : 'Usuario cadastrado com sucesso.',
    },
  });

  async function buscarUsuarios(termo: string, tipo: 'nome' | 'email') {
    try {
      crud.setCarregando(true);
      const resposta = tipo === 'email'
        ? await fetchUsuariosByEmail(termo)
        : await fetchUsuariosByName(termo);
      crud.setItems(resposta);
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao buscar usuarios.');
    } finally {
      crud.setCarregando(false);
    }
  }

  return {
    usuarios: crud.items,
    carregando: crud.carregando,
    modalAberto: crud.modalAberto,
    usuarioSelecionado: crud.itemSelecionado,
    carregarUsuarios: crud.carregarItens,
    buscarUsuarios,
    abrirCadastro: crud.abrirCadastro,
    abrirEdicao: crud.abrirEdicao,
    fecharModal: crud.fecharModal,
    salvarUsuario: crud.salvar,
    excluirUsuario: crud.excluir,
  };
}
