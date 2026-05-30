import { useCallback } from 'react';
import { ToastTone } from '../core/types';
import { useAsyncList } from './useAsyncList';
import { useFeatureModal } from './useFeatureModal';

type CrudMessages<TPayload> = {
  loadError: string;
  saveError: string;
  deleteError: string;
  deleteSuccess: string;
  deleteConfirm: string;
  saveSuccess: string | ((payload: TPayload) => string);
};

type UseCrudFeatureParams<TItem, TPayload> = {
  loadItems: () => Promise<TItem[]>;
  saveItem: (payload: TPayload) => Promise<unknown>;
  deleteItem: (id: number) => Promise<void>;
  onToast: (tone: ToastTone, text: string) => void;
  messages: CrudMessages<TPayload>;
};

export function useCrudFeature<TItem, TPayload>({
  loadItems,
  saveItem,
  deleteItem,
  onToast,
  messages,
}: UseCrudFeatureParams<TItem, TPayload>) {
  const list = useAsyncList<TItem>({
    load: loadItems,
    onToast,
    errorMessage: messages.loadError,
  });
  const modal = useFeatureModal<TItem>();

  const carregarItens = list.carregar;

  const salvar = useCallback(
    async (payload: TPayload) => {
      try {
        await saveItem(payload);
        await carregarItens();
        modal.fecharModal();
        const successMessage =
          typeof messages.saveSuccess === 'function'
            ? messages.saveSuccess(payload)
            : messages.saveSuccess;
        onToast('success', successMessage);
      } catch (error) {
        console.error(error);
        onToast('error', messages.saveError);
      }
    },
    [carregarItens, messages, modal, onToast, saveItem],
  );

  const excluir = useCallback(
    async (id: number) => {
      if (!window.confirm(messages.deleteConfirm)) {
        return;
      }

      try {
        await deleteItem(id);
        await carregarItens();
        onToast('success', messages.deleteSuccess);
      } catch (error) {
        console.error(error);
        onToast('error', messages.deleteError);
      }
    },
    [carregarItens, deleteItem, messages, onToast],
  );

  return {
    items: list.items,
    carregando: list.carregando,
    setItems: list.setItems,
    setCarregando: list.setCarregando,
    carregarItens,
    salvar,
    excluir,
    modalAberto: modal.modalAberto,
    itemSelecionado: modal.itemSelecionado,
    abrirCadastro: modal.abrirCadastro,
    abrirEdicao: modal.abrirEdicao,
    fecharModal: modal.fecharModal,
  };
}
