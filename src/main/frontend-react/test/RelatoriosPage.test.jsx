import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const baixarPacientes = vi.fn();
const baixarAgendamentos = vi.fn();
const baixarEventos = vi.fn();

vi.mock('../src/services/relatorioService', () => ({
  relatorioService: {
    baixarPacientes: (...a) => baixarPacientes(...a),
    baixarAgendamentos: (...a) => baixarAgendamentos(...a),
    baixarEventos: (...a) => baixarEventos(...a),
  },
}));

import { RelatoriosPage } from '../src/pages/RelatoriosPage';

describe('RelatoriosPage', () => {
  beforeEach(() => {
    baixarPacientes.mockReset();
    baixarAgendamentos.mockReset();
    baixarEventos.mockReset();
  });

  it('renderiza os três cards de relatório', () => {
    render(<RelatoriosPage />);
    expect(screen.getByText('Relatório de Pacientes')).toBeInTheDocument();
    expect(screen.getByText('Relatório de Agendamentos')).toBeInTheDocument();
    expect(screen.getByText('Relatório de Eventos')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Gerar Relatório/i })).toHaveLength(3);
  });

  it('chama o service ao clicar em Gerar Relatório do card de pacientes', async () => {
    baixarPacientes.mockResolvedValue(undefined);
    render(<RelatoriosPage />);
    const btns = screen.getAllByRole('button', { name: /Gerar Relatório/i });
    await userEvent.click(btns[0]);
    await waitFor(() => {
      expect(baixarPacientes).toHaveBeenCalled();
    });
  });

  it('chama service de agendamentos quando clicado', async () => {
    baixarAgendamentos.mockResolvedValue(undefined);
    render(<RelatoriosPage />);
    const btns = screen.getAllByRole('button', { name: /Gerar Relatório/i });
    await userEvent.click(btns[1]);
    await waitFor(() => {
      expect(baixarAgendamentos).toHaveBeenCalled();
    });
  });

  it('exibe mensagem de erro quando service falha', async () => {
    baixarEventos.mockRejectedValue(new Error('Servidor indisponível'));
    render(<RelatoriosPage />);
    const btns = screen.getAllByRole('button', { name: /Gerar Relatório/i });
    await userEvent.click(btns[2]);
    expect(await screen.findByText('Servidor indisponível')).toBeInTheDocument();
  });
});
