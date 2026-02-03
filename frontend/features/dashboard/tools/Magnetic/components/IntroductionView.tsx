import React, { useState } from "react";
import {
  X,
  Zap,
  Shield,
  Clock,
  LayoutTemplate,
  GitCommit,
  Calendar,
  History,
  Repeat,
  Eye,
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
    <div className="h-full flex flex-col bg-[#1B264F] text-[#F2F4F7] overflow-y-auto custom-scroll lg:overflow-hidden relative animate-in fade-in duration-300 z-50 fixed inset-0">
      {/* Close Button - positioned absolutely to overlay content if needed */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 group"
        title="Close Info"
      >
        <X className="w-5 h-5 text-[#8E9299] group-hover:text-white transition-colors" />
      </button>

      <div className="min-h-full lg:h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Content */}
        <div className="relative h-full lg:overflow-hidden bg-[#0F172A]">
          <div className="p-4 md:p-6 lg:p-0 absolute inset-0 overflow-y-auto custom-scroll flex flex-col pt-12">
            <div className="lg:p-8 lg:pt-8 max-w-2xl mx-auto w-full space-y-8 pb-12">
              {/* Tab Navigation */}
              <div className="sticky top-0 z-20 bg-[#0F172A] pt-2 flex items-center gap-6 border-b border-white/5 pb-4 mb-4">
                <button
                  onClick={() => setActiveTab("intro")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "intro"
                      ? "text-[#60A5FA] border-b-2 border-[#60A5FA]"
                      : "text-[#8E9299] hover:text-white"
                  }`}
                >
                  Introduction
                </button>
                <button
                  onClick={() => setActiveTab("patch_notes")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "patch_notes"
                      ? "text-[#60A5FA] border-b-2 border-[#60A5FA]"
                      : "text-[#8E9299] hover:text-white"
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
                      <span className="text-xs font-bold tracking-[0.2em] text-[#60A5FA]">
                        v1.0.0 --stable release
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-thin tracking-tight text-white mb-4">
                      Magnetic
                    </h1>

                    <p className="text-lg md:text-xl text-[#94A3B8] font-light leading-relaxed border-l-2 border-[#60A5FA] pl-4 py-2">
                      Visualize your life's milestones. Track{" "}
                      <span className="text-white font-medium">
                        upcoming events
                      </span>{" "}
                      and reflect on your{" "}
                      <span className="text-white font-medium">origins</span>{" "}
                      through a unified, fluid timeline interface.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <Feature
                      icon={<Clock className="w-5 h-5" />}
                      title="Countdown Grid"
                      desc="Track time remaining for upcoming milestones with precision."
                    />
                    <Feature
                      icon={<History className="w-5 h-5" />}
                      title="Origin Timeline"
                      desc="Review past events and origins in a chronological stream."
                    />
                    <Feature
                      icon={<Repeat className="w-5 h-5" />}
                      title="Recurring Events"
                      desc="Support for one-time, annual, and monthly occurrences."
                    />
                    <Feature
                      icon={<Eye className="w-5 h-5" />}
                      title="Dual Views"
                      desc="Switch seamlessly between Grid and Timeline visualization modes."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Patch Notes Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#60A5FA]">
                        v1.0.0 --latest
                      </span>
                      <span className="text-xs text-[#8E9299]">2026-02-03</span>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-white font-medium">
                          <Zap className="w-4 h-4 text-[#60A5FA]" />
                          Initial Release
                        </div>
                        <p className="text-sm text-[#94A3B8] leading-relaxed">
                          First version of Magnetic. Introducing the dual-view
                          system for tracking milestones and history.
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
        <div className="relative p-8 md:p-12 lg:pl-6 bg-[#000] flex items-center justify-center min-h-[300px] lg:h-full overflow-hidden">
          {/* Abstract Visual */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B264F] to-[#000] opacity-50" />
          <div className="relative z-10 text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-full bg-[#1B264F] flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(27,38,79,0.5)]">
              <Clock className="w-12 h-12 text-[#60A5FA]" />
            </div>
            <h2 className="text-2xl font-light text-white tracking-widest uppercase">
              Time is Magnetic
            </h2>
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
    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#94A3B8] group-hover:text-[#60A5FA] group-hover:bg-[#60A5FA]/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-white tracking-tight group-hover:translate-x-1 transition-transform duration-300">
      {title}
    </h3>
    <p className="text-[#94A3B8] text-sm leading-relaxed font-light">{desc}</p>
  </div>
);
