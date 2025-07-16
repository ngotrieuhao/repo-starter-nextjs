import { api, ApiResponse } from '@lib/api';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  PaginationParams,
} from './types';

// User service
export const userService = {
  // Lấy danh sách users
  getUsers: async (params?: PaginationParams): Promise<ApiResponse<User[]>> => {
    return api.get<User[]>('/users', params as Record<string, unknown>);
  },

  // Lấy thông tin user theo ID
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    return api.get<User>(`/users/${id}`);
  },

  // Tạo user mới
  createUser: async (
    userData: CreateUserRequest
  ): Promise<ApiResponse<User>> => {
    return api.post<User>('/users', userData);
  },

  // Cập nhật user
  updateUser: async (
    id: string,
    userData: UpdateUserRequest
  ): Promise<ApiResponse<User>> => {
    return api.put<User>(`/users/${id}`, userData);
  },

  // Xóa user
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

  // Thay đổi password
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
