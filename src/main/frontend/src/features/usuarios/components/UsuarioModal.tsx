import { FormEvent, useEffect, useState } from 'react';
import { TpUsuario, UsuarioPayload, UsuarioRespostaDTO } from '../../../core/types';
import { Modal } from '../../../components/ui/Modal';

type UsuarioModalProps = {
  isOpen: boolean;
  initial: UsuarioRespostaDTO | null;
  onClose: () => void;
  onSave: (payload: UsuarioPayload) => Promise<void>;
};

type UsuarioFormState = {
  nome: string;
  email: string;
  senha: string;
  tpUsuario: TpUsuario;
};

const estadoInicial: UsuarioFormState = {
  nome: '',
  email: '',
  senha: '',
  tpUsuario: 'OPERADOR',
};

export function UsuarioModal({
  isOpen,
  initial,
  onClose,
  onSave,
}: UsuarioModalProps) {
  const [form, setForm] = useState<UsuarioFormState>(estadoInicial);
  const [salvando, setSalvando] = useState(false);
  const modoEdicao = Boolean(initial);

  useEffect(() => {
    if (!isOpen) return;

    if (initial) {
      setForm({
        nome: initial.nome ?? '',
        email: initial.email ?? '',
        senha: '',
        tpUsuario: initial.tpUsuario ?? 'OPERADOR',
      });
    } else {
      setForm(estadoInicial);
    }
  }, [isOpen, initial]);

  function atualizarCampo(campo: keyof UsuarioFormState, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.nome.trim()) {
      alert('Informe o nome do usuario.');
      return;
    }

    if (!form.email.trim()) {
      alert('Informe o email do usuario.');
      return;
    }

    if (!form.senha.trim()) {
      alert('Informe a senha do usuario.');
      return;
    }

    const payload: UsuarioPayload = {
      id: initial?.id,
      nome: form.nome.trim(),
      email: form.email.trim(),
      senha: form.senha,
      tpUsuario: form.tpUsuario,
    };

    try {
      setSalvando(true);
      await onSave(payload);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title={modoEdicao ? 'Editar usuario' : 'Novo usuario'}
      onClose={onClose}
    >
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Nome</span>
          <input
            type="text"
            value={form.nome}
            onChange={(event) => atualizarCampo('nome', event.target.value)}
            placeholder="Ex: Joao Silva"
            required
          />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => atualizarCampo('email', event.target.value)}
            placeholder="Ex: usuario@email.com"
            required
          />
        </label>

        <label className="form-field">
          <span>Senha</span>
          <input
            type="password"
            value={form.senha}
            onChange={(event) => atualizarCampo('senha', event.target.value)}
            placeholder={modoEdicao ? 'Informe a nova senha' : 'Informe a senha'}
            required
          />
        </label>

        <label className="form-field">
          <span>Tipo</span>
          <select
            value={form.tpUsuario}
            onChange={(event) =>
              atualizarCampo('tpUsuario', event.target.value as TpUsuario)
            }
            required
          >
            <option value="OPERADOR">Operador</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="VISITANTE">Visitante</option>
          </select>
        </label>

        <div className="form-actions">
          <button className="ghost-btn" type="button" onClick={onClose} disabled={salvando}>
            Cancelar
          </button>

          <button className="primary-btn" type="submit" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
