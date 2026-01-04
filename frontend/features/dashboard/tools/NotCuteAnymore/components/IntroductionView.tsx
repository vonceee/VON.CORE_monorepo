import React, { useState } from "react";
import {
  X,
  Zap,
  Shield,
  Clock,
  MousePointerClick,
  LayoutTemplate,
  GitCommit,
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
    <div className="h-full flex flex-col bg-[#09090b] text-[#e8eaed] overflow-y-auto custom-scroll lg:overflow-hidden relative animate-in fade-in duration-300">
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
                      ? "text-[#E1306C] border-b-2 border-[#E1306C]"
                      : "text-[#5f6368] hover:text-[#e8eaed]"
                  }`}
                >
                  Introduction
                </button>
                <button
                  onClick={() => setActiveTab("patch_notes")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "patch_notes"
                      ? "text-[#E1306C] border-b-2 border-[#E1306C]"
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
                      <span className="text-xs font-bold tracking-[0.2em] text-[#E1306C]">
                        v1.1.0 --stable release
                      </span>
                    </div>
                    <div className="flex items-center justify-center h-full">
                      <img
                        src="assets/logo/notcuteanymore_logo.svg"
                        style={{ filter: "invert(1)", width: "400px" }}
                        alt=""
                      />
                    </div>

                    <p className="text-lg md:text-xl text-[#9aa0a6] font-light leading-relaxed border-l-2 border-[#E1306C] pl-4 py-2">
                      plan and visualize your day through a structured,{" "}
                      <span className="text-white font-medium">
                        time-based interface
                      </span>
                      . create a chronological timeline of activities, with each
                      segment representing a specific task or routine scheduled
                      throughout the day.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <Feature
                      icon={<Clock className="w-5 h-5" />}
                      title="Routine Cloning"
                      desc="copy routines to other days while keeping each day customizable."
                    />
                    <Feature
                      icon={<MousePointerClick className="w-5 h-5" />}
                      title="Quick Notes"
                      desc="quickly add or update notes for any task."
                    />
                    <Feature
                      icon={<LayoutTemplate className="w-5 h-5" />}
                      title="Active Task View"
                      desc="shows the current task, remaining time, and notes at a glance."
                    />
                    <Feature
                      icon={<Shield className="w-5 h-5" />}
                      title="Focus Isolation"
                      desc="clean, distraction-free design focused on clarity."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Patch Notes Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#E1306C]">
                        v1.1.0 --latest
                      </span>
                      <span className="text-xs text-[#5f6368]">2026-01-04</span>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[#e8eaed] font-medium">
                          <Zap className="w-4 h-4 text-[#E1306C]" />
                          Skeleton Loading
                        </div>
                        <p className="text-sm text-[#9aa0a6] leading-relaxed">
                          Added a skeleton loading state to the main view and
                          queue sidebar for smoother visual transitions during
                          data fetching.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[#e8eaed] font-medium">
                          <GitCommit className="w-4 h-4 text-[#E1306C]" />
                          Onboarding Experience
                        </div>
                        <p className="text-sm text-[#9aa0a6] leading-relaxed">
                          Updated default tasks to serve as an interactive
                          onboarding guide. New installations (or empty
                          databases) now properly fallback to this guide.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[#e8eaed] font-medium">
                          <Shield className="w-4 h-4 text-[#E1306C]" />
                          Stability Improvements
                        </div>
                        <p className="text-sm text-[#9aa0a6] leading-relaxed">
                          Fixed issues where empty backend data could cause a
                          blank screen, and restored missing internal state
                          variables to prevent crashes.
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
              <img
                src="assets/yunah/yunah_12282025(2).jpg"
                alt="Not Cute Anymore - Super Real Me Cover"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.classList.add(
                    "bg-gradient-to-br",
                    "from-pink-500",
                    "to-purple-900"
                  );
                }}
              />
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
    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#5f6368] group-hover:text-[#E1306C] group-hover:bg-[#E1306C]/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-[#e8eaed] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
      {title}
    </h3>
    <p className="text-[#9aa0a6] text-sm leading-relaxed font-light">{desc}</p>
  </div>
);
