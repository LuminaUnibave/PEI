import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/auth';
import { ToastTone } from '../core/types';

export function LoginPage({ onToast }: { onToast: (tone: ToastTone, text: string) => void }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? '/admin';

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/admin');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await auth.login(email, senha);
      onToast('success', 'Login realizado com sucesso');
      navigate(from, { replace: true });
    } catch (error) {
      onToast('error', 'Falha ao autenticar. Verifique e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section login-page">
      <div className="content-card login-card">
        <h1>Entrar</h1>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
              disabled={loading}
            />
          </label>
          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </section>
  );
}
