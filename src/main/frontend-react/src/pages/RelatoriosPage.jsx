import { useState } from 'react';

// Contratos esperados:
// - services/relatorioService → { baixarPacientes(): Promise, baixarAgendamentos(): Promise, baixarEventos(): Promise }
// - components/SectionHeader, ContentCard
import { relatorioService } from '../services/relatorioService';
import { SectionHeader } from '../components/SectionHeader';
import { ContentCard } from '../components/ContentCard';

const RELATORIOS = [
  {
    key: 'pacientes',
    icone: '📋',
    titulo: 'Relatório de Pacientes',
    descricao: 'Lista completa de pacientes cadastrados',
    action: () => relatorioService.baixarPacientes(),
  },
  {
    key: 'agendamentos',
    icone: '📅',
    titulo: 'Relatório de Agendamentos',
    descricao: 'Agendamentos e consultas do sistema',
    action: () => relatorioService.baixarAgendamentos(),
  },
  {
    key: 'eventos',
    icone: '🎯',
    titulo: 'Relatório de Eventos',
    descricao: 'Eventos e atividades cadastradas',
    action: () => relatorioService.baixarEventos(),
  },
];

export function RelatoriosPage() {
  const [status, setStatus] = useState(null);

  async function gerar(relatorio) {
    setStatus({ tipo: 'loading', mensagem: `Preparando ${relatorio.titulo.toLowerCase()}...` });
    try {
      await relatorio.action();
      setStatus({ tipo: 'success', mensagem: 'Download iniciado!' });
      setTimeout(() => setStatus(null), 2000);
    } catch (err) {
      setStatus({ tipo: 'error', mensagem: err?.message ?? 'Falha ao gerar relatório' });
    }
  }

  return (
    <section className="content-section active" id="relatorios">
      <SectionHeader
        title="Relatórios e Estatísticas"
        subtitle="Relatórios do sistema Lumina"
      />

      <ContentCard title="Relatórios Disponíveis">
        <div className="reports-grid">
          {RELATORIOS.map((r) => (
            <div key={r.key} className="report-card">
              <div className="report-icon">{r.icone}</div>
              <h4>{r.titulo}</h4>
              <p>{r.descricao}</p>
              <button
                type="button"
                className="btn-action btn-view"
                onClick={() => gerar(r)}
                disabled={status?.tipo === 'loading'}
              >
                Gerar Relatório
              </button>
            </div>
          ))}
        </div>

        {status && (
          <div className="relatorio-status">
            <div className="status-content">
              {status.tipo === 'loading' && <div className="loading-spinner" />}
              <p>{status.mensagem}</p>
            </div>
          </div>
        )}
      </ContentCard>
    </section>
  );
}
