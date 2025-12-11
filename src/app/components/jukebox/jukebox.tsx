"use client";

import { useState, useRef, useEffect } from "react";
import {
  LeftArrow,
  PlayAndPause,
  RightArrow,
  Title,
  VolumeControl,
} from "../music/play";
import Border from "../wood-border/border";
import { useTime } from "@/contexts/time-context";

export default function Jukebox() {
  const [volume, setVolume] = useState(30);
  const { isNight } = useTime();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [dayMusicList, setDayMusicList] = useState<string[]>([]);
  const [nightMusicList, setNightMusicList] = useState<string[]>([]);
  const currentMusicList = isNight ? nightMusicList : dayMusicList;
  const currentTrack = currentMusicList[currentTrackIndex] || "";
  const currentPath = currentTrack
    ? `/assets/music/${isNight ? "night" : "day"}/${currentTrack}`
    : "";

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentPath) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? currentMusicList.length - 1 : newIndex;
    });
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % currentMusicList.length);
  };

  const handleTrackEnd = () => {
    handleNextTrack();
  };

  useEffect(() => {
    setCurrentTrackIndex(Math.floor(Math.random() * currentMusicList.length));

    if (isPlaying && audioRef.current && currentPath) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [isNight]);

  useEffect(() => {
    fetch("/api/music")
      .then((res) => res.json())
      .then((data) => {
        setDayMusicList(data.dayMusic);
        setNightMusicList(data.nightMusic);

        if (isNight) {
          setCurrentTrackIndex(
            Math.floor(Math.random() * data.nightMusic.length)
          );
        } else {
          setCurrentTrackIndex(
            Math.floor(Math.random() * data.dayMusic.length)
          );
        }
      });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current && currentPath) {
      audioRef.current.load();
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrackIndex]);

  return (
    <>
      <audio
        ref={audioRef}
        src={currentPath || undefined}
        onEnded={handleTrackEnd}
      />
      <div className="absolute md:right-24 xs:right-20 bottom-5 z-[100] lg:w-80 xs:w-60 h-20 opacity-80 shadow-lg overflow-hidden hover:opacity-100 transition-opacity">
        <div className="relative h-full bg-gradient-to-b from-[#e2985f] via-[#f3be6d] to-[#e2985f]">
          <Border />
          <div className="flex flex-col justify-evenly w-full h-full p-1">
            <div className="flex justify-between items-center px-2 gap-2">
              <Title title={currentTrack.split("-")[2]} />
              <VolumeControl
                volume={volume}
                onChangeVolume={handleVolumeChange}
              />
            </div>
            <div className="flex items-center justify-evenly">
              <LeftArrow onClick={handlePrevTrack} />
              <PlayAndPause onClick={togglePlay} isPlaying={isPlaying} />
              <RightArrow onClick={handleNextTrack} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
