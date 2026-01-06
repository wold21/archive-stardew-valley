"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Border from "../components/wood-border/border";

export default function ErrorPageDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");

  const getErrorMessage = (status: string | null) => {
    switch (status) {
      case "400":
        return "잘못된 요청입니다.";
      case "500":
        return "서버 오류가 발생했습니다.";
      case "502":
        return "Bad Gateway - 서버가 응답하지 않습니다.";
      case "network":
        return "네트워크 연결을 확인해주세요.";
      default:
        return "알 수 없는 오류가 발생했습니다.";
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-96 h-auto flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] p-6">
        <Border />
        <h1 className="text-3xl font-neodgm font-bold text-shadow-sm text-[#5c2500] tracking-wider">
          오류 발생
        </h1>
        <p className="font-neodgm font-light text-shadow-sm text-lg text-[#8b6f47] leading-relaxed">
          {getErrorMessage(status)}
        </p>
        <button
          onClick={() => router.push("/")}
          className="font-esamanru font-bold text-[#5c2500] text-base"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
