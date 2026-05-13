import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockRefetch = vi.fn();
const mockDeletar = vi.fn();
let mockData = [];
let mockLoading = false;

vi.mock('../src/hooks/useAgendamentos', () => ({
  useAgendamentos: () => ({ data: mockData, isLoading: mockLoading, error: null, refetch: mockRefetch }),
}));

vi.mock('../src/hooks/useAgendamentoMutation', () => ({
  useAgendamentoMutation: () => ({ deletar: mockDeletar }),
}));

import { AgendamentosPage } from '../src/pages/AgendamentosPage';

function renderPage() {
  return render(<MemoryRouter><AgendamentosPage /></MemoryRouter>);
}

const AGENDAMENTOS = [
  { id: 10, paciente: { nome: 'João' }, tpVisita: 'CONSULTA', dtAgendamento: '2026-06-01 10:00', status: 'AGENDADO', observacao: 'Levar exames' },
  { id: 11, paciente: { nome: 'Maria' }, tpVisita: 'VISITA', dtAgendamento: '2026-06-02 14:00', status: 'AGENDADO', observacao: '' },
];

describe('AgendamentosPage', () => {
  beforeEach(() => {
    mockRefetch.mockReset();
    mockDeletar.mockReset();
    mockData = [];
    mockLoading = false;
  });

  it('renderiza cabeçalho, botão de novo e filtro de data', () => {
    renderPage();
    expect(screen.getByText('Gestão de Agendamentos')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Novo Agendamento/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Limpar/i })).toBeInTheDocument();
    expect(document.querySelector('input[type="date"]')).toBeInTheDocument();
  });

  it('lista agendamentos quando há dados', () => {
    mockData = AGENDAMENTOS;
    renderPage();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
  });

  it('limpa filtro de data ao clicar em Limpar', async () => {
    renderPage();
    const inputData = document.querySelector('input[type="date"]');
    await userEvent.type(inputData, '2026-06-01');
    expect(inputData.value).toBe('2026-06-01');
    await userEvent.click(screen.getByRole('button', { name: /Limpar/i }));
    expect(inputData.value).toBe('');
  });

  it('abre popup de observação ao clicar em Ver', async () => {
    mockData = AGENDAMENTOS;
    renderPage();
    const verBtns = screen.getAllByRole('button', { name: 'Ver' });
    await userEvent.click(verBtns[0]);
    expect(screen.getByRole('dialog', { name: /Observações do agendamento/i })).toBeInTheDocument();
    expect(screen.getByText('Levar exames')).toBeInTheDocument();
  });

  it('abre popup de arquivos ao clicar em Arquivos', async () => {
    mockData = AGENDAMENTOS;
    renderPage();
    const arqBtns = screen.getAllByRole('button', { name: 'Arquivos' });
    await userEvent.click(arqBtns[0]);
    expect(screen.getByRole('dialog', { name: /^Arquivos$/i })).toBeInTheDocument();
    expect(screen.getByText(/Arquivos do item #10/)).toBeInTheDocument();
  });

  it('exclui agendamento e dispara refetch', async () => {
    mockData = AGENDAMENTOS;
    mockDeletar.mockResolvedValue(undefined);
    renderPage();
    const excluirBtns = screen.getAllByRole('button', { name: 'Excluir' });
    await userEvent.click(excluirBtns[0]);
    await waitFor(() => {
      expect(mockDeletar).toHaveBeenCalledWith(10);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
