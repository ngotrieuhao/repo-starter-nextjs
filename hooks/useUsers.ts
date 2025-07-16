'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '@services/user.service';
import {
  CreateUserRequest,
  UpdateUserRequest,
  PaginationParams,
} from '@services/types';

// Query keys
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: PaginationParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Hook to get users list
export const useUsers = (params?: PaginationParams) => {
  const queryClient = useQueryClient();

  // Query: Get users list
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: userKeys.list(params || {}),
    queryFn: async () => {
      const response = await userService.getUsers(params);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Mutation: Create new user
  const createUserMutation = useMutation({
    mutationFn: (userData: CreateUserRequest) =>
      userService.createUser(userData),
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });

  // Mutation: Update user
  const updateUserMutation = useMutation({
    mutationFn: ({
      id,
      userData,
    }: {
      id: string;
      userData: UpdateUserRequest;
    }) => userService.updateUser(id, userData),
    onSuccess: (_, { id }) => {
      // Invalidate specific user and users list
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });

  // Mutation: Delete user
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });

  // Mutation: Upload avatar
  const uploadAvatarMutation = useMutation({
    mutationFn: ({
      id,
      file,
      onProgress,
    }: {
      id: string;
      file: File;
      onProgress?: (progress: number) => void;
    }) => userService.uploadAvatar(id, file, onProgress),
    onSuccess: (_, { id }) => {
      // Invalidate specific user
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
    },
  });

  return {
    // Data
    users,
    isLoadingUsers,
    usersError,
    refetchUsers,

    // Mutations
    createUser: createUserMutation.mutate,
    createUserAsync: createUserMutation.mutateAsync,
    isCreatingUser: createUserMutation.isPending,
    createUserError: createUserMutation.error,

    updateUser: updateUserMutation.mutate,
    updateUserAsync: updateUserMutation.mutateAsync,
    isUpdatingUser: updateUserMutation.isPending,
    updateUserError: updateUserMutation.error,

    deleteUser: deleteUserMutation.mutate,
    deleteUserAsync: deleteUserMutation.mutateAsync,
    isDeletingUser: deleteUserMutation.isPending,
    deleteUserError: deleteUserMutation.error,

    uploadAvatar: uploadAvatarMutation.mutate,
    uploadAvatarAsync: uploadAvatarMutation.mutateAsync,
    isUploadingAvatar: uploadAvatarMutation.isPending,
    uploadAvatarError: uploadAvatarMutation.error,
  };
};

// Separate hook to get user by ID
export const useUserById = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await userService.getUserById(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
