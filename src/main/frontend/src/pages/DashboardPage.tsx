import { useEffect, useState } from 'react';
import { fetchDashboardCounts } from '../core/api';
import { DashboardCounts, ToastTone } from '../core/types';

export function DashboardPage({ onToast }: { onToast: (tone: ToastTone, text: string) => void }) {
  const [counts, setCounts] = useState<DashboardCounts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchDashboardCounts()
      .then((data) => {
        if (mounted) {
          setCounts(data);
        }
      })
      .catch(() => {
        onToast('error', 'Não foi possível carregar os dados do dashboard.');
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [onToast]);

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral rápida do sistema Lumina.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {loading ? (
          <p>Carregando dados...</p>
        ) : counts ? (
          <>
            <div className="dashboard-card">
              <strong>{counts.pacientes}</strong>
              <span>Pacientes</span>
            </div>
            <div className="dashboard-card">
              <strong>{counts.agendamentos}</strong>
              <span>Agendamentos</span>
            </div>
            <div className="dashboard-card">
              <strong>{counts.eventos}</strong>
              <span>Eventos</span>
            </div>
            <div className="dashboard-card">
              <strong>{counts.usuarios}</strong>
              <span>Usuários</span>
            </div>
          </>
        ) : (
          <p>Não há dados disponíveis no momento.</p>
        )}
      </div>
    </section>
  );
}
