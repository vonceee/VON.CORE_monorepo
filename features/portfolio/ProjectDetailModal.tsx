import React, { useEffect } from "react";
import { DesktopProject } from "./projectData";
import {
  X,
  ExternalLink,
  Cpu,
  HardDrive,
  Monitor,
  CheckCircle2,
  Terminal,
  Layers,
  FolderGit2,
} from "lucide-react";

interface ProjectDetailModalProps {
  project: DesktopProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 custom-scroll text-white">
        {/* Modal Top Bar */}
        <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between bg-neutral-900/60 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-neutral-400 tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Header Section */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Banner / Screenshot Preview */}
          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden border border-white/10 bg-neutral-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-neutral-300">
                Independent Electron Binary
              </span>
              <span className="px-2 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-emerald-400">
                100% Offline Capable
              </span>
            </div>
          </div>

          {/* Architecture Grid */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
              <Cpu size={14} />
              <span>Desktop Technical Architecture</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                  <Monitor size={14} className="text-cyan-400" />
                  <span>Runtime & Windowing</span>
                </div>
                <div className="text-sm font-medium text-neutral-200">
                  {project.architecture.runtime}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                  <Layers size={14} className="text-cyan-400" />
                  <span>UI Framework & Design</span>
                </div>
                <div className="text-sm font-medium text-neutral-200">
                  {project.architecture.ui}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                  <HardDrive size={14} className="text-cyan-400" />
                  <span>Storage Engine</span>
                </div>
                <div className="text-sm font-medium text-neutral-200">
                  {project.architecture.storage}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
                  <Terminal size={14} className="text-cyan-400" />
                  <span>IPC Security Bridge</span>
                </div>
                <div className="text-sm font-medium text-neutral-200">
                  {project.architecture.ipc}
                </div>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Key Capabilities & Workflows
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {project.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Platform Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 mr-1">Stack:</span>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 mr-1">Platforms:</span>
              {project.platforms.map((plat) => (
                <span
                  key={plat}
                  className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-neutral-400"
                >
                  {plat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="h-16 border-t border-white/10 px-6 flex items-center justify-between bg-neutral-900/60 backdrop-blur-sm shrink-0">
          <span className="text-xs font-mono text-neutral-500">
            Engineered as a standalone desktop application repository.
          </span>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold text-xs tracking-wider hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                <FolderGit2 size={14} />
                <span>VIEW REPOSITORY</span>
                <ExternalLink size={12} />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono tracking-wider transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
