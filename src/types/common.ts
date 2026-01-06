import { Asset } from "./asset";

interface ApiResponse {
  data: {
    items: Asset[];
    total: number;
    offset: number;
    limit: number;
  };
}

interface FetchError extends Error {
  status?: number;
  data?: any;
}

export type { ApiResponse, FetchError };
