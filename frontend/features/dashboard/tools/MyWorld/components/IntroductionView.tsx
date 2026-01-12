import React, { useState } from "react";
import {
  X,
  Zap,
  FolderOpen,
  PanelTop,
  Save,
  Activity,
  Layers,
  Database,
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
    <div className="h-full flex flex-col bg-[#09090b] text-[#e8eaed] overflow-y-auto custom-scroll lg:overflow-hidden relative animate-in fade-in duration-300 pointer-events-auto">
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
                      ? "text-[#3B82F6] border-b-2 border-[#3B82F6]"
                      : "text-[#5f6368] hover:text-[#e8eaed]"
                  }`}
                >
                  Introduction
                </button>
                <button
                  onClick={() => setActiveTab("patch_notes")}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors relative pb-4 -mb-4 ${
                    activeTab === "patch_notes"
                      ? "text-[#3B82F6] border-b-2 border-[#3B82F6]"
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
                      <span className="text-xs font-bold tracking-[0.2em] text-[#3B82F6]">
                        v1.0.0 --stable release
                      </span>
                    </div>
                    {/* Minimalist Title */}
                    <div className="flex items-center justify-center h-full">
                      <img
                        src="assets/logo/myworld_logo.svg"
                        style={{ filter: "invert(1)", width: "400px" }}
                        alt=""
                      />
                    </div>

                    <p className="text-lg md:text-xl text-[#9aa0a6] font-light leading-relaxed border-l-2 border-[#3B82F6] pl-4 py-2">
                      your personal digital garden. organize thoughts, drafts,
                      and documentation through a deep{" "}
                      <span className="text-white font-medium">
                        hierarchical structure
                      </span>{" "}
                      and a fluid, tabbed editor.
                    </p>
                  </div>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <Feature
                      icon={<FolderOpen className="w-5 h-5" />}
                      title="Hierarchical Folders"
                      desc="Organize notes into infinite nested structures for maximum clarity."
                    />
                    <Feature
                      icon={<PanelTop className="w-5 h-5" />}
                      title="Tabbed Interface"
                      desc="Work on multiple ideas simultaneously with an intuitive tab bar."
                    />
                    <Feature
                      icon={<Save className="w-5 h-5" />}
                      title="Real-time Auto-save"
                      desc="Never worry about losing a word; your progress is synced as you type."
                    />
                    <Feature
                      icon={<Activity className="w-5 h-5" />}
                      title="Optimistic UI"
                      desc="Instant feedback for folder creation, moves, and deletions."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Patch Notes Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] text-[#3B82F6]">
                        v1.0.0 --latest
                      </span>
                      <span className="text-xs text-[#5f6368]">2026-01-10</span>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[#e8eaed] font-medium">
                          <Layers className="w-4 h-4 text-[#3B82F6]" />
                          MyWorld Core
                        </div>
                        <p className="text-sm text-[#9aa0a6] leading-relaxed">
                          Initial release of the MyWorld core system, featuring
                          the NoteTree singleton state for efficient management
                          of complex folder structures.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[#e8eaed] font-medium">
                          <Zap className="w-4 h-4 text-[#3B82F6]" />
                          Optimistic Persistence
                        </div>
                        <p className="text-sm text-[#9aa0a6] leading-relaxed">
                          Implemented optimistic UI updates for filesystem
                          operations, ensuring immediate visual feedback while
                          confirming changes in the background.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[#e8eaed] font-medium">
                          <Database className="w-4 h-4 text-[#3B82F6]" />
                          Debounced Editor
                        </div>
                        <p className="text-sm text-[#9aa0a6] leading-relaxed">
                          Introduced a transient editing state with debounced
                          network syncing to prevent "fighting" between local
                          keystrokes and server confirmations.
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
                alt="MyWorld - Digital Garden"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement!.classList.add(
                    "bg-gradient-to-br",
                    "from-blue-500",
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
    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#5f6368] group-hover:text-[#3B82F6] group-hover:bg-[#3B82F6]/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-[#e8eaed] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
      {title}
    </h3>
    <p className="text-[#9aa0a6] text-sm leading-relaxed font-light">{desc}</p>
  </div>
);
