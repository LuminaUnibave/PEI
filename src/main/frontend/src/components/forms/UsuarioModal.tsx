import { useEffect, useState } from 'react';
import { Situacao, TpUsuario, UsuarioPayload, UsuarioRespostaDTO } from '../../core/types';
import { Modal } from '../ui/Modal';

export function UsuarioModal({
  initial,
  isOpen,
  onClose,
  onSave,
}: {
  initial: UsuarioRespostaDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: UsuarioPayload) => void;
}) {
  const [form, setForm] = useState<UsuarioPayload>({
    nome: '',
    email: '',
    senha: '',
    tpUsuario: 'OPERADOR',
    situacao: 'ATIVO',
  });

  useEffect(() => {
    setForm(
      initial
        ? {
            id: initial.id,
            nome: initial.nome,
            email: initial.email,
            senha: '',
            tpUsuario: initial.tpUsuario,
            situacao: initial.situacao,
          }
        : {
            nome: '',
            email: '',
            senha: '',
            tpUsuario: 'OPERADOR',
            situacao: 'ATIVO',
          },
    );
  }, [initial, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? 'Editar usuário' : 'Novo usuário'}>
      <div className="form-grid">
        <label>
          Nome
          <input onChange={(event) => setForm({ ...form, nome: event.target.value })} value={form.nome} />
        </label>
        <label>
          Email
          <input onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" value={form.email} />
        </label>
        <label>
          Senha
          <input onChange={(event) => setForm({ ...form, senha: event.target.value })} type="password" value={form.senha} />
        </label>
        <label>
          Perfil
          <select onChange={(event) => setForm({ ...form, tpUsuario: event.target.value as TpUsuario })} value={form.tpUsuario}>
            <option value="OPERADOR">OPERADOR</option>
            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
            <option value="VISITANTE">VISITANTE</option>
          </select>
        </label>
        <label>
          Situação
          <select onChange={(event) => setForm({ ...form, situacao: event.target.value as Situacao })} value={form.situacao}>
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
            <option value="PENDENTE">PENDENTE</option>
          </select>
        </label>
      </div>
      <div className="modal-actions">
        <button className="ghost-btn" onClick={onClose} type="button">
          Cancelar
        </button>
        <button className="primary-btn" onClick={() => onSave(form)} type="button">
          Salvar
        </button>
      </div>
    </Modal>
  );
}
