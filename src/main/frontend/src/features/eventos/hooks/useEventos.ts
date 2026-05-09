import { useCallback, useEffect, useState } from 'react';
import { EventoPayload, EventoRespostaDTO, ToastTone } from '../../../core/types';
import { deleteEvento, fetchEventos, saveEvento } from '../../../core/api';
import { useFeatureModal } from '../../shared/useFeatureModal';

type UseEventosParams = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function useEventos({ onToast }: UseEventosParams) {
  const [eventos, setEventos] = useState<EventoRespostaDTO[]>([]);
  const [carregando, setCarregando] = useState(false);
  const {
    modalAberto,
    itemSelecionado: eventoSelecionado,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
  } = useFeatureModal<EventoRespostaDTO>();

  const carregarEventos = useCallback(async () => {
    try {
      setCarregando(true);
      const resposta = await fetchEventos();
      setEventos(resposta);
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao carregar eventos.');
    } finally {
      setCarregando(false);
    }
  }, [onToast]);

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  async function salvarEvento(payload: EventoPayload) {
    try {
      await saveEvento(payload);
      onToast(
        'success',
        payload.id ? 'Evento atualizado com sucesso.' : 'Evento cadastrado com sucesso.',
      );
      fecharModal();
      await carregarEventos();
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao salvar evento.');
    }
  }

  async function excluirEvento(id: number) {
    const confirmou = window.confirm('Tem certeza que deseja excluir este evento?');
    if (!confirmou) return;

    try {
      await deleteEvento(id);
      onToast('success', 'Evento excluido com sucesso.');
      await carregarEventos();
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao excluir evento.');
    }
  }

  return {
    eventos,
    carregando,
    modalAberto,
    eventoSelecionado,
    carregarEventos,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
    salvarEvento,
    excluirEvento,
  };
}
