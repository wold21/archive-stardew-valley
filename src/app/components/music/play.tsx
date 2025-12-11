"use client";
export function LeftArrow({ onClick }: { onClick?: () => void }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#D2691E"
      className="xs:size-5 md:size-6 cursor-pointer"
    >
      <path
        fillRule="evenodd"
        d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
        clipRule="evenodd"
        stroke="#8B4513"
        strokeWidth="2"
      />
    </svg>
  );
}

export function RightArrow({ onClick }: { onClick?: () => void }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="xs:size-5 md:size-6 cursor-pointer"
    >
      <path
        fillRule="evenodd"
        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
        clipRule="evenodd"
        stroke="#8B4513"
        strokeWidth="2"
      />
    </svg>
  );
}

export function PlayAndPause({
  onClick,
  isPlaying,
}: {
  onClick: () => void;
  isPlaying: boolean;
}) {
  return (
    <div className="w-30 overflow-hidden">
      {isPlaying ? (
        <svg
          onClick={onClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="xs:size-5 md:size-6 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
            clipRule="evenodd"
            stroke="#8B4513"
            fill="#8B4513"
            strokeWidth="1"
          />
        </svg>
      ) : (
        <svg
          onClick={onClick}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="xs:size-5 md:size-6 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            clipRule="evenodd"
            stroke="#8B4513"
            fill="#8B4513"
            strokeWidth="1"
          />
        </svg>
      )}
    </div>
  );
}

export function Title({ title }: { title: string }) {
  return (
    <div className="overflow-hidden w-30 text-[#8B4513] font-neodgm font-bold text-lg">
      <div className="animate-scroll">{title}</div>
    </div>
  );
}

interface VolumeControlProps {
  volume: number;
  onChangeVolume: (volume: number) => void;
}

export function VolumeControl({ volume, onChangeVolume }: VolumeControlProps) {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={volume}
      onChange={(e) => onChangeVolume(Number(e.target.value))}
      className="w-20 h-1 bg-[#8B4513] rounded-lg appearance-none cursor-pointer accent-[#D2691E]"
      style={{
        background: `linear-gradient(to right, #D2691E ${volume}%, #D2691E ${volume}%, #8B4513 30%, #8B4513 100%)`,
      }}
    />
  );
}
