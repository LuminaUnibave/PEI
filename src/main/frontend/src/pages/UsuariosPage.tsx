import { ToastTone } from '../core/types';
import { UsuariosFeature } from '../features/usuarios';

type UsuariosPageProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

export function UsuariosPage({ onToast }: UsuariosPageProps) {
  return <UsuariosFeature onToast={onToast} />;
}
