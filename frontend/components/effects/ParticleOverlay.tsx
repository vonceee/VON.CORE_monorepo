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

const ParticleOverlay: React.FC = () => {
  const { theme } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (theme === "dark" || theme === "light") {
      setParticles([]);
      return;
    }

    const count = theme === "snow" ? 50 : 20; // Fewer items for hearts/orbs
    const newParticles: Particle[] = Array.from({ length: count }).map(
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 5, // 5-10s
        size: Math.random() * 10 + 10, // 10-20px
      }),
    );
    setParticles(newParticles);
  }, [theme]);

  if (theme === "dark" || theme === "light") return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {particles.map((p) => {
        if (theme === "snow") {
          return (
            <div
              key={p.id}
              className="absolute top-[-20px] rounded-full bg-white opacity-80"
              style={{
                left: `${p.left}%`,
                width: `${p.size / 2}px`,
                height: `${p.size / 2}px`,
                animation: `snowfall ${p.duration}s linear infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          );
        }

        if (theme === "valentines") {
          return (
            <div
              key={p.id}
              className="absolute bottom-[-50px] text-pink-500 opacity-60"
              style={{
                left: `${p.left}%`,
                fontSize: `${p.size}px`,
                animation: `floatUp ${p.duration}s ease-in infinite`,
                animationDelay: `${p.delay}s`,
              }}
            >
              ❤
            </div>
          );
        }

        if (theme === "halloween") {
          return (
            <div
              key={p.id}
              className="absolute bottom-[-50px] rounded-full bg-orange-500 blur-sm opacity-50"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `pulse-float ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
                backgroundColor: p.id % 2 === 0 ? "#ff9100" : "#9c27b0", // Orange/Purple
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default ParticleOverlay;
