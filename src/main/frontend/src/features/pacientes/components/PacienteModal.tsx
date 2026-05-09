import {  FormEvent, useEffect, useState } from 'react';
import {
  PacientePayload,
  PacienteRespostaDTO,
  Situacao,
} from '../../../core/types';
import { Modal } from '../../../components/ui/Modal';


type PacienteModalProps = {
  isOpen: boolean;
  initial: PacienteRespostaDTO | null;
  idUsuario: number;
  onClose: () => void;
  onSave: (payload: PacientePayload) => Promise<void>;
};

type PacienteFormState = {
  nome: string;
  sobrenome: string;
  cpf: string;
  dtNascimento: string;
  crtSus: string;
  email: string;
  contato: string;
  situacao: Situacao;
};

const estadoInicial: PacienteFormState = {
  nome: '',
  sobrenome: '',
  cpf: '',
  dtNascimento: '',
  crtSus: '',
  email: '',
  contato: '',
  situacao: 'ATIVO',
};

export function PacienteModal({
  isOpen,
  initial,
  idUsuario,
  onClose,
  onSave,
}: PacienteModalProps) {
  const [form, setForm] = useState<PacienteFormState>(estadoInicial);
  const [salvando, setSalvando] = useState(false);

  const modoEdicao = Boolean(initial);

  useEffect(() => {
    if (!isOpen) return;

    if (initial) {
      setForm({
        nome: initial.nome ?? '',
        sobrenome: initial.sobrenome ?? '',
        cpf: initial.cpf ?? '',
        dtNascimento: initial.dtNascimento
          ? initial.dtNascimento.slice(0, 10)
          : '',
        crtSus: initial.crtSus ?? '',
        email: initial.email ?? '',
        contato: initial.contato ?? '',
        situacao: initial.situacao ?? 'ATIVO',
      });
    } else {
      setForm(estadoInicial);
    }
  }, [isOpen, initial]);

  function atualizarCampo(
    campo: keyof PacienteFormState,
    valor: string,
  ) {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.nome.trim()) {
      alert('Informe o nome do paciente.');
      return;
    }

    if (!form.sobrenome.trim()) {
      alert('Informe o sobrenome do paciente.');
      return;
    }

    if (!form.cpf.trim()) {
      alert('Informe o CPF do paciente.');
      return;
    }

    if (!form.dtNascimento) {
      alert('Informe a data de nascimento.');
      return;
    }

    const payload: PacientePayload = {
      id: initial?.id,
      nome: form.nome.trim(),
      sobrenome: form.sobrenome.trim(),
      cpf: form.cpf.trim(),
      dtNascimento: form.dtNascimento,
      crtSus: form.crtSus.trim() || undefined,
      email: form.email.trim() || undefined,
      contato: form.contato.trim() || undefined,
      situacao: form.situacao,
      idUsuario,
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
      title={modoEdicao ? 'Editar paciente' : 'Novo paciente'}
      onClose={onClose}
    >
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Nome</span>
          <input
            type="text"
            value={form.nome}
            onChange={(event) => atualizarCampo('nome', event.target.value)}
            placeholder="Ex: João"
            required
          />
        </label>

        <label className="form-field">
          <span>Sobrenome</span>
          <input
            type="text"
            value={form.sobrenome}
            onChange={(event) =>
              atualizarCampo('sobrenome', event.target.value)
            }
            placeholder="Ex: Silva"
            required
          />
        </label>

        <label className="form-field">
          <span>CPF</span>
          <input
            type="text"
            value={form.cpf}
            onChange={(event) => atualizarCampo('cpf', event.target.value)}
            placeholder="Ex: 111.222.333-44"
            required
          />
        </label>

        <label className="form-field">
          <span>Data de nascimento</span>
          <input
            type="date"
            value={form.dtNascimento}
            onChange={(event) =>
              atualizarCampo('dtNascimento', event.target.value)
            }
            required
          />
        </label>

        <label className="form-field">
          <span>Cartão SUS</span>
          <input
            type="text"
            value={form.crtSus}
            onChange={(event) => atualizarCampo('crtSus', event.target.value)}
            placeholder="Ex: 212174936760000"
          />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => atualizarCampo('email', event.target.value)}
            placeholder="Ex: paciente@email.com"
          />
        </label>

        <label className="form-field">
          <span>Contato</span>
          <input
            type="text"
            value={form.contato}
            onChange={(event) => atualizarCampo('contato', event.target.value)}
            placeholder="Ex: (48) 99999-9999"
          />
        </label>

        <label className="form-field">
          <span>Situação</span>
          <select
            value={form.situacao}
            onChange={(event) =>
              atualizarCampo('situacao', event.target.value as Situacao)
            }
            required
          >
            <option value="ATIVO">Ativo</option>
            <option value="INATIVO">Inativo</option>
          </select>
        </label>

        <div className="form-actions">
          <button
            className="ghost-btn"
            type="button"
            onClick={onClose}
            disabled={salvando}
          >
            Cancelar
          </button>

          <button
            className="primary-btn"
            type="submit"
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}