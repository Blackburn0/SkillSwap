import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './components/routing/AppRoutes';
import '@/index.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
