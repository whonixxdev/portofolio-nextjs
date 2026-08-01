"use client";

import { useRef, useState } from "react";
import { FiMusic } from "react-icons/fi";
import MagneticWrapper from "../animations/MagneticWrapper";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleMusic = () => {
        if (!audioRef.current) {
            const audio = new Audio("/songs/music/Music.mp3");
            audio.loop = true;
            audioRef.current = audio;
        }

        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play().catch((error) =>
                console.log("audio play blocked:", error)
            );
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
            <MagneticWrapper>
                <button
                    onClick={toggleMusic}
                    className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl lg:rounded-full bg-[#1a1a1a] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group"
                >
                    <FiMusic
                        className={`w-5 h-5 lg:w-[22px] lg:h-[22px] ${isPlaying ? "animate-spin" : ""
                            }`}
                    />
                    <span
                        className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isPlaying ? "bg-green-400" : "bg-red-500"
                            }`}
                    />
                </button>
            </MagneticWrapper>
        </div>
    );
}