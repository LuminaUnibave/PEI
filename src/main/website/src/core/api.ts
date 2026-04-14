export interface EventoPublico {
  id: number;
  nmEvento?: string;
  descricao?: string;
  dtEvento: string;
  situacao: string;
}

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? '';

export async function fetchEventosPublicos(): Promise<EventoPublico[]> {
  const response = await fetch(`${API_BASE}/evento/buscar/todos`);
  if (!response.ok) {
    throw new Error('Falha ao buscar eventos');
  }

  return (await response.json()) as EventoPublico[];
}
