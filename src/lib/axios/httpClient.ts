import api from "@/lib/axios";
import { toApiClientError } from "@/lib/errors/api-error";
import type { ApiResponse } from "@/types/api";

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export const httpClient = {
  async get<TData>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<TData>> {
    try {
      const response = await api.get<ApiResponse<TData>>(endpoint, {
        params: options?.params,
        headers: options?.headers,
        signal: options?.signal,
      });
      return response.data;
    } catch (error) {
      throw toApiClientError(error, `GET ${endpoint} failed`);
    }
  },

  async post<TData>(
    endpoint: string,
    data: unknown = {},
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<TData>> {
    try {
      const response = await api.post<ApiResponse<TData>>(endpoint, data, {
        params: options?.params,
        headers: options?.headers,
        signal: options?.signal,
      });
      return response.data;
    } catch (error) {
      throw toApiClientError(error, `POST ${endpoint} failed`);
    }
  },
};
