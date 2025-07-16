import apiClient from './axios';

// Types for API response
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API helper functions
export const api = {
  // GET request
  get: async <T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<ApiResponse<T>> => {
    const response = await apiClient.get(url, { params });
    return response.data;
  },

  // POST request
  post: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    const response = await apiClient.post(url, data);
    return response.data;
  },

  // PUT request
  put: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    const response = await apiClient.put(url, data);
    return response.data;
  },

  // PATCH request
  patch: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    const response = await apiClient.patch(url, data);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await apiClient.delete(url);
    return response.data;
  },

  // Upload file
  upload: async <T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
    return response.data;
  },
};
