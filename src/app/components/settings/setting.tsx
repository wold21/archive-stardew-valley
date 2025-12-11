"use client";

import { redirect, usePathname } from "next/navigation";
export default function Setting() {
  const pathname = usePathname();
  const nextPath = pathname.includes("/admin") ? "/" : "/admin/list";
  return (
    <div
      onClick={() => redirect(nextPath)}
      className="absolute bottom-6 right-5 w-100 h-10 bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] opacity-80 hover:opacity-100 rounded-full flex items-center justify-center cursor-pointer transition-opacity z-50"
    >
      {/* 설정 버튼 */}
      <button className="w-12 h-12 bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] border-4 border-[#8B4513] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-lg">
        {nextPath === "/" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#8B4513"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#8B4513"
            className="size-6"
          >
            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
