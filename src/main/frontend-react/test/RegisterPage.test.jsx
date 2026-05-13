import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockRegister = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({ register: mockRegister, isLoading: false }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

import { RegisterPage } from '../src/pages/RegisterPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
}

function getInputs() {
  const textboxes = screen.getAllByRole('textbox');
  const senhas = document.querySelectorAll('input[type="password"]');
  return {
    nome: textboxes[0],
    email: textboxes[1],
    senha: senhas[0],
    confirmarSenha: senhas[1],
  };
}

describe('RegisterPage', () => {
  beforeEach(() => {
    mockRegister.mockReset();
    mockNavigate.mockReset();
    vi.useFakeTimers();
  });

  it('renderiza todos os campos do formulário', () => {
    renderPage();
    expect(screen.getByText('Criar Nova Conta')).toBeInTheDocument();
    expect(screen.getByText('Nome Completo')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Confirmar Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Criar Minha Conta/i })).toBeInTheDocument();
  });

  it('valida campos obrigatórios', async () => {
    vi.useRealTimers();
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /Criar Minha Conta/i }));
    expect(screen.getByText('Informe o nome completo')).toBeInTheDocument();
    expect(screen.getByText('Informe o e-mail')).toBeInTheDocument();
    expect(screen.getByText('Informe a senha')).toBeInTheDocument();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('exige senha com pelo menos 6 caracteres', async () => {
    vi.useRealTimers();
    renderPage();
    const { nome, email, senha, confirmarSenha } = getInputs();
    await userEvent.type(nome, 'João');
    await userEvent.type(email, 'a@b.com');
    await userEvent.type(senha, '123');
    await userEvent.type(confirmarSenha, '123');
    await userEvent.click(screen.getByRole('button', { name: /Criar Minha Conta/i }));
    expect(screen.getByText('Mínimo 6 caracteres')).toBeInTheDocument();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('valida confirmação de senha', async () => {
    vi.useRealTimers();
    renderPage();
    const { nome, email, senha, confirmarSenha } = getInputs();
    await userEvent.type(nome, 'João');
    await userEvent.type(email, 'a@b.com');
    await userEvent.type(senha, '123456');
    await userEvent.type(confirmarSenha, '654321');
    await userEvent.click(screen.getByRole('button', { name: /Criar Minha Conta/i }));
    expect(screen.getByText('As senhas não conferem')).toBeInTheDocument();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('chama register e exibe mensagem de sucesso', async () => {
    vi.useRealTimers();
    mockRegister.mockResolvedValue(undefined);
    renderPage();
    const { nome, email, senha, confirmarSenha } = getInputs();
    await userEvent.type(nome, 'João');
    await userEvent.type(email, 'joao@b.com');
    await userEvent.type(senha, '123456');
    await userEvent.type(confirmarSenha, '123456');
    await userEvent.click(screen.getByRole('button', { name: /Criar Minha Conta/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        nome: 'João',
        email: 'joao@b.com',
        senha: '123456',
      });
    });
    expect(await screen.findByText(/Conta criada com sucesso/i)).toBeInTheDocument();
  });
});
