import { FormEvent, useEffect, useState } from 'react';
import {
  AgendamentoPayload,
  AgendamentoRespostaDTO,
  PacienteRespostaDTO,
  TpVisita,
} from '../../../core/types';
import { Modal } from '../../../components/ui/Modal';

type AgendamentoModalProps = {
  isOpen: boolean;
  initial: AgendamentoRespostaDTO | null;
  pacientes: PacienteRespostaDTO[];
  idUsuario: number;
  onClose: () => void;
  onSave: (payload: AgendamentoPayload) => Promise<void>;
};

type AgendamentoFormState = {
  idPaciente: string;
  tpVisita: TpVisita;
  dtAgendamento: string;
  observacao: string;
};

const estadoInicial: AgendamentoFormState = {
  idPaciente: '',
  tpVisita: 'CONSULTA',
  dtAgendamento: '',
  observacao: '',
};

export function AgendamentoModal({
  isOpen,
  initial,
  pacientes,
  idUsuario,
  onClose,
  onSave,
}: AgendamentoModalProps) {
  const [form, setForm] = useState<AgendamentoFormState>(estadoInicial);
  const [salvando, setSalvando] = useState(false);
  const modoEdicao = Boolean(initial);

  useEffect(() => {
    if (!isOpen) return;

    if (initial) {
      setForm({
        idPaciente: String(initial.paciente?.id ?? ''),
        tpVisita: initial.tpVisita ?? 'CONSULTA',
        dtAgendamento: initial.dtAgendamento
          ? initial.dtAgendamento.slice(0, 16)
          : '',
        observacao: initial.observacao ?? '',
      });
    } else {
      setForm(estadoInicial);
    }
  }, [isOpen, initial]);

  function atualizarCampo(campo: keyof AgendamentoFormState, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.idPaciente) {
      alert('Selecione o paciente.');
      return;
    }

    if (!form.dtAgendamento) {
      alert('Informe a data do agendamento.');
      return;
    }

    const payload: AgendamentoPayload = {
      id: initial?.id,
      idPaciente: Number(form.idPaciente),
      tpVisita: form.tpVisita,
      dtAgendamento: form.dtAgendamento,
      observacao: form.observacao.trim() || undefined,
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
      title={modoEdicao ? 'Editar agendamento' : 'Novo agendamento'}
      onClose={onClose}
    >
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Paciente</span>
          <select
            value={form.idPaciente}
            onChange={(event) => atualizarCampo('idPaciente', event.target.value)}
            required
          >
            <option value="">Selecione</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome} {paciente.sobrenome}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Tipo</span>
          <select
            value={form.tpVisita}
            onChange={(event) =>
              atualizarCampo('tpVisita', event.target.value as TpVisita)
            }
            required
          >
            <option value="CONSULTA">Consulta</option>
            <option value="VISITA">Visita</option>
          </select>
        </label>

        <label className="form-field">
          <span>Data</span>
          <input
            type="datetime-local"
            value={form.dtAgendamento}
            onChange={(event) => atualizarCampo('dtAgendamento', event.target.value)}
            required
          />
        </label>

        <label className="form-field form-field-full">
          <span>Observacao</span>
          <textarea
            value={form.observacao}
            onChange={(event) => atualizarCampo('observacao', event.target.value)}
            placeholder="Observacoes do agendamento"
            rows={4}
          />
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
