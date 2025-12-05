'use client';

import Card from './components/card/Card';
import playImages from './images';

import { redirect } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Asset } from '@/types/asset';
import AdminCard from '@/app/components/card/Card';
import { ApiResponse } from '@/types/common';
import Masonry from 'react-masonry-css';
import { useInfiniteAssets } from '@/hooks/useInfiniteAssets';

export default function Home() {
    const LIMIT = 50;
    const { items, isLoading, hasMore, loadMore } = useInfiniteAssets(LIMIT);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loadMoreRef.current || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore) {
                    loadMore();
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50%',
            }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasMore, isLoading, loadMore]);
    return (
        <>
            <div
                onClick={() => redirect('/admin')}
                className="absolute bottom-5 right-5 w-10 h-10 bg-black opacity-50 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity z-50"
            >
                <span className="text-white text-2xl">⚙️</span>
            </div>
            <div className="h-screen bg-forest bg-cover bg-center bg-fixed overflow-y-auto">
                <div className="container mx-auto p-6">
                    {items.length === 0 && !isLoading && (
                        <div className="w-full py-8 flex justify-center items-center">
                            <div className="font-esamanru font-bold text-[#8b6f47] text-lg">
                                노예들의 일상이 아직 하나도 없어요.
                            </div>
                        </div>
                    )}
                    <Masonry
                        breakpointCols={{
                            default: 6,
                            1024: 4,
                            768: 2,
                        }}
                        className="flex -ml-6 w-auto"
                        columnClassName="pl-6 bg-clip-padding"
                    >
                        {items.map((item) => (
                            <Card
                                key={item.id}
                                id={item.id}
                                thumbnailPath={item.thumbnailPath}
                                filePath={item.filePath}
                                title={item.title}
                                description={item.description}
                                fileType={item.fileType}
                            />
                        ))}
                        {/* 로딩 스켈레톤 */}
                        {isLoading &&
                            [...Array(LIMIT)].map((_, i) => (
                                <div
                                    key={`skeleton-${i}`}
                                    className="break-inside-avoid mb-4 animate-[fadeIn_0.5s_ease-in-out]"
                                >
                                    <div className="bg-brownwood bg-size-[100%_100%] bg-center p-2 rounded-lg">
                                        <div className="relative overflow-hidden border-2 border-[rgba(92,64,51,0.3)] rounded h-48 bg-gray-400 animate-pulse"></div>
                                        <div className="bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] p-3 mt-2 border-2 border-[rgba(92,64,51,0.2)]">
                                            <div className="h-4 bg-gray-400 rounded animate-pulse mb-2"></div>
                                            <div className="h-3 bg-gray-400 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Masonry>

                    {/* 무한 스크롤 트리거 */}
                    <div ref={loadMoreRef} className="w-full py-8 flex justify-center">
                        {isLoading && (
                            <div className="font-esamanru font-bold text-[#8b6f47] text-lg">착취 로딩 중...</div>
                        )}
                        {!hasMore && items.length > 0 && (
                            <div className="font-esamanru font-bold text-[#e3af66] text-lg">
                                착취 내음 가득한 노예들의 일상을 더 추가해 주세요.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
