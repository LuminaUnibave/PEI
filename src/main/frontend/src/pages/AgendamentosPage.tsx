import { AgendamentosFeature } from '../features/agendamentos';
import { ToastTone } from '../core/types';

export function AgendamentosPage({ onToast }: { onToast: (tone: ToastTone, text: string) => void }) {
  return <AgendamentosFeature onToast={onToast} />;
}
