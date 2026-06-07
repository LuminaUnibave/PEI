import { ToastTone } from '../core/types';
import { EventosFeature } from '../features/eventos';

type EventosPageProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function EventosPage({ onToast }: EventosPageProps) {
  return <EventosFeature onToast={onToast} />;
}
