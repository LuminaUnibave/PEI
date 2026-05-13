import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Contratos esperados de outras camadas:
// - hooks/useAuth          → { login(email, senha): Promise<void>, isLoading: boolean }
// - components/ui/Button   → <Button type, loading, children />
// - components/ui/Input    → <Input label, type, value, onChange, error />
// - components/ui/Message  → <Message type="error"|"success" text />
// - components/ThemeToggle → <ThemeToggle />
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Message } from '../components/ui/Message';
import { ThemeToggle } from '../components/ThemeToggle';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState(null);

  function validar() {
    const novosErros = {};
    if (!email) novosErros.email = 'Informe o e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) novosErros.email = 'E-mail inválido';
    if (!senha) novosErros.senha = 'Informe a senha';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(null);
    if (!validar()) return;

    try {
      await login(email, senha);
      navigate('/pacientes', { replace: true });
    } catch (err) {
      setMensagem({ type: 'error', text: err?.message ?? 'Falha ao entrar' });
    }
  }

  return (
    <div className="screen active" id="authScreen">
      <div className="login-theme-toggle">
        <ThemeToggle />
      </div>

      <div className="auth-container" style={{ marginTop: '7%' }}>
        <div className="auth-card">
          <div className="auth-header">
            <h1>Lumina</h1>
            <p>Sistema de Gestão de Saúde</p>
          </div>

          <div className="auth-body">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <Input
                label="E-mail"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="seu@email.com"
                error={erros.email}
                required
              />
              <Input
                label="Senha"
                type="password"
                value={senha}
                onChange={setSenha}
                placeholder="Sua senha"
                error={erros.senha}
                required
              />

              <Button type="submit" className="login-btn" loading={isLoading}>
                {isLoading ? 'Acessando...' : 'Entrar no Sistema'}
              </Button>
            </form>

            <div className="divider"><span>ou</span></div>

            <Link to="/cadastro" className="secondary-btn">
              Criar Nova Conta
            </Link>

            {mensagem && <Message type={mensagem.type} text={mensagem.text} />}
          </div>
        </div>
      </div>
    </div>
  );
}
