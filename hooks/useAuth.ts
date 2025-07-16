'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginRequest } from '@services/auth.service';
import { useRouter } from 'next/navigation';
import { CreateUserRequest } from '@/services';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Query: Get current user info
  const {
    data: currentUser,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      const response = await authService.getCurrentUser();
      if (!response.success) {
        throw new Error(response.message || 'Failed to get current user');
      }
      return response.data.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation: Login
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate and refetch current user
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Mutation: Register
  const registerMutation = useMutation({
    mutationFn: (userData: CreateUserRequest) => authService.register(userData),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate and refetch current user
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // Mutation: Logout
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      router.push('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Force clear anyway
      queryClient.clear();
      router.push('/login');
    },
  });

  // Mutation: Refresh token
  const refreshTokenMutation = useMutation({
    mutationFn: () => authService.refreshToken(),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate current user to refetch with new token
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      }
    },
  });

  return {
    // Data
    currentUser,
    isLoadingUser,
    userError,

    // Mutations
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    refreshToken: refreshTokenMutation.mutate,
    refreshTokenAsync: refreshTokenMutation.mutateAsync,
    isRefreshingToken: refreshTokenMutation.isPending,

    // Utilities
    isAuthenticated: !!currentUser,
  };
};
