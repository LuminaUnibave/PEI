import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockRefetch = vi.fn();
const mockDeletar = vi.fn();
let mockData = [];
let mockLoading = false;

vi.mock('../src/hooks/useEventos', () => ({
  useEventos: () => ({ data: mockData, isLoading: mockLoading, error: null, refetch: mockRefetch }),
}));

vi.mock('../src/hooks/useEventoMutation', () => ({
  useEventoMutation: () => ({ deletar: mockDeletar }),
}));

import { EventosPage } from '../src/pages/EventosPage';

function renderPage() {
  return render(<MemoryRouter><EventosPage /></MemoryRouter>);
}

const EVENTOS = [
  { id: 100, nmEvento: 'Palestra Saúde', dtEvento: '2026-07-01', descricao: 'Detalhes da palestra', status: 'ATIVO' },
  { id: 101, nmEvento: 'Campanha Vacinação', dtEvento: '2026-07-10', descricao: 'Vacinação geral', status: 'FUTURO' },
];

describe('EventosPage', () => {
  beforeEach(() => {
    mockRefetch.mockReset();
    mockDeletar.mockReset();
    mockData = [];
    mockLoading = false;
  });

  it('renderiza cabeçalho, botão e dropdown de filtro', () => {
    renderPage();
    expect(screen.getByText('Gestão de Eventos')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Novo Evento/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Todos os eventos' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Ativos' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Concluídos' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Futuros' })).toBeInTheDocument();
  });

  it('lista eventos quando há dados', () => {
    mockData = EVENTOS;
    renderPage();
    expect(screen.getByText('Palestra Saúde')).toBeInTheDocument();
    expect(screen.getByText('Campanha Vacinação')).toBeInTheDocument();
  });

  it('altera valor do filtro ao selecionar', async () => {
    renderPage();
    const combo = screen.getByRole('combobox');
    await userEvent.selectOptions(combo, 'futuro');
    expect(combo).toHaveValue('futuro');
  });

  it('abre popup de descrição ao clicar em Ver', async () => {
    mockData = EVENTOS;
    renderPage();
    const verBtns = screen.getAllByRole('button', { name: 'Ver' });
    await userEvent.click(verBtns[0]);
    expect(screen.getByRole('dialog', { name: /Descrição do evento/i })).toBeInTheDocument();
    expect(screen.getByText('Detalhes da palestra')).toBeInTheDocument();
  });

  it('abre modal de novo evento', async () => {
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: /Novo Evento/i }));
    expect(screen.getByRole('dialog', { name: /Formulário de evento/i })).toBeInTheDocument();
    expect(screen.getByText('Novo Evento', { selector: 'h3' })).toBeInTheDocument();
  });

  it('exclui evento e dispara refetch', async () => {
    mockData = EVENTOS;
    mockDeletar.mockResolvedValue(undefined);
    renderPage();
    const excluirBtns = screen.getAllByRole('button', { name: 'Excluir' });
    await userEvent.click(excluirBtns[0]);
    await waitFor(() => {
      expect(mockDeletar).toHaveBeenCalledWith(100);
      expect(mockRefetch).toHaveBeenCalled();
    });
  });
});
