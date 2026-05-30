import { useCallback, useEffect, useRef, useState } from 'react';
import { ToastTone } from '../core/types';

type UseAsyncListParams<TItem> = {
  load: () => Promise<TItem[]>;
  onToast: (tone: ToastTone, text: string) => void;
  errorMessage: string;
};

export function useAsyncList<TItem>({
  load,
  onToast,
  errorMessage,
}: UseAsyncListParams<TItem>) {
  const [items, setItems] = useState<TItem[]>([]);
  const [carregando, setCarregando] = useState(false);
  const loadRef = useRef(load);
  const onToastRef = useRef(onToast);

  useEffect(() => {
    loadRef.current = load;
    onToastRef.current = onToast;
  }, [load, onToast]);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      const resposta = await loadRef.current();
      setItems(resposta);
    } catch (error) {
      console.error(error);
      onToastRef.current('error', errorMessage);
    } finally {
      setCarregando(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    void carregar();
  }, [carregar]);

  return {
    items,
    carregando,
    carregar,
    setItems,
    setCarregando,
  };
}
