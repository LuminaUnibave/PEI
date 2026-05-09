export type Situacao = 'ATIVO' | 'INATIVO' | 'EXCLUIDO' | 'PENDENTE' | 'FINALIZADO';
export type TpUsuario = 'OPERADOR' | 'ADMINISTRADOR' | 'VISITANTE';
export type TpVisita = 'VISITA' | 'CONSULTA';
export type ToastTone = 'success' | 'error' | 'warning' | 'info';

export interface LoginRespostaDTO {
  token: string;
  tipo: string;
  usuarioId: number;
  email: string;
  nome: string;
}

export interface UsuarioRespostaDTO {
  id: number;
  nome: string;
  email: string;
  tpUsuario: TpUsuario;
  dtCadastro?: string;
  dtModificacao?: string;
  situacao: Situacao;
  agendamentoList?: { id: number }[];
  eventoList?: { id: number }[];
  pacienteList?: { id: number }[];
}

export interface SessionUser {
  id: number;
  nome: string;
  email: string;
  tpUsuario: TpUsuario;
  situacao?: Situacao;
}

export interface PacienteRespostaDTO {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  dtNascimento: string;
  crtSus?: string;
  email?: string;
  contato?: string;
  usuario?: { id: number };
  dtCadastro?: string;
  dtModificacao?: string;
  situacao: Situacao;
  agendamentoList?: { id: number }[];
}

export interface PacientePayload {
  id?: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  dtNascimento: string;
  crtSus?: string;
  email?: string;
  contato?: string;
  situacao: Situacao;
  idUsuario: number;
}
export interface AgendamentoRespostaDTO {
  id: number;
  paciente: {
    id: number;
    nome: string;
    sobrenome: string;
  };
  tpVisita: TpVisita;
  dtAgendamento: string;
  usuario?: { id: number };
  dtCadastro?: string;
  dtModificacao?: string;
  situacao: Situacao;
  observacao?: string;
}

export interface AgendamentoPayload {
  id?: number;
  tpVisita: TpVisita;
  dtAgendamento: string;
  observacao?: string;
  idPaciente: number;
  idUsuario: number;
}

export interface EventoRespostaDTO {
  id: number;
  nmEvento: string;
  descricao: string;
  dtEvento: string;
  dtCadastro?: string;
  dtModificacao?: string;
  situacao: Situacao;
  usuario?: { id: number };
}

export interface EventoPayload {
  id?: number;
  nmEvento: string;
  dtEvento: string;
  descricao?: string;
  //situação não é necessária no payload, pois o backend criação e atualização não possui 
  idUsuario: number;
}

export interface UsuarioPayload {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  tpUsuario: TpUsuario;
}

export interface ArquivoMeta {
  id: number;
  nmArquivo: string;
  size?: number;
  contentType?: string;
}

export interface DashboardCounts {
  pacientes: number;
  agendamentos: number;
  eventos: number;
  usuarios: number;
}

export interface ToastMessage {
  id: number;
  tone: ToastTone;
  text: string;
}