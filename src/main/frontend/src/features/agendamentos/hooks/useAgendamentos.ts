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
import { useAsyncList } from '../../../hooks/useAsyncList';
import { useCrudFeature } from '../../../hooks/useCrudFeature';

type UseAgendamentosParams = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function useAgendamentos({ onToast }: UseAgendamentosParams) {
  const crud = useCrudFeature<AgendamentoRespostaDTO, AgendamentoPayload>({
    loadItems: fetchAgendamentos,
    saveItem: saveAgendamento,
    deleteItem: deleteAgendamento,
    onToast,
    messages: {
      loadError: 'Erro ao carregar agendamentos.',
      saveError: 'Erro ao salvar agendamento.',
      deleteError: 'Erro ao excluir agendamento.',
      deleteSuccess: 'Agendamento excluido com sucesso.',
      deleteConfirm: 'Tem certeza que deseja excluir este agendamento?',
      saveSuccess: (payload) =>
        payload.id
          ? 'Agendamento atualizado com sucesso.'
          : 'Agendamento cadastrado com sucesso.',
    },
  });
  const pacientesState = useAsyncList<PacienteRespostaDTO>({
    load: fetchPacientes,
    onToast,
    errorMessage: 'Erro ao carregar pacientes para agendamento.',
  });

  return {
    agendamentos: crud.items,
    pacientes: pacientesState.items,
    carregando: crud.carregando,
    modalAberto: crud.modalAberto,
    agendamentoSelecionado: crud.itemSelecionado,
    carregarAgendamentos: crud.carregarItens,
    carregarPacientes: pacientesState.carregar,
    abrirCadastro: crud.abrirCadastro,
    abrirEdicao: crud.abrirEdicao,
    fecharModal: crud.fecharModal,
    salvarAgendamento: crud.salvar,
    excluirAgendamento: crud.excluir,
  };
}
