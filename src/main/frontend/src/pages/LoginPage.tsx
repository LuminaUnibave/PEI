import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../core/auth';
import { ToastTone } from '../core/types';

type LoginPageProps = {
  onToast: (tone: ToastTone, text: string) => void;
};

type LocationState = { from?: string } | null;

export function LoginPage({ onToast }: LoginPageProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);

  const destino = (location.state as LocationState)?.from ?? '/admin';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !senha) {
      onToast('warning', 'Informe email e senha.');
      return;
    }

    try {
      setEnviando(true);
      await auth.login(email, senha);
      onToast('success', 'Login realizado com sucesso.');
      navigate(destino, { replace: true });
    } catch (error) {
      console.error(error);
      onToast('error', 'Falha no login. Verifique suas credenciais.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={handleSubmit}>
        <header>
          <span className="brand-kicker">Lumina</span>
          <h1>Acessar painel</h1>
          <p className="lead small">Entre com sua conta para gerenciar o sistema.</p>
        </header>

        <div className="stack-form">
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Senha
            <input
              autoComplete="current-password"
              onChange={(event) => setSenha(event.target.value)}
              required
              type="password"
              value={senha}
            />
          </label>
        </div>

        <button className="primary-btn" disabled={enviando} type="submit">
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
