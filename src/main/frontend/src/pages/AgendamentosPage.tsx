import { ToastTone } from '../core/types';
import { AgendamentosFeature } from '../features/agendamentos';

type AgendamentosPageProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function AgendamentosPage({ onToast }: AgendamentosPageProps) {
  return <AgendamentosFeature onToast={onToast} />;
}
