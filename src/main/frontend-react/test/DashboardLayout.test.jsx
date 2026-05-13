import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

const mockLogout = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { nome: 'Administrador' },
    logout: mockLogout,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

import { DashboardLayout } from '../src/pages/DashboardLayout';

function renderLayout(initial = '/pacientes') {
  return render(
    <MemoryRouter initialEntries={[initial]}>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/pacientes" element={<div>conteúdo pacientes</div>} />
          <Route path="/agendamentos" element={<div>conteúdo agendamentos</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('DashboardLayout', () => {
  beforeEach(() => {
    mockLogout.mockReset();
    mockNavigate.mockReset();
  });

  it('renderiza header, navbar e conteúdo da rota filha', () => {
    renderLayout('/pacientes');
    expect(screen.getByText('Lumina')).toBeInTheDocument();
    expect(screen.getByText('Administrador')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Pacientes' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Agendamentos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Eventos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Relatórios' })).toBeInTheDocument();
    expect(screen.getByText('conteúdo pacientes')).toBeInTheDocument();
  });

  it('marca link da rota ativa', () => {
    renderLayout('/agendamentos');
    const link = screen.getByRole('link', { name: 'Agendamentos' });
    expect(link.className).toContain('active');
  });

  it('chama logout e navega para /login ao clicar em Sair', async () => {
    renderLayout('/pacientes');
    await userEvent.click(screen.getByRole('button', { name: /Sair/i }));
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
