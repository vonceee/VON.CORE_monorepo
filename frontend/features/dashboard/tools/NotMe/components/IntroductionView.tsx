import React, { useState } from "react";
import {
  X,
  Target,
  Trophy,
  MessageSquare,
  Calendar,
  Zap,
  Shield,
  Activity,
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
    <div className="h-full w-full flex flex-col bg-[#09090b] text-[#e8eaed] overflow-y-auto custom-scroll lg:overflow-hidden relative animate-in fade-in duration-300">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-50 group"
        title="Close Info"
      >
        <X className="w-5 h-5 text-[#5f6368] group-hover:text-[#e8eaed] transition-colors" />
      </button>

      <div className="min-h-full lg:h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Content */}
        <div className="relative h-full lg:overflow-hidden">
          <div className="p-4 md:p-6 lg:p-0 absolute inset-0 overflow-y-auto custom-scroll flex flex-col pt-12">
            <div className="lg:p-6 lg:pt-0 max-w-2xl mx-auto w-full space-y-8 pb-12">
              {/* Tab Navigation */}
              <div className="sticky top-0 z-20 bg-[#09090b] pt-2 flex items-center gap-6 border-b border-white/5 pb-4 mb-4">
                <button
                  onClick={() => setActiveTab("intro")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "intro"
                      ? "text-[#60a5fa] border-b-2 border-[#60a5fa]"
                      : "text-[#5f6368] hover:text-[#e8eaed]"
                  }`}
                >
                  Introduction
                </button>
                <button
                  onClick={() => setActiveTab("patch_notes")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "patch_notes"
                      ? "text-[#60a5fa] border-b-2 border-[#60a5fa]"
                      : "text-[#5f6368] hover:text-[#e8eaed]"
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
                      <span className="text-xs font-bold tracking-[0.2em] text-[#60a5fa]">
                        v1.0.0 --stable
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-white">
                      Not Me.
                    </h1>

                    <p className="text-lg md:text-xl text-[#9aa0a6] font-light leading-relaxed border-l-2 border-[#60a5fa] pl-4 py-2">
                      a minimalist tracker designed for{" "}
                      <span className="text-white font-medium">
                        behavioral clarity
                      </span>
                      . monitor your daily quantities and binary outcomes
                      through a clean, distraction-free dashboard.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <Feature
                      icon={<Target className="w-5 h-5" />}
                      title="Precision Counters"
                      desc="track daily quantities like water intake, reading, or exercises with visual progress bars."
                    />
                    <Feature
                      icon={<Trophy className="w-5 h-5" />}
                      title="Outcome Tracking"
                      desc="log binary results (Win/Loss) for games, challenges, or pass/fail habits."
                    />
                    <Feature
                      icon={<MessageSquare className="w-5 h-5" />}
                      title="Contextual Notes"
                      desc="attach reflections or specific details to any tracker to capture the 'why' behind the data."
                    />
                    <Feature
                      icon={<Calendar className="w-5 h-5" />}
                      title="History & Trends"
                      desc="traverse your journey through an integrated calendar view to review past performance."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Patch Notes Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#60a5fa]">
                        v1.0.0 --stable
                      </span>
                      <span className="text-xs text-[#5f6368]">2026-01-06</span>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[#e8eaed] font-medium">
                          <Zap className="w-4 h-4 text-[#60a5fa]" />
                          Core Release
                        </div>
                        <p className="text-sm text-[#9aa0a6] leading-relaxed">
                          Initial deployment of the Not Me tracking system
                          including Counter and Outcome tracker types.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[#e8eaed] font-medium">
                          <Shield className="w-4 h-4 text-[#60a5fa]" />
                          Persistence Layer
                        </div>
                        <p className="text-sm text-[#9aa0a6] leading-relaxed">
                          Full integration with the backend API for real-time
                          saving and history retrieval.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Cover Photo */}
        <div className="relative p-8 md:p-12 lg:pl-6 bg-[#09090b] flex items-center justify-center min-h-[500px] lg:h-full overflow-hidden">
          {/* Background Image (Blurred) */}
          <div className="absolute inset-0 z-0 select-none">
            <img
              src="assets/yunah/yunah_12282025.jpg"
              alt=""
              className="w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          </div>

          {/* Album Cover Card */}
          <div className="relative group perspective-1000">
            <div className="relative w-72 h-72 md:w-96 md:h-96 bg-[#09090b] border border-white/10 rounded-sm shadow-2xl rotate-3 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 overflow-hidden">
              <div className="absolute" />
              <div className="w-full h-full bg-[#09090b] flex items-center justify-center relative overflow-hidden">
                {/* Fallback pattern or generic cover if needed, but using same styling as ref for structure */}
                <img
                  src="assets/yunah/yunah_12282025.jpg"
                  alt="Not Me Cover"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30" />
              </div>
            </div>

            {/* Shadow/Reflection */}
            <div className="absolute -bottom-12 left-4 right-4 h-8 bg-black/50 blur-xl rounded-[50%]" />
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
    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#5f6368] group-hover:text-[#60a5fa] group-hover:bg-[#60a5fa]/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-[#e8eaed] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
      {title}
    </h3>
    <p className="text-[#9aa0a6] text-sm leading-relaxed font-light">{desc}</p>
  </div>
);
