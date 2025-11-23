'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="flex h-screen bg-admin bg-cover bg-center">
            {!isMenuOpen && (
                <button
                    className="fixed top-3 left-3 z-50 lg:hidden text-white p-2 rounded text-4xl"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    🍄
                </button>
            )}

            <aside
                className={`
                    w-64 text-white 
                    fixed lg:static h-full z-40
                    transition-transform duration-300
                    backdrop-blur-lg bg-white/10
                    border-r border-white/30
                    shadow-lg
                    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex items-center justify-evenly mt-5 mb-10">
                    <h1 className="text-2xl font-bold text-center p-2">농장주 페이지</h1>
                    <button className="z-50 lg:hidden p-2 rounded text-4xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        🍄
                    </button>
                </div>
                <nav>
                    <Link href="/admin/list" className="block p-4 hover:bg-green-700 rounded">
                        노예 일상 모아보기
                    </Link>
                    <Link href="/admin/create" className="block p-4 hover:bg-green-700 rounded">
                        노예 일상 등록하기
                    </Link>
                </nav>
            </aside>
            {isMenuOpen && (
                <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/70 z-30 lg:hidden"></div>
            )}
            <main className="flex-1 overflow-auto lg:ml-0">{children}</main>
        </div>
    );
}
