import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Contratos esperados:
// - hooks/useAuth          → { register({ nome, email, senha }): Promise<void>, isLoading: boolean }
// - components/ui/*        → Button, Input, Message
// - components/ThemeToggle → <ThemeToggle />
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Message } from '../components/ui/Message';
import { ThemeToggle } from '../components/ThemeToggle';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState(null);

  function setCampo(campo) {
    return (valor) => setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function validar() {
    const novosErros = {};
    if (!form.nome.trim()) novosErros.nome = 'Informe o nome completo';
    if (!form.email) novosErros.email = 'Informe o e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) novosErros.email = 'E-mail inválido';
    if (!form.senha) novosErros.senha = 'Informe a senha';
    else if (form.senha.length < 6) novosErros.senha = 'Mínimo 6 caracteres';
    if (form.confirmarSenha !== form.senha) novosErros.confirmarSenha = 'As senhas não conferem';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem(null);
    if (!validar()) return;

    try {
      await register({ nome: form.nome, email: form.email, senha: form.senha });
      setMensagem({ type: 'success', text: 'Conta criada com sucesso! Redirecionando...' });
      setTimeout(() => navigate('/login', { replace: true }), 1200);
    } catch (err) {
      setMensagem({ type: 'error', text: err?.message ?? 'Falha ao criar conta' });
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
            <p>Criar Nova Conta</p>
          </div>

          <div className="auth-body">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <Input
                label="Nome Completo"
                value={form.nome}
                onChange={setCampo('nome')}
                placeholder="Seu nome completo"
                error={erros.nome}
                required
              />
              <Input
                label="E-mail"
                type="email"
                value={form.email}
                onChange={setCampo('email')}
                placeholder="seu@email.com"
                error={erros.email}
                required
              />
              <Input
                label="Senha"
                type="password"
                value={form.senha}
                onChange={setCampo('senha')}
                placeholder="Mínimo 6 caracteres"
                error={erros.senha}
                minLength={6}
                required
              />
              <Input
                label="Confirmar Senha"
                type="password"
                value={form.confirmarSenha}
                onChange={setCampo('confirmarSenha')}
                placeholder="Digite novamente sua senha"
                error={erros.confirmarSenha}
                required
              />

              <Button type="submit" className="login-btn" loading={isLoading}>
                {isLoading ? 'Criando conta...' : 'Criar Minha Conta'}
              </Button>
            </form>

            <div className="divider"><span>ou</span></div>

            <Link to="/login" className="secondary-btn">
              Já tenho uma conta
            </Link>

            {mensagem && <Message type={mensagem.type} text={mensagem.text} />}
          </div>
        </div>
      </div>
    </div>
  );
}
