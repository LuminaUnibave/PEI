import { useEffect, useState } from 'react';
import { AgendamentoPayload, AgendamentoRespostaDTO, PacienteRespostaDTO } from '../../core/types';
import { Modal } from '../ui/Modal';

export function AgendamentoModal({
  pacientes,
  initial,
  isOpen,
  onClose,
  onSave,
}: {
  pacientes: PacienteRespostaDTO[];
  initial: AgendamentoRespostaDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: AgendamentoPayload) => void;
}) {
  const [form, setForm] = useState<AgendamentoPayload>({
    tpVisita: 'VISITA',
    dtAgendamento: '',
    observacao: '',
    idPaciente: 0,
    idUsuario: 1,
  });

  useEffect(() => {
    setForm(
      initial
        ? {
            id: initial.id,
            tpVisita: initial.tpVisita,
            dtAgendamento: initial.dtAgendamento.slice(0, 16),
            observacao: initial.observacao,
            idPaciente: initial.paciente.id,
            idUsuario: initial.usuario?.id ?? 1,
          }
        : {
            tpVisita: 'VISITA',
            dtAgendamento: '',
            observacao: '',
            idPaciente: pacientes[0]?.id ?? 0,
            idUsuario: 1,
          },
    );
  }, [initial, isOpen, pacientes]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? 'Editar agendamento' : 'Novo agendamento'}>
      <div className="form-grid">
        <label>
          Paciente
          <select onChange={(event) => setForm({ ...form, idPaciente: Number(event.target.value) })} value={form.idPaciente}>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome} {paciente.sobrenome ?? ''}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tipo de visita
          <select onChange={(event) => setForm({ ...form, tpVisita: event.target.value as 'VISITA' | 'CONSULTA' })} value={form.tpVisita}>
            <option value="VISITA">VISITA</option>
            <option value="CONSULTA">CONSULTA</option>
          </select>
        </label>
        <label>
          Data e hora
          <input onChange={(event) => setForm({ ...form, dtAgendamento: event.target.value })} type="datetime-local" value={form.dtAgendamento} />
        </label>
        <label className="full">
          Observação
          <textarea onChange={(event) => setForm({ ...form, observacao: event.target.value })} rows={4} value={form.observacao} />
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
