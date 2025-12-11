"use client";

import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import { createContext, useContext, useState, ReactNode } from "react";

interface TimeContextType {
  isNight: boolean;
  setIsNight: (value: boolean) => void;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export function TimeProvider({ children }: { children: ReactNode }) {
  const [isNight, setIsNight] = useState(false);

  return (
    <TimeContext.Provider value={{ isNight, setIsNight }}>
      {children}
    </TimeContext.Provider>
  );
}

export function useTime() {
  const context = useContext(TimeContext);
  if (!context) {
    throw new Error("useTime must be used within TimeProvider");
  }
  return context;
}
