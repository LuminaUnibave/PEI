import { useCallback, useEffect, useState } from 'react';
import { ToastTone, UsuarioPayload, UsuarioRespostaDTO } from '../../../core/types';
import {
  deleteUsuario,
  fetchUsuariosByEmail,
  fetchUsuariosByName,
  saveUsuario,
} from '../../../core/api';
import { useFeatureModal } from '../../shared/useFeatureModal';

type UseUsuariosParams = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function useUsuarios({ onToast }: UseUsuariosParams) {
  const [usuarios, setUsuarios] = useState<UsuarioRespostaDTO[]>([]);
  const [carregando, setCarregando] = useState(false);
  const {
    modalAberto,
    itemSelecionado: usuarioSelecionado,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
  } = useFeatureModal<UsuarioRespostaDTO>();

  const carregarUsuarios = useCallback(async () => {
    try {
      setCarregando(true);
      const resposta = await fetchUsuariosByName('');
      setUsuarios(resposta);
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao carregar usuarios.');
    } finally {
      setCarregando(false);
    }
  }, [onToast]);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  async function buscarUsuarios(termo: string, tipo: 'nome' | 'email') {
    try {
      setCarregando(true);
      const resposta = tipo === 'email'
        ? await fetchUsuariosByEmail(termo)
        : await fetchUsuariosByName(termo);
      setUsuarios(resposta);
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao buscar usuarios.');
    } finally {
      setCarregando(false);
    }
  }

  async function salvarUsuario(payload: UsuarioPayload) {
    try {
      await saveUsuario(payload);
      onToast(
        'success',
        payload.id ? 'Usuario atualizado com sucesso.' : 'Usuario cadastrado com sucesso.',
      );
      fecharModal();
      await carregarUsuarios();
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao salvar usuario.');
    }
  }

  async function excluirUsuario(id: number) {
    const confirmou = window.confirm('Tem certeza que deseja excluir este usuario?');
    if (!confirmou) return;

    try {
      await deleteUsuario(id);
      onToast('success', 'Usuario excluido com sucesso.');
      await carregarUsuarios();
    } catch (error) {
      console.error(error);
      onToast('error', 'Erro ao excluir usuario.');
    }
  }

  return {
    usuarios,
    carregando,
    modalAberto,
    usuarioSelecionado,
    carregarUsuarios,
    buscarUsuarios,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
    salvarUsuario,
    excluirUsuario,
  };
}
