import { FormEvent, useEffect, useState } from 'react';
import { EventoPayload, EventoRespostaDTO } from '../../../core/types';
import { Modal } from '../../../components/ui/Modal';

type EventoModalProps = {
  isOpen: boolean;
  initial: EventoRespostaDTO | null;
  idUsuario: number;
  onClose: () => void;
  onSave: (payload: EventoPayload) => Promise<void>;
};

type EventoFormState = {
  nmEvento: string;
  dtEvento: string;
  descricao: string;
};

const estadoInicial: EventoFormState = {
  nmEvento: '',
  dtEvento: '',
  descricao: '',
};

export function EventoModal({
  isOpen,
  initial,
  idUsuario,
  onClose,
  onSave,
}: EventoModalProps) {
  const [form, setForm] = useState<EventoFormState>(estadoInicial);
  const [salvando, setSalvando] = useState(false);
  const modoEdicao = Boolean(initial);

  useEffect(() => {
    if (!isOpen) return;

    if (initial) {
      setForm({
        nmEvento: initial.nmEvento ?? '',
        dtEvento: initial.dtEvento ? initial.dtEvento.slice(0, 16) : '',
        descricao: initial.descricao ?? '',
      });
    } else {
      setForm(estadoInicial);
    }
  }, [isOpen, initial]);

  function atualizarCampo(campo: keyof EventoFormState, valor: string) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.nmEvento.trim()) {
      alert('Informe o nome do evento.');
      return;
    }

    if (!form.dtEvento) {
      alert('Informe a data do evento.');
      return;
    }

    const payload: EventoPayload = {
      id: initial?.id,
      nmEvento: form.nmEvento.trim(),
      dtEvento: form.dtEvento,
      descricao: form.descricao.trim() || undefined,
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
      title={modoEdicao ? 'Editar evento' : 'Novo evento'}
      onClose={onClose}
    >
      <form className="form-grid" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Nome</span>
          <input
            type="text"
            value={form.nmEvento}
            onChange={(event) => atualizarCampo('nmEvento', event.target.value)}
            placeholder="Ex: Palestra comunitaria"
            required
          />
        </label>

        <label className="form-field">
          <span>Data</span>
          <input
            type="datetime-local"
            value={form.dtEvento}
            onChange={(event) => atualizarCampo('dtEvento', event.target.value)}
            required
          />
        </label>

        <label className="form-field form-field-full">
          <span>Descricao</span>
          <textarea
            value={form.descricao}
            onChange={(event) => atualizarCampo('descricao', event.target.value)}
            placeholder="Descreva o evento"
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
