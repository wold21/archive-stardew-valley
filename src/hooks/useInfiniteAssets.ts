import useSWRInfinite from 'swr/infinite';
import { fetcher } from '@/lib/fetcher';
import { ApiResponse } from '@/types/common';

export function useInfiniteAssets(limit: number = 20) {
    const getKey = (pageIndex: number, previousPageData: ApiResponse | null) => {
        if (previousPageData && previousPageData.data.items.length === 0) return null;    
        if(pageIndex === 0) limit = 50;
        return `${process.env.NEXT_PUBLIC_API_BASE_URL}assets?offset=${pageIndex * limit}&limit=${limit}`;
    }; 

    const {data, error, size, setSize, isLoading, isValidating, mutate} = useSWRInfinite<ApiResponse>(getKey, fetcher, {
        revalidateFirstPage: false,
        revalidateOnFocus: false,
    })

    const items = data ? data.flatMap(page => page.data.items) : [];
    const hasMore = data ? data[data.length - 1].data.items.length === limit : true;

    return {
        items,
        isLoading,
        isValidating,
        error,
        hasMore,
        loadMore: () => setSize(size + 1),
        mutate,
    }
}