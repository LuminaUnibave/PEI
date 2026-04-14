import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './core/auth';
import {
  deleteAgendamento,
  deleteArquivo,
  deleteEvento,
  deletePaciente,
  deleteUsuario,
  downloadRelatorio,
  fetchAgendamentos,
  fetchDashboardCounts,
  fetchEventos,
  fetchPacientes,
  fetchUsuariosByEmail,
  fetchUsuariosByName,
  listEventoArquivos,
  saveAgendamento,
  saveEvento,
  savePaciente,
  saveUsuario,
  uploadEventoArquivo,
} from './core/api';
import {
  AgendamentoPayload,
  AgendamentoRespostaDTO,
  ArquivoMeta,
  DashboardCounts,
  EventoPayload,
  EventoRespostaDTO,
  PacientePayload,
  PacienteRespostaDTO,
  Situacao,
  ToastMessage,
  ToastTone,
  TpUsuario,
  UsuarioPayload,
  UsuarioRespostaDTO,
} from './core/types';
import './styles/app.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </AuthProvider>
  );
}

function Shell() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (!toasts.length) return;
    const timer = window.setTimeout(() => setToasts((current) => current.slice(1)), 3500);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  const pushToast = (tone: ToastTone, text: string) => {
    setToasts((current) => [...current, { id: Date.now(), tone, text }]);
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage onToast={pushToast} />} />
        <Route path="*" element={<PrivateApp onToast={pushToast} />} />
      </Routes>
      <ToastStack items={toasts} />
    </>
  );
}

function PrivateApp({ onToast }: PageProps) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/login" />;
  }

  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="admin-main">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/admin" />} />
          <Route path="/admin" element={<DashboardPage onToast={onToast} />} />
          <Route path="/admin/pacientes" element={<PacientesPage onToast={onToast} />} />
          <Route path="/admin/agendamentos" element={<AgendamentosPage onToast={onToast} />} />
          <Route path="/admin/eventos" element={<EventosPage onToast={onToast} />} />
          <Route path="/admin/relatorios" element={<RelatoriosPage onToast={onToast} />} />
          <Route
            path="/admin/usuarios"
            element={auth.hasRole(['ADMINISTRADOR']) ? <UsuariosPage onToast={onToast} /> : <Navigate replace to="/admin" />}
          />
        </Routes>
      </main>
    </div>
  );
}

function Sidebar() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="brand-card">
        <span className="brand-kicker">Lumina</span>
        <strong>RFCC Orleans</strong>
      </div>
      <nav className="sidebar-nav">
        <NavItem to="/admin">Dashboard</NavItem>
        <NavItem to="/admin/pacientes">Pacientes</NavItem>
        <NavItem to="/admin/agendamentos">Agendamentos</NavItem>
        <NavItem to="/admin/eventos">Eventos</NavItem>
        {auth.user?.tpUsuario === 'ADMINISTRADOR' && <NavItem to="/admin/usuarios">Usuários</NavItem>}
        <NavItem to="/admin/relatorios">Relatórios</NavItem>
      </nav>
      <button
        className="ghost-btn danger"
        onClick={() => {
          auth.logout();
          navigate('/login');
        }}
        type="button"
      >
        Sair
      </button>
    </aside>
  );
}

function Header() {
  const auth = useAuth();
  return (
    <header className="admin-header">
      <div>
        <p className="eyebrow">Painel administrativo</p>
        <h1>Gestão Lumina</h1>
      </div>
      <div className="user-chip">
        <strong>{auth.user?.nome}</strong>
        <span>{auth.user?.tpUsuario}</span>
      </div>
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={to}>
      {children}
    </NavLink>
  );
}

interface PageProps {
  onToast: (tone: ToastTone, text: string) => void;
}

function LoginPage({ onToast }: PageProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/admin', { replace: true });
  }, [auth.isAuthenticated, navigate]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await auth.login(email, senha);
      onToast('success', 'Login realizado com sucesso.');
      navigate(location.state?.from ?? '/admin', { replace: true });
    } catch {
      onToast('error', 'Não foi possível autenticar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <p className="eyebrow">Frontend React + TypeScript</p>
        <h1>Painel Lumina</h1>
        <p className="lead">
          Estrutura administrativa baseada no levantamento de telas, com rotas protegidas, modais, toasts e CRUDs principais.
        </p>
        <form className="stack-form" onSubmit={submit}>
          <label>
            Email
            <input onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
          </label>
          <label>
            Senha
            <input onChange={(event) => setSenha(event.target.value)} required type="password" value={senha} />
          </label>
          <button className="primary-btn" disabled={loading} type="submit">
            {loading ? 'Entrando...' : 'Acessar painel'}
          </button>
        </form>
      </div>
    </div>
  );
}

function DashboardPage({ onToast }: PageProps) {
  const [counts, setCounts] = useState<DashboardCounts | null>(null);

  useEffect(() => {
    fetchDashboardCounts().then(setCounts).catch(() => onToast('warning', 'Os indicadores não puderam ser carregados.'));
  }, [onToast]);

  return (
    <PageSection description="Resumo das entidades principais do sistema." title="Dashboard">
      <div className="stats-grid">
        <StatCard label="Pacientes" value={counts?.pacientes ?? 0} />
        <StatCard label="Agendamentos" value={counts?.agendamentos ?? 0} />
        <StatCard label="Eventos" value={counts?.eventos ?? 0} />
        <StatCard label="Usuários" value={counts?.usuarios ?? 0} />
      </div>
      <div className="info-grid">
        <InfoCard items={['Autenticação local', 'Layouts administrativos', 'Tabela com filtros e modal']} title="Fundação pronta" />
        <InfoCard items={['Pacientes', 'Agendamentos', 'Eventos', 'Relatórios']} title="Módulos entregues" />
      </div>
    </PageSection>
  );
}

function PacientesPage({ onToast }: PageProps) {
  const auth = useAuth();
  const [items, setItems] = useState<PacienteRespostaDTO[]>([]);
  const [query, setQuery] = useState('');
  const [initial, setInitial] = useState<PacienteRespostaDTO | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      setItems(await fetchPacientes());
    } catch {
      onToast('error', 'Não foi possível carregar os pacientes.');
    }
  }, [onToast]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(
    () => items.filter((item) => `${item.nome} ${item.sobrenome ?? ''}`.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  return (
    <PageSection description="Busca por nome, modal de cadastro e exclusão confirmada." title="Gestão de Pacientes">
      <Toolbar onCreate={() => { setInitial(null); setOpen(true); }} onQueryChange={setQuery} query={query} queryPlaceholder="Buscar por nome" />
      <DataTable
        columns={['Nome', 'Nascimento', 'Contato', 'Situação', 'Ações']}
        rows={filtered.map((item) => [
          `${item.nome} ${item.sobrenome ?? ''}`.trim(),
          formatDate(item.dtNascimento),
          item.contato || item.email || 'Não informado',
          <StatusBadge key={`${item.id}-status`} value={item.situacao} />,
          <ActionRow key={`${item.id}-actions`} onDelete={() => setDeleting(item.id)} onEdit={() => { setInitial(item); setOpen(true); }} />,
        ])}
      />
      <PacienteModal
        initial={initial}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={async (payload) => {
          try {
            await savePaciente({ ...payload, idUsuario: auth.user?.id ?? 1 });
            onToast('success', initial ? 'Paciente atualizado.' : 'Paciente cadastrado.');
            setOpen(false);
            await load();
          } catch {
            onToast('error', 'Falha ao salvar paciente.');
          }
        }}
      />
      <ConfirmDialog
        description="Deseja remover este paciente?"
        isOpen={deleting !== null}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (deleting === null) return;
          try {
            await deletePaciente(deleting);
            onToast('success', 'Paciente removido.');
            setDeleting(null);
            await load();
          } catch {
            onToast('error', 'Falha ao excluir paciente.');
          }
        }}
        title="Confirmar exclusão"
      />
    </PageSection>
  );
}

function AgendamentosPage({ onToast }: PageProps) {
  const auth = useAuth();
  const [items, setItems] = useState<AgendamentoRespostaDTO[]>([]);
  const [pacientes, setPacientes] = useState<PacienteRespostaDTO[]>([]);
  const [query, setQuery] = useState('');
  const [initial, setInitial] = useState<AgendamentoRespostaDTO | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const [agendamentos, pacientesData] = await Promise.all([fetchAgendamentos(), fetchPacientes()]);
      setItems(agendamentos);
      setPacientes(pacientesData);
    } catch {
      onToast('error', 'Não foi possível carregar os agendamentos.');
    }
  }, [onToast]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => items.filter((item) => item.paciente.nome.toLowerCase().includes(query.toLowerCase())), [items, query]);

  return (
    <PageSection description="Seleção de paciente, tipo de visita e observação." title="Gestão de Agendamentos">
      <Toolbar onCreate={() => { setInitial(null); setOpen(true); }} onQueryChange={setQuery} query={query} queryPlaceholder="Buscar por paciente" />
      <DataTable
        columns={['Paciente', 'Tipo', 'Data', 'Situação', 'Ações']}
        rows={filtered.map((item) => [
          `${item.paciente.nome} ${item.paciente.sobrenome ?? ''}`.trim(),
          <StatusBadge key={`${item.id}-tipo`} value={item.tpVisita} />,
          formatDateTime(item.dtAgendamento),
          <StatusBadge key={`${item.id}-status`} value={item.situacao} />,
          <ActionRow key={`${item.id}-actions`} onDelete={() => setDeleting(item.id)} onEdit={() => { setInitial(item); setOpen(true); }} />,
        ])}
      />
      <AgendamentoModal
        initial={initial}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={async (payload) => {
          try {
            await saveAgendamento({ ...payload, idUsuario: auth.user?.id ?? 1 });
            onToast('success', initial ? 'Agendamento atualizado.' : 'Agendamento criado.');
            setOpen(false);
            await load();
          } catch {
            onToast('error', 'Falha ao salvar agendamento.');
          }
        }}
        pacientes={pacientes}
      />
      <ConfirmDialog
        description="Deseja remover este agendamento?"
        isOpen={deleting !== null}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (deleting === null) return;
          try {
            await deleteAgendamento(deleting);
            onToast('success', 'Agendamento removido.');
            setDeleting(null);
            await load();
          } catch {
            onToast('error', 'Falha ao excluir agendamento.');
          }
        }}
        title="Excluir agendamento"
      />
    </PageSection>
  );
}

function EventosPage({ onToast }: PageProps) {
  const auth = useAuth();
  const [items, setItems] = useState<EventoRespostaDTO[]>([]);
  const [files, setFiles] = useState<Record<number, ArquivoMeta[]>>({});
  const [initial, setInitial] = useState<EventoRespostaDTO | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      setItems(await fetchEventos());
    } catch {
      onToast('error', 'Não foi possível carregar os eventos.');
    }
  }, [onToast]);

  useEffect(() => {
    void load();
  }, [load]);

  const refreshFiles = async (eventoId: number) => {
    try {
      const nextFiles = await listEventoArquivos(eventoId);
      setFiles((current) => ({ ...current, [eventoId]: nextFiles }));
    } catch {
      onToast('warning', 'Não foi possível listar os anexos.');
    }
  };

  return (
    <PageSection description="Cards de evento com upload e listagem de anexos." title="Gestão de Eventos">
      <div className="toolbar">
        <button className="primary-btn" onClick={() => { setInitial(null); setOpen(true); }} type="button">
          Novo evento
        </button>
      </div>
      <div className="event-grid">
        {items.map((item) => (
          <article className="event-card" key={item.id}>
            <div className="event-header">
              <div>
                <p className="eyebrow">Evento</p>
                <h3>{item.nmEvento || 'Sem título'}</h3>
              </div>
              <StatusBadge value={item.situacao} />
            </div>
            <p>{item.descricao || 'Sem descrição cadastrada.'}</p>
            <p className="muted">{formatDateTime(item.dtEvento)}</p>
            <div className="action-strip">
              <button className="ghost-btn" onClick={() => refreshFiles(item.id)} type="button">Ver anexos</button>
              <button className="ghost-btn" onClick={() => { setInitial(item); setOpen(true); }} type="button">Editar</button>
              <button className="ghost-btn danger" onClick={() => setDeleting(item.id)} type="button">Excluir</button>
            </div>
            <UploadBox
              arquivos={files[item.id] ?? []}
              onDelete={async (fileId) => {
                try {
                  await deleteArquivo(fileId);
                  onToast('success', 'Arquivo removido.');
                  await refreshFiles(item.id);
                } catch {
                  onToast('error', 'Falha ao excluir arquivo.');
                }
              }}
              onUpload={async (file) => {
                try {
                  await uploadEventoArquivo(item.id, file);
                  onToast('success', 'Arquivo enviado.');
                  await refreshFiles(item.id);
                } catch {
                  onToast('error', 'Falha ao enviar arquivo.');
                }
              }}
            />
          </article>
        ))}
      </div>
      <EventoModal
        initial={initial}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={async (payload) => {
          try {
            await saveEvento({ ...payload, idUsuario: auth.user?.id ?? 1 });
            onToast('success', initial ? 'Evento atualizado.' : 'Evento criado.');
            setOpen(false);
            await load();
          } catch {
            onToast('error', 'Falha ao salvar evento.');
          }
        }}
      />
      <ConfirmDialog
        description="Deseja remover este evento?"
        isOpen={deleting !== null}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (deleting === null) return;
          try {
            await deleteEvento(deleting);
            onToast('success', 'Evento removido.');
            setDeleting(null);
            await load();
          } catch {
            onToast('error', 'Falha ao excluir evento.');
          }
        }}
        title="Excluir evento"
      />
    </PageSection>
  );
}

function UsuariosPage({ onToast }: PageProps) {
  const [items, setItems] = useState<UsuarioRespostaDTO[]>([]);
  const [mode, setMode] = useState<'nome' | 'email'>('email');
  const [query, setQuery] = useState('');
  const [initial, setInitial] = useState<UsuarioRespostaDTO | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const search = async () => {
    if (!query.trim()) return;
    try {
      setItems(mode === 'email' ? await fetchUsuariosByEmail(query) : await fetchUsuariosByName(query));
    } catch {
      onToast('warning', 'A tela de usuários depende de endpoints que ainda estão limitados no backend.');
    }
  };

  return (
    <PageSection description="Pesquisa manual de usuários com criação e edição em modal." title="Gestão de Usuários">
      <div className="toolbar split">
        <div className="search-wrap">
          <select onChange={(event) => setMode(event.target.value as 'nome' | 'email')} value={mode}>
            <option value="email">Buscar por email</option>
            <option value="nome">Buscar por nome</option>
          </select>
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Digite para pesquisar" value={query} />
          <button className="ghost-btn" onClick={search} type="button">Pesquisar</button>
        </div>
        <button className="primary-btn" onClick={() => { setInitial(null); setOpen(true); }} type="button">
          Novo usuário
        </button>
      </div>
      <DataTable
        columns={['Nome', 'Email', 'Perfil', 'Situação', 'Ações']}
        emptyText="Pesquise por nome ou email para consultar usuários."
        rows={items.map((item) => [
          item.nome,
          item.email,
          <StatusBadge key={`${item.id}-perfil`} value={item.tpUsuario} />,
          <StatusBadge key={`${item.id}-status`} value={item.situacao} />,
          <ActionRow key={`${item.id}-actions`} onDelete={() => setDeleting(item.id)} onEdit={() => { setInitial(item); setOpen(true); }} />,
        ])}
      />
      <UsuarioModal
        initial={initial}
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={async (payload) => {
          try {
            await saveUsuario(payload);
            onToast('success', initial ? 'Usuário atualizado.' : 'Usuário criado.');
            setOpen(false);
            await search();
          } catch {
            onToast('error', 'Falha ao salvar usuário.');
          }
        }}
      />
      <ConfirmDialog
        description="Deseja remover este usuário?"
        isOpen={deleting !== null}
        onCancel={() => setDeleting(null)}
        onConfirm={async () => {
          if (deleting === null) return;
          try {
            await deleteUsuario(deleting);
            onToast('success', 'Usuário removido.');
            setDeleting(null);
            setItems((current) => current.filter((item) => item.id !== deleting));
          } catch {
            onToast('error', 'Falha ao excluir usuário.');
          }
        }}
        title="Excluir usuário"
      />
    </PageSection>
  );
}

function RelatoriosPage({ onToast }: PageProps) {
  const [loading, setLoading] = useState<'pacientes' | 'agendamentos' | 'eventos' | null>(null);
  const cards = [
    { id: 'pacientes' as const, title: 'Relatório de pacientes', description: 'Exporta todos os pacientes cadastrados.' },
    { id: 'agendamentos' as const, title: 'Relatório de agendamentos', description: 'Exporta o panorama completo da agenda.' },
    { id: 'eventos' as const, title: 'Relatório de eventos', description: 'Baixa o histórico consolidado de eventos.' },
  ];

  return (
    <PageSection description="Downloads com loading individual por card." title="Relatórios">
      <div className="report-grid">
        {cards.map((card) => (
          <article className="report-card" key={card.id}>
            <div>
              <p className="eyebrow">Download</p>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <button
              className="primary-btn"
              disabled={loading === card.id}
              onClick={async () => {
                setLoading(card.id);
                try {
                  await downloadRelatorio(card.id);
                } catch {
                  onToast('error', 'O download falhou no backend.');
                } finally {
                  setLoading(null);
                }
              }}
              type="button"
            >
              {loading === card.id ? 'Baixando...' : 'Baixar'}
            </button>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

function PageSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="page-section">
      <div className="section-head">
        <div>
          <p className="eyebrow">Frontend</p>
          <h2>{title}</h2>
        </div>
        <p className="lead small">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Toolbar({
  query,
  queryPlaceholder,
  onQueryChange,
  onCreate,
}: {
  query: string;
  queryPlaceholder: string;
  onQueryChange: (value: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="toolbar split">
      <div className="search-wrap">
        <input onChange={(event) => onQueryChange(event.target.value)} placeholder={queryPlaceholder} value={query} />
      </div>
      <button className="primary-btn" onClick={onCreate} type="button">Novo cadastro</button>
    </div>
  );
}

function DataTable({ columns, rows, emptyText = 'Nenhum registro encontrado.' }: { columns: string[]; rows: Array<Array<React.ReactNode>>; emptyText?: string }) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
            </tr>
          )) : <tr><td colSpan={columns.length}>{emptyText}</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function ActionRow({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="action-strip">
      <button className="ghost-btn" onClick={onEdit} type="button">Editar</button>
      <button className="ghost-btn danger" onClick={onDelete} type="button">Excluir</button>
    </div>
  );
}

function StatusBadge({ value }: { value: string }) {
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

function PacienteModal({
  initial,
  isOpen,
  onClose,
  onSave,
}: {
  initial: PacienteRespostaDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: PacientePayload) => void;
}) {
  const [form, setForm] = useState<PacientePayload>({
    nome: '',
    sobrenome: '',
    cpf: '',
    dtNascimento: '',
    crtSus: '',
    email: '',
    contato: '',
    situacao: 'ATIVO',
    idUsuario: 1,
  });

  useEffect(() => {
    setForm(initial ? {
      id: initial.id,
      nome: initial.nome,
      sobrenome: initial.sobrenome,
      cpf: initial.cpf,
      dtNascimento: initial.dtNascimento?.slice(0, 10),
      crtSus: initial.crtSus,
      email: initial.email,
      contato: initial.contato,
      situacao: initial.situacao,
      idUsuario: initial.usuario?.id ?? 1,
    } : {
      nome: '',
      sobrenome: '',
      cpf: '',
      dtNascimento: '',
      crtSus: '',
      email: '',
      contato: '',
      situacao: 'ATIVO',
      idUsuario: 1,
    });
  }, [initial, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? 'Editar paciente' : 'Novo paciente'}>
      <div className="form-grid">
        <label>Nome<input onChange={(event) => setForm({ ...form, nome: event.target.value })} value={form.nome} /></label>
        <label>Sobrenome<input onChange={(event) => setForm({ ...form, sobrenome: event.target.value })} value={form.sobrenome} /></label>
        <label>Data de nascimento<input onChange={(event) => setForm({ ...form, dtNascimento: event.target.value })} type="date" value={form.dtNascimento} /></label>
        <label>Contato<input onChange={(event) => setForm({ ...form, contato: event.target.value })} value={form.contato} /></label>
        <label>Email<input onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" value={form.email} /></label>
        <label>
          Situação
          <select onChange={(event) => setForm({ ...form, situacao: event.target.value as Situacao })} value={form.situacao}>
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
            <option value="PENDENTE">PENDENTE</option>
          </select>
        </label>
      </div>
      <div className="modal-actions">
        <button className="ghost-btn" onClick={onClose} type="button">Cancelar</button>
        <button className="primary-btn" onClick={() => onSave(form)} type="button">Salvar</button>
      </div>
    </Modal>
  );
}

function AgendamentoModal({
  pacientes,
  initial,
  isOpen,
  onClose,
  onSave,
}: {
  pacientes: PacienteRespostaDTO[];
  initial: AgendamentoRespostaDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: AgendamentoPayload) => void;
}) {
  const [form, setForm] = useState<AgendamentoPayload>({
    tpVisita: 'VISITA',
    dtAgendamento: '',
    observacao: '',
    idPaciente: 0,
    idUsuario: 1,
  });

  useEffect(() => {
    setForm(initial ? {
      id: initial.id,
      tpVisita: initial.tpVisita,
      dtAgendamento: initial.dtAgendamento.slice(0, 16),
      observacao: initial.observacao,
      idPaciente: initial.paciente.id,
      idUsuario: initial.usuario?.id ?? 1,
    } : {
      tpVisita: 'VISITA',
      dtAgendamento: '',
      observacao: '',
      idPaciente: pacientes[0]?.id ?? 0,
      idUsuario: 1,
    });
  }, [initial, isOpen, pacientes]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? 'Editar agendamento' : 'Novo agendamento'}>
      <div className="form-grid">
        <label>
          Paciente
          <select onChange={(event) => setForm({ ...form, idPaciente: Number(event.target.value) })} value={form.idPaciente}>
            {pacientes.map((paciente) => <option key={paciente.id} value={paciente.id}>{paciente.nome} {paciente.sobrenome ?? ''}</option>)}
          </select>
        </label>
        <label>
          Tipo de visita
          <select onChange={(event) => setForm({ ...form, tpVisita: event.target.value as 'VISITA' | 'CONSULTA' })} value={form.tpVisita}>
            <option value="VISITA">VISITA</option>
            <option value="CONSULTA">CONSULTA</option>
          </select>
        </label>
        <label>Data e hora<input onChange={(event) => setForm({ ...form, dtAgendamento: event.target.value })} type="datetime-local" value={form.dtAgendamento} /></label>
        <label className="full">Observação<textarea onChange={(event) => setForm({ ...form, observacao: event.target.value })} rows={4} value={form.observacao} /></label>
      </div>
      <div className="modal-actions">
        <button className="ghost-btn" onClick={onClose} type="button">Cancelar</button>
        <button className="primary-btn" onClick={() => onSave(form)} type="button">Salvar</button>
      </div>
    </Modal>
  );
}

function EventoModal({
  initial,
  isOpen,
  onClose,
  onSave,
}: {
  initial: EventoRespostaDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: EventoPayload) => void;
}) {
  const [form, setForm] = useState<EventoPayload>({
    nmEvento: '',
    dtEvento: '',
    descricao: '',
    situacao: 'ATIVO',
    idUsuario: 1,
  });

  useEffect(() => {
    setForm(initial ? {
      id: initial.id,
      nmEvento: initial.nmEvento ?? '',
      dtEvento: initial.dtEvento.slice(0, 16),
      descricao: initial.descricao,
      situacao: initial.situacao,
      idUsuario: initial.usuario?.id ?? 1,
    } : {
      nmEvento: '',
      dtEvento: '',
      descricao: '',
      situacao: 'ATIVO',
      idUsuario: 1,
    });
  }, [initial, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? 'Editar evento' : 'Novo evento'}>
      <div className="form-grid">
        <label>Nome do evento<input onChange={(event) => setForm({ ...form, nmEvento: event.target.value })} value={form.nmEvento} /></label>
        <label>Data e hora<input onChange={(event) => setForm({ ...form, dtEvento: event.target.value })} type="datetime-local" value={form.dtEvento} /></label>
        <label>
          Situação
          <select onChange={(event) => setForm({ ...form, situacao: event.target.value as Situacao })} value={form.situacao}>
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
            <option value="FINALIZADO">FINALIZADO</option>
          </select>
        </label>
        <label className="full">Descrição<textarea onChange={(event) => setForm({ ...form, descricao: event.target.value })} rows={4} value={form.descricao} /></label>
      </div>
      <div className="modal-actions">
        <button className="ghost-btn" onClick={onClose} type="button">Cancelar</button>
        <button className="primary-btn" onClick={() => onSave(form)} type="button">Salvar</button>
      </div>
    </Modal>
  );
}

function UsuarioModal({
  initial,
  isOpen,
  onClose,
  onSave,
}: {
  initial: UsuarioRespostaDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: UsuarioPayload) => void;
}) {
  const [form, setForm] = useState<UsuarioPayload>({
    nome: '',
    email: '',
    senha: '',
    tpUsuario: 'OPERADOR',
    situacao: 'ATIVO',
  });

  useEffect(() => {
    setForm(initial ? {
      id: initial.id,
      nome: initial.nome,
      email: initial.email,
      senha: '',
      tpUsuario: initial.tpUsuario,
      situacao: initial.situacao,
    } : {
      nome: '',
      email: '',
      senha: '',
      tpUsuario: 'OPERADOR',
      situacao: 'ATIVO',
    });
  }, [initial, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initial ? 'Editar usuário' : 'Novo usuário'}>
      <div className="form-grid">
        <label>Nome<input onChange={(event) => setForm({ ...form, nome: event.target.value })} value={form.nome} /></label>
        <label>Email<input onChange={(event) => setForm({ ...form, email: event.target.value })} type="email" value={form.email} /></label>
        <label>Senha<input onChange={(event) => setForm({ ...form, senha: event.target.value })} type="password" value={form.senha} /></label>
        <label>
          Perfil
          <select onChange={(event) => setForm({ ...form, tpUsuario: event.target.value as TpUsuario })} value={form.tpUsuario}>
            <option value="OPERADOR">OPERADOR</option>
            <option value="ADMINISTRADOR">ADMINISTRADOR</option>
            <option value="VISITANTE">VISITANTE</option>
          </select>
        </label>
        <label>
          Situação
          <select onChange={(event) => setForm({ ...form, situacao: event.target.value as Situacao })} value={form.situacao}>
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
            <option value="PENDENTE">PENDENTE</option>
          </select>
        </label>
      </div>
      <div className="modal-actions">
        <button className="ghost-btn" onClick={onClose} type="button">Cancelar</button>
        <button className="primary-btn" onClick={() => onSave(form)} type="button">Salvar</button>
      </div>
    </Modal>
  );
}

function UploadBox({ arquivos, onUpload, onDelete }: { arquivos: ArquivoMeta[]; onUpload: (file: File) => void; onDelete: (arquivoId: number) => void }) {
  return (
    <div className="upload-box">
      <label className="upload-trigger">
        Enviar anexo
        <input
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
          }}
          type="file"
        />
      </label>
      <ul className="file-list">
        {arquivos.map((arquivo) => (
          <li key={arquivo.id}>
            <span>{arquivo.nmArquivo}</span>
            <button className="ghost-btn danger small" onClick={() => onDelete(arquivo.id)} type="button">Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal-card" onClick={(event) => event.stopPropagation()} role="dialog">
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="ghost-btn small" onClick={onClose} type="button">Fechar</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmDialog({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <p>{description}</p>
      <div className="modal-actions">
        <button className="ghost-btn" onClick={onCancel} type="button">Cancelar</button>
        <button className="primary-btn danger" onClick={onConfirm} type="button">Confirmar</button>
      </div>
    </Modal>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return <article className="stat-card"><span>{label}</span><strong>{value}</strong></article>;
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </article>
  );
}

function ToastStack({ items }: { items: ToastMessage[] }) {
  return (
    <div className="toast-stack">
      {items.map((item) => <div className={`toast ${item.tone}`} key={item.id}>{item.text}</div>)}
    </div>
  );
}

function formatDate(value?: string) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('pt-BR');
}

function formatDateTime(value?: string) {
  if (!value) return '-';
  return new Date(value).toLocaleString('pt-BR');
}

export default App;
