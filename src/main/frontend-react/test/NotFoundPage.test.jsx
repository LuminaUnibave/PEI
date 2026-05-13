import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '../src/pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('renderiza 404 e link de volta para o início', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Voltar para o início/i })).toHaveAttribute('href', '/');
  });
});
