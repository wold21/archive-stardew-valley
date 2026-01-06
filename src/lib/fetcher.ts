"use client";
export const fetcher = async (url: string, opts?: RequestInit) => {
  try {
    const res = await fetch(url, opts);
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
      const err: any = new Error(data?.message || "Request failed");
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (e: any) {
    console.error("Error caught in fetcher", {
      message: e?.message,
      status: e?.status,
      name: e?.name,
      stack: e?.stack,
    });
    throw e;
  }
};
