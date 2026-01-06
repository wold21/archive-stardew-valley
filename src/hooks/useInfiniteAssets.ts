"use client";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/fetcher";
import { ApiResponse, FetchError } from "@/types/common";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useInfiniteAssets(limit: number = 20) {
  const router = useRouter();
  const getKey = (pageIndex: number, previousPageData: ApiResponse | null) => {
    if (previousPageData && previousPageData.data.items.length === 0)
      return null;
    if (pageIndex === 0) limit = 50;
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}assets?offset=${
      pageIndex * limit
    }&limit=${limit}`;
  };

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<ApiResponse>(getKey, fetcher, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    });

  useEffect(() => {
    if (error) {
      const status = (error as FetchError)?.status;
      const message = (error as FetchError)?.message;

      // 400, 500, 502 에러 시 에러 페이지로 이동
      if (status === 400 || status === 500 || status === 502) {
        router.push(`/error?status=${status}`);
      } else if (message === "Failed to fetch") {
        // 네트워크 에러 (CORS, 서버 연결 불가 등)
        router.push(`/error?status=network`);
      }
    }
  }, [error, router]);

  const items = data ? data.flatMap((page) => page.data.items) : [];
  const hasMore = data
    ? data[data.length - 1].data.items.length === limit
    : true;

  return {
    items,
    isLoading,
    isValidating,
    error,
    hasMore,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}
