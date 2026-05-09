import { FormEvent, useState } from 'react';
import { ToastTone } from '../../core/types';
import { UsuarioModal } from './components/UsuarioModal';
import { UsuariosTable } from './components/UsuariosTable';
import { useUsuarios } from './hooks/useUsuarios';

type UsuariosFeatureProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function UsuariosFeature({ onToast }: UsuariosFeatureProps) {
  const [termoBusca, setTermoBusca] = useState('');
  const [tipoBusca, setTipoBusca] = useState<'nome' | 'email'>('nome');
  const {
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
  } = useUsuarios({ onToast });

  async function handleBuscar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!termoBusca.trim()) {
      await carregarUsuarios();
      return;
    }

    await buscarUsuarios(termoBusca.trim(), tipoBusca);
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Usuarios</h1>
          <p>Gerencie os usuarios cadastrados no sistema.</p>
        </div>

        <button className="primary-btn" type="button" onClick={abrirCadastro}>
          Novo usuario
        </button>
      </div>

      <form className="toolbar" onSubmit={handleBuscar}>
        <input
          type="search"
          value={termoBusca}
          onChange={(event) => setTermoBusca(event.target.value)}
          placeholder="Buscar usuario"
        />

        <select
          value={tipoBusca}
          onChange={(event) => setTipoBusca(event.target.value as 'nome' | 'email')}
        >
          <option value="nome">Nome</option>
          <option value="email">Email</option>
        </select>

        <button className="ghost-btn" type="submit">
          Buscar
        </button>
      </form>

      <div className="content-card">
        <UsuariosTable
          usuarios={usuarios}
          carregando={carregando}
          onEditar={abrirEdicao}
          onExcluir={excluirUsuario}
        />
      </div>

      <UsuarioModal
        initial={usuarioSelecionado}
        isOpen={modalAberto}
        onClose={fecharModal}
        onSave={salvarUsuario}
      />
    </section>
  );
}
