import { Modal } from './Modal';

export function ConfirmDialog({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p>{description}</p>
      <div className="modal-actions">
        <button className="ghost-btn" onClick={onCancel} type="button">
          Cancelar
        </button>
        <button className="primary-btn danger" onClick={onConfirm} type="button">
          Confirmar
        </button>
      </div>
    </Modal>
  );
}
