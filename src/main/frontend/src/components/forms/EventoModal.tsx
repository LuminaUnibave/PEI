import { useEffect, useState } from 'react';
import { EventoPayload, EventoRespostaDTO, Situacao } from '../../core/types';
import { Modal } from '../ui/Modal';

export function EventoModal({
  initial,
  isOpen,
  onClose,
  onSave,
}: {
  initial: EventoRespostaDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: EventoPayload) => void;
}) {
  const [form, setForm] = useState<EventoPayload>({
    nmEvento: '',
    dtEvento: '',
    descricao: '',
    situacao: 'ATIVO',
    idUsuario: 1,
  });

  useEffect(() => {
    setForm(
      initial
        ? {
            id: initial.id,
            nmEvento: initial.nmEvento ?? '',
            dtEvento: initial.dtEvento.slice(0, 16),
            descricao: initial.descricao,
            situacao: initial.situacao,
            idUsuario: initial.usuario?.id ?? 1,
          }
        : {
            nmEvento: '',
            dtEvento: '',
            descricao: '',
            situacao: 'ATIVO',
            idUsuario: 1,
          },
    );
  }, [initial, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? 'Editar evento' : 'Novo evento'}>
      <div className="form-grid">
        <label>
          Nome do evento
          <input onChange={(event) => setForm({ ...form, nmEvento: event.target.value })} value={form.nmEvento} />
        </label>
        <label>
          Data e hora
          <input onChange={(event) => setForm({ ...form, dtEvento: event.target.value })} type="datetime-local" value={form.dtEvento} />
        </label>
        <label>
          Situação
          <select onChange={(event) => setForm({ ...form, situacao: event.target.value as Situacao })} value={form.situacao}>
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
            <option value="FINALIZADO">FINALIZADO</option>
          </select>
        </label>
        <label className="full">
          Descrição
          <textarea onChange={(event) => setForm({ ...form, descricao: event.target.value })} rows={4} value={form.descricao} />
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
