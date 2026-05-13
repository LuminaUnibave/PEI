import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({ login: mockLogin, isLoading: false }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

import { LoginPage } from '../src/pages/LoginPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

describe('LoginPage', () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockNavigate.mockReset();
  });

  it('renderiza campos e botão de login', () => {
    renderPage();
    expect(screen.getByText('Lumina')).toBeInTheDocument();
    expect(screen.getByText('Sistema de Gestão de Saúde')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Criar Nova Conta/i })).toHaveAttribute('href', '/cadastro');
  });

  it('mostra erros de validação quando campos vazios', async () => {
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    expect(screen.getByText('Informe o e-mail')).toBeInTheDocument();
    expect(screen.getByText('Informe a senha')).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('rejeita e-mail com formato inválido', async () => {
    renderPage();
    const inputs = screen.getAllByRole('textbox');
    await userEvent.type(inputs[0], 'sem-arroba');
    const senha = document.querySelector('input[type="password"]');
    await userEvent.type(senha, '123456');
    await userEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('chama login e navega para /pacientes em caso de sucesso', async () => {
    mockLogin.mockResolvedValue(undefined);
    renderPage();
    const inputs = screen.getAllByRole('textbox');
    await userEvent.type(inputs[0], 'admin@lumina.com');
    const senha = document.querySelector('input[type="password"]');
    await userEvent.type(senha, 'admin');
    await userEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin@lumina.com', 'admin');
      expect(mockNavigate).toHaveBeenCalledWith('/pacientes', { replace: true });
    });
  });

  it('exibe mensagem de erro quando login falha', async () => {
    mockLogin.mockRejectedValue(new Error('Credenciais inválidas'));
    renderPage();
    const inputs = screen.getAllByRole('textbox');
    await userEvent.type(inputs[0], 'admin@lumina.com');
    const senha = document.querySelector('input[type="password"]');
    await userEvent.type(senha, 'senha-errada');
    await userEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
