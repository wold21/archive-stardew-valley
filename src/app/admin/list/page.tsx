'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Asset } from '@/types/asset';
import AdminCard from '@/app/components/card/AdminCard';

interface ApiResponse {
    data: {
        items: Asset[];
        total: number;
        offset: number;
        limit: number;
    };
}

export default function ListPage() {
    const [items, setItems] = useState<Asset[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);

    const LIMIT = 50;

    const fetchAssets = useCallback(async (currentOffset: number) => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}assets?offset=${currentOffset}&limit=${LIMIT}`);
            const result: ApiResponse = await response.json();
            console.log('Fetched assets:', result.data.items);
            // console.log(`${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/${items[0].thumbnailPath}`)
            if (result.data.items.length === 0) {
                setHasMore(false);
            } else {
                setItems(prev => [...prev, ...result.data.items]);
                setOffset(currentOffset + LIMIT);
            }
        } catch (error) {
            console.error('Failed to fetch assets:', error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            fetchAssets(0);
        }
    }, [fetchAssets]);

    useEffect(() => {
        if (!loadMoreRef.current || !hasMore) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    fetchAssets(offset);
                }
            },
            { threshold: 0.1 }
        );

        observerRef.current.observe(loadMoreRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [offset, loading, hasMore, fetchAssets]);

    return (
        <div className="container mx-auto p-6">
            {items.length === 0 && !loading && (
                    <div className='w-full py-8 flex justify-center items-center'>
                        <div className="font-esamanru font-bold text-[#8b6f47] text-lg">
                            노예들의 일상이 아직 하나도 없어요.
                        </div>
                    </div>
                )}
            <div className="columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
                {items.map(item => (
                    <AdminCard 
                        key={item.id}
                        id={item.id}
                        thumbnailPath={item.thumbnailPath}
                        filePath={item.filePath}
                        title={item.title}
                        description={item.description}
                        fileType={item.fileType}
                    />
                ))}
            </div>

            {/* 무한 스크롤 트리거 */}
            <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
                {loading && (
                    <div className="font-esamanru font-bold text-[#8b6f47] text-lg">
                        착취 로딩 중...
                    </div>
                )}
                {!hasMore && items.length > 0 && (
                    <div className="font-esamanru font-bold text-[#8b6f47] text-lg">
                        착취로 인한 노예들의 일상을 더 추가해주세요.
                    </div>
                )}
            </div>
        </div>
    );
}
