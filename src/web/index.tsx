import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { routeTree } from '../routeTree.gen';

(() => {
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('root element not found');
  }

  const router = createRouter({ routeTree });

  const queryClient = new QueryClient();

  createRoot(root).render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
})();
