import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { App } from './App';

(() => {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('root element not found');
  }

  const queryClient = new QueryClient();

  createRoot(root).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
})();
