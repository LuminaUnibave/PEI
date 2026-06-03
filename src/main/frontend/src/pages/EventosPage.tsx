import { EventosFeature } from '../features/eventos';
import { ToastTone } from '../core/types';

export function EventosPage({ onToast }: { onToast: (tone: ToastTone, text: string) => void }) {
  return <EventosFeature onToast={onToast} />;
}
