export function LoadingCard({ text = 'Carregando dados...' }: { text?: string }) {
  return <div className="loading-card">{text}</div>;
}
