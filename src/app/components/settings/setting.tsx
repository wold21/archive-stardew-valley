'use client';

import { redirect, usePathname  } from 'next/navigation';
export default function Setting() {
    const pathname = usePathname();
    const nextPath = pathname.includes('/admin') ? '/' : '/admin/list';
    return (
        <div
            onClick={() => redirect(nextPath)}
            className="absolute bottom-5 right-5 w-100 h-10 bg-black opacity-80 rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity z-50"
        >
            {/* 설정 버튼 */}
            <button className="w-12 h-12 bg-[#5a3921] border-4 border-[#2d1810] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#6b4529] hover:scale-110 transition-all shadow-lg">
                <span className="text-2xl">⚙️</span>
            </button>
        </div>
    )
}