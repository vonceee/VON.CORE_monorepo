import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

type Particle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  char?: string;
};

type ThemeConfig = {
  count: number;
  sizeRange: [number, number];
  renderParticle: (p: Particle) => React.ReactNode;
};

const ParticleOverlay: React.FC = () => {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  const themeConfigs: Record<string, ThemeConfig> = {
    snow: {
      count: 50,
      sizeRange: [7.5, 15],
      renderParticle: (p) => (
        <div
          key={p.id}
          className="absolute top-[-20px] rounded-full bg-white opacity-80"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `snowfall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ),
    },
    valentines: {
      count: 50,
      sizeRange: [15, 30],
      renderParticle: (p) => {
        const colorClass =
          p.id % 3 === 0
            ? "text-red-500"
            : p.id % 3 === 1
              ? "text-pink-500"
              : "text-rose-400";
        return (
          <div
            key={p.id}
            className={`absolute ${colorClass} drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]`}
            style={{
              left: `${p.left}%`,
              bottom: "-50px",
              fontSize: `${p.size}px`,
              animation: `floatUp ${p.duration}s ease-in infinite`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.char || "❤"}
          </div>
        );
      },
    },
  };

  useEffect(() => {
    const config = themeConfigs[theme];

    if (!config) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: config.count }).map(
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5,
        size:
          Math.random() * (config.sizeRange[1] - config.sizeRange[0]) +
          config.sizeRange[0],
        char: Math.random() > 0.5 ? "❤" : "♥",
      }),
    );
    setParticles(newParticles);
  }, [theme]);

  const config = themeConfigs[theme];
  if (!config) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {particles.map(config.renderParticle)}
    </div>
  );
};

export default ParticleOverlay;
