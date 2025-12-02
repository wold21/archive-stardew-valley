export default function Border() {
    return (
        <>
            {/* 상단 테두리 */}
            <div className="absolute top-0 -left-1 -right-1 h-1.5 bg-brownwood bg-size-[100%_100%] bg-center after:absolute after:inset-0 after:bg-gradient-to-r after:from-[#8a3a06]/80 after:to-[#cc6f04]/80 after:mix-blend-soft-light"></div>
            {/* 하단 테두리 */}
            <div className="absolute bottom-0 -left-1 -right-1 h-1.5 bg-brownwood bg-size-[30%_5%] bg-center after:absolute after:inset-0 after:bg-gradient-to-r after:from-[#8a3a06]/80 after:to-[#cc6f04]/80 after:mix-blend-multiply"></div>
            {/* 좌측 테두리 */}
            <div className="absolute -top-1 left-0 -bottom-1 w-1.5 bg-brownwood bg-size-[100%_100%] bg-center after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#8a3a06]/80 after:to-[#cc6f04]/80 after:mix-blend-darken"></div>
            {/* 우측 테두리 */}
            <div className="absolute -top-1 right-0 -bottom-1 w-1.5 bg-brownwood bg-size-[100%_100%] bg-center after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#8a3a06]/80 after:to-[#cc6f04]/80 after:mix-blend-darken"></div>
        </>
    );
}

// bg-blend-multiply: 어둡게 곱하기 (진한 나무 느낌)
// bg-blend-overlay: 밝은 부분은 밝게, 어두운 부분은 어둡게
// bg-blend-soft-light: 부드러운 조명 효과
// bg-blend-hard-light: 강한 조명 효과
// bg-blend-darken: 어두운 쪽 선택
// bg-blend-lighten: 밝은 쪽 선택