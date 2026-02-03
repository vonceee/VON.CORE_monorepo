import React, { useState } from "react";
import { X, Zap, Music, Image, FileText, Layout, Star } from "lucide-react";

interface IntroductionViewProps {
  onClose: () => void;
}

type Tab = "intro" | "patch_notes";

export const IntroductionView: React.FC<IntroductionViewProps> = ({
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("intro");

  // Sunday Morning Theme Colors
  const accentColor = "#FF5D01"; // Generic orange accent for Sunday Morning vibe

  return (
    <div className="h-full flex flex-col bg-[#FDFBF7] text-[#1A1A1A] overflow-y-auto custom-scroll lg:overflow-hidden relative animate-in fade-in duration-300 z-50 fixed inset-0">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-50 group"
        title="Close Info"
      >
        <X className="w-5 h-5 text-[#5f6368] group-hover:text-black transition-colors" />
      </button>

      <div className="min-h-full lg:h-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Content */}
        <div className="relative h-full lg:overflow-hidden bg-[#FFF]">
          <div className="p-4 md:p-6 lg:p-0 absolute inset-0 overflow-y-auto custom-scroll flex flex-col pt-12">
            <div className="lg:p-8 lg:pt-8 max-w-2xl mx-auto w-full space-y-8 pb-12">
              {/* Tab Navigation */}
              <div className="sticky top-0 z-20 bg-[#FFF] pt-2 flex items-center gap-6 border-b border-black/5 pb-4 mb-4">
                <button
                  onClick={() => setActiveTab("intro")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "intro"
                      ? "text-[#FF5D01] border-b-2 border-[#FF5D01]"
                      : "text-[#5f6368] hover:text-black"
                  }`}
                >
                  Introduction
                </button>
                <button
                  onClick={() => setActiveTab("patch_notes")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "patch_notes"
                      ? "text-[#FF5D01] border-b-2 border-[#FF5D01]"
                      : "text-[#5f6368] hover:text-black"
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
                      <span className="text-xs font-bold tracking-[0.2em] text-[#FF5D01]">
                        v1.0.0 --fan exp
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-black mb-4">
                      Sunday Morning
                    </h1>

                    <p className="text-lg md:text-xl text-[#4A4A4A] font-light leading-relaxed border-l-2 border-[#FF5D01] pl-4 py-2">
                      Immerse yourself in the{" "}
                      <span className="font-medium text-black">
                        Sunday Morning
                      </span>{" "}
                      aesthetic. Explore tracks, lyrics, and visuals in a
                      curated, fan-centric interface.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <Feature
                      icon={<Music className="w-5 h-5" />}
                      title="Track Intel"
                      desc="Deep dive into track details, production credits, and story."
                    />
                    <Feature
                      icon={<Image className="w-5 h-5" />}
                      title="Visual Gallery"
                      desc="A responsive masonry gallery of concept art and photos."
                    />
                    <Feature
                      icon={<FileText className="w-5 h-5" />}
                      title="Lyrics View"
                      desc="Read along with synchronized lyric presentations."
                    />
                    <Feature
                      icon={<Layout className="w-5 h-5" />}
                      title="Adaptive Theme"
                      desc="Switch between Light and Dark modes with smooth transitions."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Patch Notes Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#FF5D01]">
                        v1.0.0 --latest
                      </span>
                      <span className="text-xs text-[#5f6368]">2026-02-03</span>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-black/5 border border-black/5 space-y-2">
                        <div className="flex items-center gap-2 text-black font-medium">
                          <Zap className="w-4 h-4 text-[#FF5D01]" />
                          Experience Launch
                        </div>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">
                          Initial launch of the Sunday Morning fan experience
                          tool.
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
        <div className="relative p-8 md:p-12 lg:pl-6 bg-[#F5F5F0] flex items-center justify-center min-h-[300px] lg:h-full overflow-hidden">
          {/* Simple Visual Placeholder */}
          <div className="bg-white p-6 shadow-xl rotate-3 border border-black/5">
            <div className="w-64 h-64 bg-[#FF5D01]/10 flex items-center justify-center">
              <Star className="w-16 h-16 text-[#FF5D01]" />
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
    <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center text-[#5f6368] group-hover:text-[#FF5D01] group-hover:bg-[#FF5D01]/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-black tracking-tight group-hover:translate-x-1 transition-transform duration-300">
      {title}
    </h3>
    <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">{desc}</p>
  </div>
);
