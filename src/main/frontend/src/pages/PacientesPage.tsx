import { PacientesFeature } from '../features/pacientes';
import { ToastTone } from '../core/types';

export function PacientesPage({ onToast }: { onToast: (tone: ToastTone, text: string) => void }) {
  return <PacientesFeature onToast={onToast} />;
}
