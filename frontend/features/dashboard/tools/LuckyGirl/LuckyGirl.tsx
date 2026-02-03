import React, { useState } from "react";
import { Info, Sparkles } from "lucide-react";
import { IntroductionView } from "./components/IntroductionView";

export const LuckyGirl = () => {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <div className="h-full w-full bg-[#FFF0F5] relative overflow-hidden flex flex-col font-sans text-[#4A2C35]">
      {/* Intro Overlay */}
      {showIntro && (
        <div className="absolute inset-0 z-50">
          <IntroductionView onClose={() => setShowIntro(false)} />
        </div>
      )}

      {/* Header */}
      <header className="px-8 py-6 border-b border-[#FFB6C1]/30 flex items-center justify-between bg-[#FFF5F8]/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF69B4]/10 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-[#FF69B4]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#4A2C35]">
            Lucky Girl
          </h1>
        </div>

        <button
          onClick={() => setShowIntro(true)}
          className="p-2 text-[#884A5E] hover:text-[#4A2C35] hover:bg-[#FF69B4]/10 rounded-full transition-colors"
          title="Information"
        >
          <Info className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area (Placeholder) */}
      <main className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <p className="text-[#884A5E] text-lg">
            "I am so lucky, everything works out for me."
          </p>
          <div className="h-64 bg-white/50 rounded-2xl border border-[#FFB6C1] flex items-center justify-center shadow-lg">
            <span className="text-sm uppercase tracking-widest text-[#FF69B4]">
              Dashboard Coming Soon
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
