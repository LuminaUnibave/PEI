export function StatusBadge({ value }: { value: string }) {
  const tone = ['ATIVO', 'VISITA', 'ADMINISTRADOR'].includes(value)
    ? 'success'
    : ['PENDENTE', 'CONSULTA', 'OPERADOR'].includes(value)
      ? 'info'
      : ['FINALIZADO'].includes(value)
        ? 'warning'
        : ['EXCLUIDO'].includes(value)
          ? 'error'
          : 'neutral';

  return <span className={`status-badge ${tone}`}>{value}</span>;
}
