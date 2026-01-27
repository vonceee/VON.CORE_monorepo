import React from "react";

export const SundayMorningSidebar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-[var(--sm-space-2)] p-[var(--sm-space-4)] h-full">
      <div className="mb-[var(--sm-space-6)] px-[var(--sm-space-2)]">
        <h3 className="text-[var(--sm-color-secondary)] text-[var(--sm-text-xs)] font-bold uppercase tracking-wider mb-[var(--sm-space-2)]">
          Navigation
        </h3>
        <p className="text-[var(--sm-color-text-muted)] text-[var(--sm-text-sm)] italic opacity-70">
          "Slow down..."
        </p>
      </div>

      <nav className="flex flex-col gap-1">
        {[
          { id: "hero", label: "Start" },
          { id: "narrative", label: "The Story" },
          { id: "gallery", label: "Moments" },
          { id: "lyrics", label: "Lyrics" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-left px-[var(--sm-space-3)] py-[var(--sm-space-2)] rounded-md text-[var(--sm-color-text-muted)] hover:bg-[var(--sm-color-surface)] hover:text-[var(--sm-color-primary)] transition-colors text-[var(--sm-text-sm)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--sm-color-secondary)]/20"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-[var(--sm-space-2)] border-t border-[var(--sm-color-secondary)]/10 pt-[var(--sm-space-6)]">
        <div className="text-[var(--sm-color-secondary)] text-[10px] uppercase tracking-widest mb-[var(--sm-space-3)]">
          Now Playing
        </div>
        <div className="flex items-center gap-[var(--sm-space-3)]">
          <div className="w-8 h-8 bg-[var(--sm-color-accent)] rounded-sm flex items-center justify-center text-[10px] text-[var(--sm-color-primary)]">
            SM
          </div>
          <div>
            <div className="text-[var(--sm-color-primary)] text-[var(--sm-text-xs)] font-medium">
              Sunday Morning
            </div>
            <div className="text-[var(--sm-color-secondary)] text-[10px]">
              ILLIT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
