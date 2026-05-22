import { EventoPayload, EventoRespostaDTO, ToastTone } from '../../../core/types';
import { deleteEvento, fetchEventos, saveEvento } from '../../../core/api';
import { useCrudFeature } from '../../../hooks/useCrudFeature';

type UseEventosParams = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function useEventos({ onToast }: UseEventosParams) {
  const crud = useCrudFeature<EventoRespostaDTO, EventoPayload>({
    loadItems: fetchEventos,
    saveItem: saveEvento,
    deleteItem: deleteEvento,
    onToast,
    messages: {
      loadError: 'Erro ao carregar eventos.',
      saveError: 'Erro ao salvar evento.',
      deleteError: 'Erro ao excluir evento.',
      deleteSuccess: 'Evento excluido com sucesso.',
      deleteConfirm: 'Tem certeza que deseja excluir este evento?',
      saveSuccess: (payload) =>
        payload.id ? 'Evento atualizado com sucesso.' : 'Evento cadastrado com sucesso.',
    },
  });

  return {
    eventos: crud.items,
    carregando: crud.carregando,
    modalAberto: crud.modalAberto,
    eventoSelecionado: crud.itemSelecionado,
    carregarEventos: crud.carregarItens,
    abrirCadastro: crud.abrirCadastro,
    abrirEdicao: crud.abrirEdicao,
    fecharModal: crud.fecharModal,
    salvarEvento: crud.salvar,
    excluirEvento: crud.excluir,
  };
}
