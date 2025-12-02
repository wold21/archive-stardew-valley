import { Asset } from "./asset";

interface ApiResponse {
    data: {
        items: Asset[];
        total: number;
        offset: number;
        limit: number;
    };
}

export type { ApiResponse };