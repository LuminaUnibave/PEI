import { ToastMessage } from '../../core/types';

export function ToastStack({ items }: { items: ToastMessage[] }) {
  return (
    <div className="toast-stack">
      {items.map((item) => (
        <div className={`toast ${item.tone}`} key={item.id}>
          {item.text}
        </div>
      ))}
    </div>
  );
}
