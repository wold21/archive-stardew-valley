"use client";

import { useTime } from "@/contexts/time-context";
import { useEffect } from "react";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isNight, setIsNight } = useTime();

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 19 || hour < 6);
    };
    const intervalId = setInterval(checkTime, 60 * 1000);
    return () => clearInterval(intervalId);
  }, [setIsNight]);

  return (
    <div
      className={`min-h-screen bg-cover bg-center transition-all duration-[10000ms] ease-in-out ${
        isNight ? "bg-night" : "bg-day"
      }`}
    >
      {isNight && (
        <div className="fixed inset-0 -z-0 flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rotate-45 animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
            ))}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
