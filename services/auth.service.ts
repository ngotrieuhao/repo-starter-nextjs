import { api, ApiResponse } from '@lib/api';
import { User, CreateUserRequest } from './types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AuthResponse {
  user: User;
}

// Auth service
export const authService = {
  // Login
  login: async (
    credentials: LoginRequest
  ): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);

    // Save token to localStorage
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response;
  },

  // Register
  register: async (
    userData: CreateUserRequest
  ): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<LoginResponse>('/auth/register', userData);

    // Save token to localStorage
    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response;
  },

  // Logout
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      await api.post<null>('/auth/logout');
    } catch (error) {
      // Ignore errors on logout
    } finally {
      // Remove token from localStorage
      localStorage.removeItem('token');
    }

    return { success: true, data: null };
  },

  // Get current user info
  getCurrentUser: async (): Promise<ApiResponse<AuthResponse>> => {
    return api.get<AuthResponse>('/auth/me');
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.post<{ token: string }>('/auth/refresh');

    if (response.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response;
  },

  // Check if token is valid
  validateToken: async (): Promise<boolean> => {
    try {
      const response = await api.get<AuthResponse>('/auth/validate');
      return response.success;
    } catch {
      return false;
    }
  },
};
