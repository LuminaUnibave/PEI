import { useEffect, useState } from 'react';
import { PacientePayload, PacienteRespostaDTO, Situacao } from '../../core/types';
import { Modal } from '../ui/Modal';

export function PacienteModal({
  initial,
  isOpen,
  onClose,
  onSave,
}: {
  initial: PacienteRespostaDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: PacientePayload) => void;
}) {
  const [form, setForm] = useState<PacientePayload>({
    nome: '',
    sobrenome: '',
    cpf: '',
    dtNascimento: '',
    crtSus: '',
    email: '',
    contato: '',
    situacao: 'ATIVO',
    idUsuario: 1,
  });

  useEffect(() => {
    setForm(
      initial
        ? {
            id: initial.id,
            nome: initial.nome,
            sobrenome: initial.sobrenome,
            cpf: initial.cpf,
            dtNascimento: initial.dtNascimento?.slice(0, 10),
            crtSus: initial.crtSus,
            email: initial.email,
            contato: initial.contato,
            situacao: initial.situacao,
            idUsuario: initial.usuario?.id ?? 1,
          }
        : {
            nome: '',
            sobrenome: '',
            cpf: '',
            dtNascimento: '',
            crtSus: '',
            email: '',
            contato: '',
            situacao: 'ATIVO',
            idUsuario: 1,
          },
    );
  }, [initial, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? 'Editar paciente' : 'Novo paciente'}>
      <div className="form-grid">
        <label>
          Nome
          <input onChange={(event) => setForm({ ...form, nome: event.target.value })} value={form.nome} />
        </label>
        <label>
          Sobrenome
          <input onChange={(event) => setForm({ ...form, sobrenome: event.target.value })} value={form.sobrenome} />
        </label>
        <label>
          CPF
          <input onChange={(event) => setForm({ ...form, cpf: event.target.value })} value={form.cpf} />
        </label>
        <label>
          Cartão SUS
          <input onChange={(event) => setForm({ ...form, crtSus: event.target.value })} value={form.crtSus} />
        </label>
        <label>
          Data de nascimento
          <input onChange={(event) => setForm({ ...form, dtNascimento: event.target.value })} type="date" value={form.dtNascimento} />
        </label>
        <label>
          Contato
          <input onChange={(event) => setForm({ ...form, contato: event.target.value })} value={form.contato} />
        </label>
        <label>
          Email
          <input onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" value={form.email} />
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
