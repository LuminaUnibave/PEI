import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="screen active">
      <div className="auth-container" style={{ marginTop: '10%' }}>
        <div className="auth-card">
          <div className="auth-header">
            <h1>404</h1>
            <p>Página não encontrada</p>
          </div>
          <div className="auth-body">
            <Link to="/" className="secondary-btn">
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
