import {
  AgendamentoPayload,
  AgendamentoRespostaDTO,
  ArquivoMeta,
  DashboardCounts,
  EventoPayload,
  EventoRespostaDTO,
  LoginRespostaDTO,
  PacientePayload,
  PacienteRespostaDTO,
  UsuarioPayload,
  UsuarioRespostaDTO,
} from './types';

const API_BASE = process.env.REACT_APP_API_BASE_URL ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: 'application/json',
      ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Erro ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}

export async function login(email: string, senha: string): Promise<LoginRespostaDTO> {
  return request<LoginRespostaDTO>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}

export async function fetchUsuarioByEmail(email: string): Promise<UsuarioRespostaDTO> {
  return request<UsuarioRespostaDTO>('/usuario/buscar/email?email=' + encodeURIComponent(email));
}

export async function fetchDashboardCounts(): Promise<DashboardCounts> {
  const [pacientes, agendamentos, eventos, usuarios] = await Promise.all([
    request<number>('/paciente/contar'),
    request<number>('/agendamento/contar'),
    request<number>('/evento/contar'),
    request<number>('/usuario/contar'),
  ]);

  return { pacientes, agendamentos, eventos, usuarios };
}

export async function fetchPacientes(): Promise<PacienteRespostaDTO[]> {
  return request<PacienteRespostaDTO[]>('/paciente/buscar/todos');
}

export async function savePaciente(payload: PacientePayload): Promise<PacienteRespostaDTO> {
  return request<PacienteRespostaDTO>(payload.id ? '/paciente/atualizar' : '/paciente/salvar', {
    method: payload.id ? 'PUT' : 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deletePaciente(id: number): Promise<void> {
  await request<void>(`/paciente/deletar/id?id=${id}`, { method: 'DELETE' });
}

export async function fetchAgendamentos(): Promise<AgendamentoRespostaDTO[]> {
  return request<AgendamentoRespostaDTO[]>('/agendamento/buscar/todos');
}

export async function saveAgendamento(payload: AgendamentoPayload): Promise<AgendamentoRespostaDTO> {
  return request<AgendamentoRespostaDTO>(payload.id ? '/agendamento/atualizar' : '/agendamento/salvar', {
    method: payload.id ? 'PUT' : 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteAgendamento(id: number): Promise<void> {
  await request<void>(`/agendamento/deletar/id?id=${id}`, { method: 'DELETE' });
}

export async function fetchEventos(): Promise<EventoRespostaDTO[]> {
  return request<EventoRespostaDTO[]>('/evento/buscar/todos');
}

export async function saveEvento(payload: EventoPayload): Promise<EventoRespostaDTO> {
  return request<EventoRespostaDTO>(payload.id ? '/evento/atualizar' : '/evento/salvar', {
    method: payload.id ? 'PUT' : 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteEvento(id: number): Promise<void> {
  await request<void>(`/evento/deletar/id?id=${id}`, { method: 'DELETE' });
}

export async function fetchUsuariosByName(nome: string): Promise<UsuarioRespostaDTO[]> {
  return request<UsuarioRespostaDTO[]>(`/usuario/buscar/nome?nome=${encodeURIComponent(nome)}`);
}

export async function fetchUsuariosByEmail(email: string): Promise<UsuarioRespostaDTO[]> {
  const usuario = await fetchUsuarioByEmail(email);
  return [usuario];
}

export async function saveUsuario(payload: UsuarioPayload): Promise<void> {
  await request<void>(payload.id ? '/usuario/atualizar' : '/usuario/salvar', {
    method: payload.id ? 'PUT' : 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteUsuario(id: number): Promise<void> {
  await request<void>(`/usuario/deletar/id?id=${id}`, { method: 'DELETE' });
}

export async function uploadEventoArquivo(idEntidade: number, file: File): Promise<ArquivoMeta> {
  const body = new FormData();
  body.append('file', file);
  body.append('idEntidade', String(idEntidade));
  body.append('tpEntidade', 'EVENTO');

  return request<ArquivoMeta>('/api/arquivos/upload', { method: 'POST', body });
}

export async function listEventoArquivos(idEntidade: number): Promise<ArquivoMeta[]> {
  return request<ArquivoMeta[]>(`/api/arquivos/entidade/${idEntidade}/tipo/EVENTO`);
}

export async function deleteArquivo(idArquivo: number): Promise<void> {
  await request<void>(`/api/arquivos/${idArquivo}`, { method: 'DELETE' });
}

export async function downloadRelatorio(tipo: 'pacientes' | 'agendamentos' | 'eventos'): Promise<void> {
  const response = await fetch(`${API_BASE}/relatorios/${tipo}`);
  if (!response.ok) {
    throw new Error(`Falha ao baixar relatório de ${tipo}`);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  const disposition = response.headers.get('content-disposition') ?? '';
  const match = disposition.match(/filename="?([^"]+)"?/i);
  link.href = url;
  link.download = match?.[1] ?? `relatorio_${tipo}.txt`;
  link.click();
  window.URL.revokeObjectURL(url);
}