import { useState } from 'react';
import { downloadRelatorio } from '../core/api';
import { ToastTone } from '../core/types';

type RelatoriosPageProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

type TipoRelatorio = 'pacientes' | 'agendamentos' | 'eventos';

const RELATORIOS: Array<{ tipo: TipoRelatorio; titulo: string; descricao: string }> = [
  { tipo: 'pacientes', titulo: 'Pacientes', descricao: 'Lista completa de pacientes cadastrados.' },
  { tipo: 'agendamentos', titulo: 'Agendamentos', descricao: 'Histórico de agendamentos do sistema.' },
  { tipo: 'eventos', titulo: 'Eventos', descricao: 'Eventos registrados no Lumina.' },
];

export function RelatoriosPage({ onToast }: RelatoriosPageProps) {
  const [baixando, setBaixando] = useState<TipoRelatorio | null>(null);

  async function baixar(tipo: TipoRelatorio) {
    try {
      setBaixando(tipo);
      await downloadRelatorio(tipo);
      onToast('success', 'Relatório baixado com sucesso.');
    } catch (error) {
      console.error(error);
      onToast('error', `Falha ao baixar relatório de ${tipo}.`);
    } finally {
      setBaixando(null);
    }
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Relatórios</h1>
          <p className="lead small">Exporte os dados do sistema em formato de relatório.</p>
        </div>
      </div>

      <div className="report-grid">
        {RELATORIOS.map((item) => (
          <div className="report-card" key={item.tipo}>
            <span className="eyebrow">{item.titulo}</span>
            <p>{item.descricao}</p>
            <button
              className="primary-btn"
              disabled={baixando === item.tipo}
              onClick={() => baixar(item.tipo)}
              type="button"
            >
              {baixando === item.tipo ? 'Gerando...' : 'Baixar relatório'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
