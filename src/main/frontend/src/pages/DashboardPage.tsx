import { useEffect, useState } from 'react';
import { fetchDashboardCounts } from '../core/api';
import { useAuth } from '../core/auth';
import { DashboardCounts, ToastTone } from '../core/types';

type DashboardPageProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

const CARDS: Array<{ key: keyof DashboardCounts; label: string }> = [
  { key: 'pacientes', label: 'Pacientes' },
  { key: 'agendamentos', label: 'Agendamentos' },
  { key: 'eventos', label: 'Eventos' },
  { key: 'usuarios', label: 'Usuários' },
];

export function DashboardPage({ onToast }: DashboardPageProps) {
  const { user } = useAuth();
  const [counts, setCounts] = useState<DashboardCounts | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        setCarregando(true);
        const resposta = await fetchDashboardCounts();
        if (!cancelado) setCounts(resposta);
      } catch (error) {
        console.error(error);
        if (!cancelado) onToast('error', 'Erro ao carregar indicadores.');
      } finally {
        if (!cancelado) setCarregando(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [onToast]);

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <span className="brand-kicker">Visão geral</span>
          <h1>Olá, {user?.nome ?? 'usuário'}</h1>
          <p className="lead small">Indicadores atuais do sistema Lumina.</p>
        </div>
      </div>

      {carregando ? (
        <div className="loading-card">Carregando indicadores...</div>
      ) : (
        <div className="stats-grid">
          {CARDS.map((card) => (
            <div className="stat-card" key={card.key}>
              <span className="eyebrow">{card.label}</span>
              <strong>{counts?.[card.key] ?? 0}</strong>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
