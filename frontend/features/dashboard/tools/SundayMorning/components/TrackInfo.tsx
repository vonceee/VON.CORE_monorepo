import React, { useState, useRef, useEffect } from "react";
import { useInView } from "../hooks/useInView";
import { Play, Pause, Volume2 } from "lucide-react";
import vinylImg from "../../../../../assets/albums/SundayMorning/weverse_0-299937995.jpeg";
import audioFile from "../../../../../assets/albums/SundayMorning/ILLIT (아일릿) 'Sunday Morning Official MV.mp3";

export const TrackInfo: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Sync isPlaying state if audio ends
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const onEnded = () => setIsPlaying(false);
      audio.addEventListener("ended", onEnded);
      return () => audio.removeEventListener("ended", onEnded);
    }
  }, []);

  return (
    <section
      id="track-info"
      className="min-h-screen flex flex-col justify-center items-center p-[var(--sm-space-8)] pt-[calc(var(--sm-space-16)+var(--sm-space-8))] md:p-[var(--sm-space-16)] md:pt-[calc(var(--sm-space-16)+var(--sm-space-8))] bg-[var(--sm-color-surface)] snap-center overflow-hidden"
    >
      <div
        ref={ref}
        className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-[var(--sm-space-16)]"
      >
        {/* Info Column */}
        <div
          className={`space-y-[var(--sm-space-8)] text-center md:text-left transition-all duration-1000 ease-out transform ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <div>
            <h2 className="text-[var(--sm-text-3xl)] md:text-[var(--sm-text-4xl)] sm-font-serif text-[var(--sm-color-primary)] mb-[var(--sm-space-2)]">
              Track Info
            </h2>
            <div className="w-12 h-1 bg-[var(--sm-color-secondary)]/30 mx-auto md:mx-0 mb-[var(--sm-space-6)]" />

            <p className="text-[var(--sm-text-xl)] text-[var(--sm-color-text-main)] font-medium tracking-wide">
              Sunday Morning
            </p>
            <p className="text-[var(--sm-text-base)] text-[var(--sm-color-secondary)] uppercase tracking-widest mt-1">
              Japan 2nd Digital Single
            </p>
          </div>

          <div className="space-y-[var(--sm-space-2)]">
            <p className="text-[var(--sm-text-sm)] font-bold text-[var(--sm-color-primary)] uppercase tracking-wider">
              Release Date
            </p>
            <p className="text-[var(--sm-text-lg)] text-[var(--sm-color-text-muted)] sm-font-serif">
              2026.1.13
            </p>
          </div>

          <div className="space-y-[var(--sm-space-2)]">
            <p className="text-[var(--sm-text-sm)] font-bold text-[var(--sm-color-primary)] uppercase tracking-wider">
              Artist
            </p>
            <p className="text-[var(--sm-text-lg)] text-[var(--sm-color-text-muted)] sm-font-serif">
              ILLIT
            </p>
          </div>

          <div className="space-y-[var(--sm-space-4)]">
            <p className="text-[var(--sm-text-sm)] font-bold text-[var(--sm-color-primary)] uppercase tracking-wider">
              Members
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {["Yunah", "Minju", "Moka", "Wonhee", "Iroha"].map((member) => (
                <span
                  key={member}
                  className="px-4 py-1 border border-[var(--sm-color-secondary)]/30 rounded-full text-[var(--sm-text-sm)] text-[var(--sm-color-text-muted)] hover:border-[var(--sm-color-primary)] hover:text-[var(--sm-color-primary)] transition-colors cursor-default"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Vinyl Animation Column & Player */}
        <div
          className={`flex flex-col items-center gap-[var(--sm-space-8)] transition-all duration-1000 delay-300 ease-out transform ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Vinyl Record */}
            <div
              className="absolute inset-0 rounded-full bg-black shadow-2xl flex items-center justify-center animate-spin-slow"
              style={{
                animationDuration: "8s",
                animationPlayState: isPlaying ? "running" : "paused",
              }}
            >
              {/* Vinyl Grooves effect */}
              <div className="absolute inset-2 rounded-full border border-gray-800 opacity-50" />
              <div className="absolute inset-4 rounded-full border border-gray-800 opacity-50" />
              <div className="absolute inset-8 rounded-full border border-gray-800 opacity-50" />

              {/* Label / Image */}
              <div className="w-1/2 h-1/2 rounded-full overflow-hidden border-4 border-[#1a1a1a] relative z-10">
                <img
                  src={vinylImg}
                  alt="Album Art"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center Hole */}
              <div className="absolute w-3 h-3 bg-white rounded-full z-20" />
            </div>

            {/* Reflection/Sheen */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          </div>

          {/* Audio Player UI */}
          <div className="w-full max-w-sm bg-[var(--sm-color-background)]/50 backdrop-blur-sm border border-[var(--sm-color-secondary)]/20 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
            {/* Hidden Audio Element - try to load local file, user might need to place it */}
            <audio
              ref={audioRef}
              src={audioFile}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--sm-color-primary)] text-[var(--sm-color-background)] hover:opacity-90 transition-opacity"
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                )}
              </button>

              <div className="flex-1 flex flex-col gap-1">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-[var(--sm-color-secondary)]/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--sm-color-primary)]"
                />
                <div className="flex justify-between text-[10px] text-[var(--sm-color-text-muted)] font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 0)}</span>
                </div>
              </div>

              <Volume2 size={16} className="text-[var(--sm-color-secondary)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
