import { UsuariosFeature } from '../features/usuarios';
import { ToastTone } from '../core/types';

export function UsuariosPage({ onToast }: { onToast: (tone: ToastTone, text: string) => void }) {
  return <UsuariosFeature onToast={onToast} />;
}
