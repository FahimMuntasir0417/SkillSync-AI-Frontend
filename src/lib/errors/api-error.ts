import { isAxiosError } from "axios";
import { ZodError } from "zod";
import type { ApiErrorResponse } from "@/types/api";

export type NormalizedApiError = {
  message: string;
  statusCode?: number;
  errors?: { path?: string; message: string }[];
};

export class ApiClientError extends Error {
  statusCode?: number;
  errors?: { path?: string; message: string }[];
  causeError?: unknown;

  constructor(
    message: string,
    options?: Omit<NormalizedApiError, "message"> & { causeError?: unknown },
  ) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = options?.statusCode;
    this.errors = options?.errors;
    this.causeError = options?.causeError;
  }
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (error instanceof ApiClientError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      errors: error.errors,
    };
  }

  if (error instanceof ZodError) {
    return {
      message:
        error.issues[0]?.message ??
        "Unexpected API response shape. Check the frontend contract and backend response.",
    };
  }

  if (isAxiosError<ApiErrorResponse>(error)) {
    if (!error.response) {
      return { message: "Network error: cannot reach API." };
    }

    return {
      message: error.response.data?.message ?? error.message,
      statusCode: error.response.data?.statusCode ?? error.response.status,
      errors: error.response.data?.errors,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Something went wrong. Please try again." };
}

export function toApiClientError(error: unknown, fallbackMessage: string): ApiClientError {
  const normalized = normalizeApiError(error);

  return new ApiClientError(normalized.message || fallbackMessage, {
    statusCode: normalized.statusCode,
    errors: normalized.errors,
    causeError: error,
  });
}
