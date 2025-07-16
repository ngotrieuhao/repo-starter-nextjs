import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Thời gian cache mặc định: 5 phút
      staleTime: 5 * 60 * 1000,
      // Thời gian cache tối đa: 10 phút
      gcTime: 10 * 60 * 1000,
      // Số lần retry mặc định
      retry: 1,
      // Refetch khi window focus
      refetchOnWindowFocus: false,
      // Refetch khi reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Số lần retry cho mutations
      retry: 1,
    },
  },
});
