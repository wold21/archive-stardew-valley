"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import ErrorContent from "../components/error/error-content";

export default function ErrorPageDetail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
