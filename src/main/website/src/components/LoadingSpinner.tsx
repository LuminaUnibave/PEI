export function LoadingSpinner({ text = 'Carregando...' }: { text?: string }) {
  return <div className="notice">{text}</div>;
}
