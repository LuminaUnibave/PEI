import { downloadRelatorio } from '../core/api';
import { ToastTone } from '../core/types';

export function RelatoriosPage({ onToast }: { onToast: (tone: ToastTone, text: string) => void }) {
  const handleDownload = async (tipo: 'pacientes' | 'agendamentos' | 'eventos') => {
    try {
      await downloadRelatorio(tipo);
      onToast('success', `Relatório de ${tipo} baixado com sucesso.`);
    } catch (error) {
      onToast('error', `Falha ao baixar relatório de ${tipo}.`);
    }
  };

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Relatórios</h1>
          <p>Baixe relatórios gerenciais do sistema.</p>
        </div>
      </div>

      <div className="content-card report-actions">
        <button className="primary-btn" type="button" onClick={() => handleDownload('pacientes')}>
          Pacientes
        </button>
        <button className="primary-btn" type="button" onClick={() => handleDownload('agendamentos')}>
          Agendamentos
        </button>
        <button className="primary-btn" type="button" onClick={() => handleDownload('eventos')}>
          Eventos
        </button>
      </div>
    </section>
  );
}
