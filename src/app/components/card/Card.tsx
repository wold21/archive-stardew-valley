'use client';

import { useState } from 'react';
import ImageModal from '../image-modal/ImageModal';

interface CardProps {
    id: number;
    src: string;
}

export default function Card({ id, src }: CardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {isModalOpen && (
                <ImageModal 
                    src={src} 
                    alt={`Image ${id}`} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
            <div className="break-inside-avoid mb-4">
                <div className="bg-brownwood bg-size-[100%_100%] bg-center p-2 cursor-pointer transition-transform duration-100 rounded-lg hover:brightness-105 group">
                    <div 
                        className="relative overflow-hidden bg-white border-2 border-[rgba(92,64,51,0.3)] rounded cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <img 
                            src={src} 
                            alt={`Image ${id}`}
                            className="w-full h-auto object-cover [image-rendering:pixelated] hover:scale-105 transition-transform duration-200"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
