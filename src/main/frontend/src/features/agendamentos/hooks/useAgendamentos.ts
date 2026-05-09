import { useCallback, useEffect, useState } from 'react';
import {
  AgendamentoPayload,
  AgendamentoRespostaDTO,
  PacienteRespostaDTO,
  ToastTone,
} from '../../../core/types';
import {
  deleteAgendamento,
  fetchAgendamentos,
  fetchPacientes,
  saveAgendamento,
} from '../../../core/api';
import { useFeatureModal } from '../../shared/useFeatureModal';

type UseAgendamentosParams = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function useAgendamentos({ onToast }: UseAgendamentosParams) {
  const [agendamentos, setAgendamentos] = useState<AgendamentoRespostaDTO[]>([]);
  const [pacientes, setPacientes] = useState<PacienteRespostaDTO[]>([]);
  const [carregando, setCarregando] = useState(false);
  const {
    modalAberto,
    itemSelecionado: agendamentoSelecionado,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
  } = useFeatureModal<AgendamentoRespostaDTO>();

  const carregarAgendamentos = useCallback(async () => {
    try {
      setCarregando(true);
      const resposta = await fetchAgendamentos();
      setAgendamentos(resposta);
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao carregar agendamentos.');
    } finally {
      setCarregando(false);
    }
  }, [onToast]);

  const carregarPacientes = useCallback(async () => {
    try {
      const resposta = await fetchPacientes();
      setPacientes(resposta);
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao carregar pacientes para agendamento.');
    }
  }, [onToast]);

  useEffect(() => {
    carregarAgendamentos();
    carregarPacientes();
  }, [carregarAgendamentos, carregarPacientes]);

  async function salvarAgendamento(payload: AgendamentoPayload) {
    try {
      await saveAgendamento(payload);
      onToast(
        'success',
        payload.id
          ? 'Agendamento atualizado com sucesso.'
          : 'Agendamento cadastrado com sucesso.',
      );
      fecharModal();
      await carregarAgendamentos();
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao salvar agendamento.');
    }
  }

  async function excluirAgendamento(id: number) {
    const confirmou = window.confirm(
      'Tem certeza que deseja excluir este agendamento?',
    );
    if (!confirmou) return;

    try {
      await deleteAgendamento(id);
      onToast('success', 'Agendamento excluido com sucesso.');
      await carregarAgendamentos();
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao excluir agendamento.');
    }
  }

  return {
    agendamentos,
    pacientes,
    carregando,
    modalAberto,
    agendamentoSelecionado,
    carregarAgendamentos,
    carregarPacientes,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
    salvarAgendamento,
    excluirAgendamento,
  };
}
