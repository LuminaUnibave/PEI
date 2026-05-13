import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockRefetch = vi.fn();
const mockDeletar = vi.fn();
let mockData = [];
let mockLoading = false;

vi.mock('../src/hooks/usePacientes', () => ({
  usePacientes: () => ({
    data: mockData,
    isLoading: mockLoading,
    error: null,
    refetch: mockRefetch,
  }),
}));

vi.mock('../src/hooks/usePacienteMutation', () => ({
  usePacienteMutation: () => ({ deletar: mockDeletar }),
}));

import { PacientesPage } from '../src/pages/PacientesPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <PacientesPage />
    </MemoryRouter>
  );
}

const PACIENTES = [
  { id: 1, nome: 'João Silva', cpf: '111.111.111-11', dtNascimento: '1990-01-01', email: 'joao@x.com', contato: '99999', situacao: 'ATIVO' },
  { id: 2, nome: 'Maria Souza', cpf: '222.222.222-22', dtNascimento: '1985-05-10', email: 'maria@x.com', contato: '88888', situacao: 'ATIVO' },
];

describe('PacientesPage', () => {
  beforeEach(() => {
    mockRefetch.mockReset();
    mockDeletar.mockReset();
    mockData = [];
    mockLoading = false;
  });

  it('renderiza cabeçalho e botão de novo paciente', () => {
    renderPage();
    expect(screen.getByText('Gestão de Pacientes')).toBeInTheDocument();
    expect(screen.getByText('Gerencie todos os pacientes do sistema')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Novo Paciente/i })).toBeInTheDocument();
  });

  it('mostra estado de loading', () => {
    mockLoading = true;
    renderPage();
    expect(screen.getByRole('status', { name: /Carregando/i })).toBeInTheDocument();
  });

  it('renderiza linhas da tabela quando há pacientes', () => {
    mockData = PACIENTES;
    renderPage();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Souza')).toBeInTheDocument();
  });

  it('abre modal ao clicar em Novo Paciente', async () => {
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /Novo Paciente/i }));
    expect(screen.getByRole('dialog', { name: /Formulário de paciente/i })).toBeInTheDocument();
    expect(screen.getByText('Novo Paciente', { selector: 'h3' })).toBeInTheDocument();
  });

  it('abre modal de edição ao clicar em Editar', async () => {
    mockData = PACIENTES;
    renderPage();
    const editarBtns = screen.getAllByRole('button', { name: 'Editar' });
    await userEvent.click(editarBtns[0]);
    expect(screen.getByText('Editar Paciente', { selector: 'h3' })).toBeInTheDocument();
  });

  it('chama deletar e refetch ao confirmar exclusão', async () => {
    mockData = PACIENTES;
    mockDeletar.mockResolvedValue(undefined);
    renderPage();
    const excluirBtns = screen.getAllByRole('button', { name: 'Excluir' });
    await userEvent.click(excluirBtns[0]);
    await waitFor(() => {
      expect(mockDeletar).toHaveBeenCalledWith(1);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
