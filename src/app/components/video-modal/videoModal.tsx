'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Border from '../wood-border/border';

interface VideoModalProps {
    src: string;
    title: string;
    description?: string;
    onClose: () => void;
}

export default function VideoModal({ src, title, description, onClose }: VideoModalProps) {
    console.log('VideoModal opened with src:', src);
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return createPortal(
        <div 
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative max-w-[45vw] max-h-[90vh]">
                <Border/>
                <video
                    src={src}
                    controls
                    autoPlay
                    preload="true"
                    className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            <div className='relative mt-4 max-w-[45vw]'>
                <Border/>
                <div className="bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f] p-3 border-2 border-[rgba(92,64,51,0.2)]">
                    <h3 className="font-esamanru font-bold text-shadow text-sm mb-2 text-[#5c2500] tracking-wider">
                        {title}
                    </h3>
                    {description && (
                        <p className="font-esamanru font-light text-shadow text-xs text-[#8b6f47] leading-relaxed whitespace-pre-wrap break-words overflow-y-auto max-h-32">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
