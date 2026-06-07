import { deletePaciente, fetchPacientes, savePaciente } from '../../../core/api';
import { PacientePayload, PacienteRespostaDTO, ToastTone } from '../../../core/types';
import { useCrudFeature } from '../../../hooks/useCrudFeature';

type UsePacientesParams = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function usePacientes({ onToast }: UsePacientesParams) {
  const crud = useCrudFeature<PacienteRespostaDTO, PacientePayload>({
    loadItems: fetchPacientes,
    saveItem: savePaciente,
    deleteItem: deletePaciente,
    onToast,
    messages: {
      loadError: 'Erro ao carregar pacientes.',
      saveError: 'Erro ao salvar paciente.',
      deleteError: 'Erro ao excluir paciente.',
      deleteSuccess: 'Paciente excluido com sucesso.',
      deleteConfirm: 'Tem certeza que deseja excluir este paciente?',
      saveSuccess: (payload) =>
        payload.id ? 'Paciente atualizado com sucesso.' : 'Paciente cadastrado com sucesso.',
    },
  });

  return {
    pacientes: crud.items,
    carregando: crud.carregando,
    modalAberto: crud.modalAberto,
    pacienteSelecionado: crud.itemSelecionado,
    carregarPacientes: crud.carregarItens,
    abrirCadastro: crud.abrirCadastro,
    abrirEdicao: crud.abrirEdicao,
    fecharModal: crud.fecharModal,
    salvarPaciente: crud.salvar,
    excluirPaciente: crud.excluir,
  };
}
