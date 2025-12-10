'use client';

import { useEffect, useState } from "react";

export default function Background({ children }: { children: React.ReactNode }) {
    const [isNight, setIsNight] = useState(() => {
        const hour = new Date().getHours();
        return hour >= 19 || hour < 6;
    });

    useEffect(() => {
        const checkTime = () => {
            const hour = new Date().getHours();
            setIsNight(hour >= 19 || hour < 6);
        }
        const intervalId = setInterval(checkTime, 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`min-h-screen bg-cover bg-center transition-all duration-[10000ms] ease-in-out ${
                isNight ? 'bg-night' : 'bg-day'
            }`}>
            {children}
        </div>
    )
}