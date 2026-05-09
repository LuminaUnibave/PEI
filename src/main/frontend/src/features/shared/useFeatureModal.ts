import { useState } from 'react';

export function useFeatureModal<TItem>() {
  const [modalAberto, setModalAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<TItem | null>(null);

  function abrirCadastro() {
    setItemSelecionado(null);
    setModalAberto(true);
  }

  function abrirEdicao(item: TItem) {
    setItemSelecionado(item);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setItemSelecionado(null);
  }

  return {
    modalAberto,
    itemSelecionado,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
  };
}
