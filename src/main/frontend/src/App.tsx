import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './core/auth';
import { ToastMessage, ToastTone } from './core/types';
import { ToastStack } from './components/ui/ToastStack';
import { AppRoutes } from './routes/AppRoutes';
import './styles/app.css';

function AppShell() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (!toasts.length) return;
    const timer = window.setTimeout(() => setToasts((current) => current.slice(1)), 3500);
    return () => window.clearTimeout(timer);
  }, [toasts]);

  const pushToast = (tone: ToastTone, text: string) => {
    setToasts((current) => [...current, { id: Date.now(), tone, text }]);
  };

  return (
    <>
      <AppRoutes onToast={pushToast} />
      <ToastStack items={toasts} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}
