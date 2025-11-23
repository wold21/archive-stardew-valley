'use client';
import { useState } from 'react';

export default function CreatePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles([...files, ...selectedFiles]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files) {
            const droppedFiles = Array.from(e.dataTransfer.files);
            // 이미지와 비디오만 필터링
            const validFiles = droppedFiles.filter(
                (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
            );
            setFiles([...files, ...validFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleBoxClick = () => {
        document.getElementById('fileInput')?.click();
    };
    return (
        <div className="p-0 flex flex-col items-center justify-center w-full h-full">
            <div
                onClick={handleBoxClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-2/3 h-1/2 flex flex-col gap-5 backdrop-blur-lg items-center justify-center rounded-xl text-white text-lg lg:text-2xl cursor-pointer bg-white/20 hover:bg-white/10 transition px-4 py-2
                ${
                    isDragging
                        ? 'border-sky-500 bg-white/20 shadow-sky-700'
                        : 'border-gray-100/30 hover:bg-white/10 hover:border-gray-100/50 shadow-sky-500 hover:shadow-sky-700'
                }`}
            >
                <div>일상을 등록해보아요!</div>
                <div>Drag & Drop</div>
            </div>
            <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*, video/*"
                onChange={handleFileChange}
                className="hidden"
            />
            {files.length > 0 && (
                <div className="w-2/3 backdrop-blur-lg bg-white/20 p-6 rounded-xl">
                    <p className="text-white font-bold mb-4">선택된 파일: {files.length}개</p>
                    {files.map((file, index) => (
                        <div className="flex items-center justify-between">
                            <span>
                                {file.name} ({file.type.startsWith('image/') ? '이미지' : '비디오'})
                            </span>
                            <button
                                onClick={() => handleRemoveFile(index)}
                                className="text-red-500 hover:text-red-700 text-xl cursor-pointer"
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
