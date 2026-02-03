import React from "react";
import { Moon, Sun, Maximize, Info } from "lucide-react";

interface NavBarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  onOpenPlayground: () => void;
  onToggleFullscreen: () => void;
  onShowIntro: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  theme,
  toggleTheme,
  onOpenPlayground,
  onToggleFullscreen,
  onShowIntro,
}) => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-[var(--sm-space-8)] py-[var(--sm-space-4)] bg-[var(--sm-color-background)]/80 backdrop-blur-md border-b border-[var(--sm-color-secondary)]/10 transition-colors duration-300">
      <div className="text-[var(--sm-text-lg)] font-bold sm-font-serif text-[var(--sm-color-primary)] tracking-tight">
        Sunday Morning
      </div>

      <div className="flex items-center gap-[var(--sm-space-4)]">
        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-full text-[var(--sm-color-text-muted)] hover:text-[var(--sm-color-primary)] hover:bg-[var(--sm-color-secondary)]/10 transition-colors"
          aria-label="Toggle Fullscreen"
        >
          <Maximize size={20} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-[var(--sm-color-text-muted)] hover:text-[var(--sm-color-primary)] hover:bg-[var(--sm-color-secondary)]/10 transition-colors"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Info Toggle */}
        <button
          onClick={onShowIntro}
          className="p-2 rounded-full text-[var(--sm-color-text-muted)] hover:text-[var(--sm-color-primary)] hover:bg-[var(--sm-color-secondary)]/10 transition-colors"
          aria-label="Show Info"
        >
          <Info size={20} />
        </button>

        {/* Dev Tool Toggle */}
        <button
          onClick={onOpenPlayground}
          className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold border border-[var(--sm-color-secondary)]/30 rounded-full text-[var(--sm-color-text-muted)] hover:border-[var(--sm-color-primary)] hover:text-[var(--sm-color-primary)] transition-colors"
        >
          Dev: DS
        </button>
      </div>
    </nav>
  );
};
