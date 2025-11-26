'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
    src: string;
    alt: string;
    onClose: () => void;
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative max-w-[45vw] max-h-[90vh]">
                <img
                    src={src}
                    alt={alt}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>,
        document.body
    );
}
