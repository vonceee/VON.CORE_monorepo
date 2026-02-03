import React, { useState } from "react";
import {
  X,
  Zap,
  Sparkles,
  Smile,
  LayoutGrid,
  Heart,
  Calendar,
} from "lucide-react";

interface IntroductionViewProps {
  onClose: () => void;
}

type Tab = "intro" | "patch_notes";

export const IntroductionView: React.FC<IntroductionViewProps> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("intro");

  return (
    <div className="h-full flex flex-col bg-[#FFF0F5] text-[#4A2C35] overflow-y-auto custom-scroll lg:overflow-hidden relative animate-in fade-in duration-300 z-50 fixed inset-0">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/40 hover:bg-white/60 rounded-full transition-colors z-50 group"
        title="Close Info"
      >
        <X className="w-5 h-5 text-[#884A5E] group-hover:text-[#4A2C35] transition-colors" />
      </button>

      <div className="min-h-full lg:h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Content */}
        <div className="relative h-full lg:overflow-hidden bg-[#FFF5F8]">
          <div className="p-4 md:p-6 lg:p-0 absolute inset-0 overflow-y-auto custom-scroll flex flex-col pt-12">
            <div className="lg:p-8 lg:pt-8 max-w-2xl mx-auto w-full space-y-8 pb-12">
              {/* Tab Navigation */}
              <div className="sticky top-0 z-20 bg-[#FFF5F8] pt-2 flex items-center gap-6 border-b border-[#FFB6C1]/30 pb-4 mb-4">
                <button
                  onClick={() => setActiveTab("intro")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "intro"
                      ? "text-[#FF69B4] border-b-2 border-[#FF69B4]"
                      : "text-[#884A5E] hover:text-[#4A2C35]"
                  }`}
                >
                  Introduction
                </button>
                <button
                  onClick={() => setActiveTab("patch_notes")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "patch_notes"
                      ? "text-[#FF69B4] border-b-2 border-[#FF69B4]"
                      : "text-[#884A5E] hover:text-[#4A2C35]"
                  }`}
                >
                  Patch Notes
                </button>
              </div>

              {activeTab === "intro" ? (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Hero */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#FF69B4]">
                        v1.0.0 --lucky
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#4A2C35] mb-4">
                      Lucky Girl
                    </h1>

                    <p className="text-lg md:text-xl text-[#884A5E] font-light leading-relaxed border-l-2 border-[#FF69B4] pl-4 py-2">
                      Manifest your reality.{" "}
                      <span className="font-medium text-[#4A2C35]">
                        Affirmations
                      </span>
                      , vision boards, and daily tracking to keep your vibration
                      high and your goals clear.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <Feature
                      icon={<Sparkles className="w-5 h-5" />}
                      title="Daily Affirmations"
                      desc="Receive and record daily positive affirmations."
                    />
                    <Feature
                      icon={<LayoutGrid className="w-5 h-5" />}
                      title="Vision Board"
                      desc="Visualize your goals with a digital vision board."
                    />
                    <Feature
                      icon={<Smile className="w-5 h-5" />}
                      title="Mood Tracking"
                      desc="Log your mood and gratitude to raise your frequency."
                    />
                    <Feature
                      icon={<Heart className="w-5 h-5" />}
                      title="Self Care"
                      desc="Reminders and tracking for your daily self-care rituals."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Patch Notes Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#FF69B4]">
                        v1.0.0 --latest
                      </span>
                      <span className="text-xs text-[#884A5E]">2026-02-03</span>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-white/20 border border-white/20 space-y-2">
                        <div className="flex items-center gap-2 text-[#4A2C35] font-medium">
                          <Zap className="w-4 h-4 text-[#FF69B4]" />
                          Manifestation Begins
                        </div>
                        <p className="text-sm text-[#884A5E] leading-relaxed">
                          Welcome to the first version of Lucky Girl. Start
                          manifesting today.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Visual / Cover */}
        <div className="relative p-8 md:p-12 lg:pl-6 bg-[#FFE4E1] flex items-center justify-center min-h-[300px] lg:h-full overflow-hidden">
          {/* Visual Placeholder */}
          <div className="relative text-center">
            <div className="absolute -top-10 -left-10 text-9xl opacity-20 transform -rotate-12">
              ✨
            </div>
            <div className="text-6xl text-[#FF69B4] font-bold">LUCKY</div>
            <div className="text-6xl text-[#4A2C35] font-light">GIRL</div>
            <div className="absolute -bottom-10 -right-10 text-9xl opacity-20 transform rotate-12">
              🍀
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="space-y-3 group">
    <div className="w-10 h-10 rounded-lg bg-white/40 flex items-center justify-center text-[#884A5E] group-hover:text-[#FF69B4] group-hover:bg-[#FF69B4]/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-[#4A2C35] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
      {title}
    </h3>
    <p className="text-[#884A5E] text-sm leading-relaxed font-light">{desc}</p>
  </div>
);
