import { ToastTone } from '../core/types';
import { PacientesFeature } from '../features/pacientes';

type PacientesPageProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function PacientesPage({ onToast }: PacientesPageProps) {
  return <PacientesFeature onToast={onToast} />;
}
