import { api, ApiResponse } from '@lib/api';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  PaginationParams,
} from './types';

// User service
export const userService = {
  // Get users list
  getUsers: async (params?: PaginationParams): Promise<ApiResponse<User[]>> => {
    return api.get<User[]>('/users', params as Record<string, unknown>);
  },

  // Get user by ID
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    return api.get<User>(`/users/${id}`);
  },

  // Create new user
  createUser: async (
    userData: CreateUserRequest
  ): Promise<ApiResponse<User>> => {
    return api.post<User>('/users', userData);
  },

  // Update user
  updateUser: async (
    id: string,
    userData: UpdateUserRequest
  ): Promise<ApiResponse<User>> => {
    return api.put<User>(`/users/${id}`, userData);
  },

  // Delete user
  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    return api.delete<null>(`/users/${id}`);
  },

  // Upload avatar
  uploadAvatar: async (
    id: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ avatar: string }>> => {
    return api.upload<{ avatar: string }>(
      `/users/${id}/avatar`,
      file,
      onProgress
    );
  },

  // Change password
  changePassword: async (
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<null>> => {
    return api.post<null>(`/users/${id}/change-password`, {
      currentPassword,
      newPassword,
    });
  },
};
