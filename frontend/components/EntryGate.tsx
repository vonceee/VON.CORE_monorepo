import React from "react";
import { Persona } from "../types";

interface EntryGateProps {
  onSelect: (persona: Persona) => void;
}

const EntryGate: React.FC<EntryGateProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-black text-white font-mono">
      {/* Option A: Developer (Brutalist) */}
      <div
        className="flex-1 relative group cursor-pointer border-b md:border-b-0 md:border-r border-white/20 hover:bg-neutral-900 transition-all duration-500 overflow-hidden"
        onClick={() => onSelect("developer")}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-300">
            Developer
          </h2>
          <p className="text-sm md:text-base text-gray-400 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            [ Raw . Experimental . Brutalist ]
          </p>
          <div className="mt-8 px-6 py-2 border border-white/50 group-hover:bg-white group-hover:text-black transition-colors duration-300">
            ENTER_SYSTEM_V1
          </div>
        </div>
      </div>

      {/* Option B: HR / Recruiter (Clean) */}
      <div
        className="flex-1 relative group cursor-pointer bg-slate-900 hover:bg-slate-800 transition-all duration-500 overflow-hidden font-sans"
        onClick={() => onSelect("hr")}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
          <h2 className="text-4xl md:text-6xl font-light tracking-wide mb-4 text-slate-200 group-hover:text-white transition-colors duration-300">
            Recruiter
          </h2>
          <p className="text-sm md:text-base text-slate-400 tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
            Clean . Readable . Professional
          </p>
          <div className="mt-8 px-8 py-3 bg-slate-700 rounded-full text-slate-200 group-hover:bg-white group-hover:text-slate-900 transition-all duration-300 shadow-lg">
            View Portfolio
          </div>
        </div>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full pointer-events-none z-20 mix-blend-difference">
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">
          Select Your Experience
        </span>
      </div>
    </div>
  );
};

export default EntryGate;
