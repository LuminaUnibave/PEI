import { useCallback, useEffect, useState } from 'react';
import {
  PacientePayload,
  PacienteRespostaDTO,
  ToastTone,
} from '../../../core/types';
import {
  savePaciente,
  deletePaciente,
  fetchPacientes,
} from '../../../core/api';

type UsePacientesParams = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function usePacientes({ onToast }: UsePacientesParams) {
  const [pacientes, setPacientes] = useState<PacienteRespostaDTO[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] =
    useState<PacienteRespostaDTO | null>(null);

  const carregarPacientes = useCallback(async () => {
    try {
      setCarregando(true);

      const resposta = await fetchPacientes();

      setPacientes(resposta);
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao carregar pacientes.');
    } finally {
      setCarregando(false);
    }
  }, [onToast]);

  useEffect(() => {
    carregarPacientes();
  }, [carregarPacientes]);

  function abrirCadastro() {
    setPacienteSelecionado(null);
    setModalAberto(true);
  }

  function abrirEdicao(paciente: PacienteRespostaDTO) {
    setPacienteSelecionado(paciente);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setPacienteSelecionado(null);
  }

  async function salvarPaciente(payload: PacientePayload) {
    try {
      if (payload.id) {
        await savePaciente(payload);
        onToast('success', 'Paciente atualizado com sucesso.');
      } else {
        await savePaciente(payload);
        onToast('success', 'Paciente cadastrado com sucesso.');
      }

      fecharModal();
      await carregarPacientes();
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao salvar paciente.');
    }
  }

  async function excluirPaciente(id: number) {
    const confirmou = window.confirm(
      'Tem certeza que deseja excluir este paciente?',
    );

    if (!confirmou) return;

    try {
      await deletePaciente(id);
      onToast('success', 'Paciente excluído com sucesso.');
      await carregarPacientes();
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao excluir paciente.');
    }
  }

  return {
    pacientes,
    carregando,
    modalAberto,
    pacienteSelecionado,
    carregarPacientes,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
    salvarPaciente,
    excluirPaciente,
  };
}