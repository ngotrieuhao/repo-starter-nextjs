import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default cache time: 5 minutes
      staleTime: 5 * 60 * 1000,
      // Maximum cache time: 10 minutes
      gcTime: 10 * 60 * 1000,
      // Default retry count
      retry: 1,
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry count for mutations
      retry: 1,
    },
  },
});
