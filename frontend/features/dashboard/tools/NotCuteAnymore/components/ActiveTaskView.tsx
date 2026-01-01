import React, { useState, useEffect } from "react";
import { Task } from "../types";
import { ListChecks, Play, Zap, Activity, Timer } from "lucide-react";

interface ActiveTaskViewProps {
  task: Task | null;
}

export const ActiveTaskView: React.FC<ActiveTaskViewProps> = ({ task }) => {
  const [percentDone, setPercentDone] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>("00:00");

  useEffect(() => {
    if (task) {
      const updateProgress = () => {
        const now = new Date();
        const nowInMinutes =
          now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
        const [startH, startM] = task.startTime.split(":").map(Number);
        const startInMinutes = startH * 60 + startM;
        const elapsed = nowInMinutes - startInMinutes;

        // Progress percentage for the bar
        const progress = Math.max(
          0,
          Math.min(100, (elapsed / task.durationMinutes) * 100)
        );
        setPercentDone(progress);

        // Time remaining for the countdown
        const remainingMinutes = Math.max(0, task.durationMinutes - elapsed);
        const totalSeconds = Math.floor(remainingMinutes * 60);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        setTimeLeft(
          `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`
        );
      };

      updateProgress();
      const interval = setInterval(updateProgress, 1000);
      return () => clearInterval(interval);
    }
  }, [task]);

  if (!task) {
    return (
      <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-[#3c4043] bg-[#1e1f20]/50 rounded-2xl p-12 text-center">
        <div className="bg-[#0e1113] p-8 rounded-full border border-[#3c4043] mb-8 shadow-2xl">
          <Zap className="w-16 h-16 text-[#5f6368]" />
        </div>
        <h2 className="text-2xl font-black text-[#e8eaed] uppercase tracking-tight">
          N★t Cute On Standby
        </h2>
        <p className="text-[#9aa0a6] mt-3 max-w-xs text-sm font-medium leading-relaxed">
          System core waiting for next instruction block. No execution cycles
          currently assigned.
        </p>
      </div>
    );
  }

  return (
    <div className="app-card h-full relative flex flex-col overflow-hidden shadow-2xl border-[#3c4043]">
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#3c4043]">
        <div
          className="h-full bg-[#8ab4f8] transition-all duration-1000 ease-linear shadow-[0_0_15px_rgba(138,180,248,0.6)]"
          style={{ width: `${percentDone}%` }}
        />
      </div>

      <div className="p-6 lg:p-12 flex flex-col h-full overflow-y-auto lg:overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 lg:mb-12 gap-6 lg:gap-0">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] lg:text-[11px] font-black text-[#8ab4f8] bg-[#8ab4f8]/10 px-4 py-1.5 rounded-full uppercase tracking-widest border border-[#8ab4f8]/20">
                Active Operation
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-[#81c995] font-bold uppercase tracking-widest">
                <Activity className="w-3.5 h-3.5 animate-pulse" /> Executing
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-[#e8eaed] tracking-tighter mt-4 lg:mt-6 leading-none uppercase">
              {task.title}
            </h1>
          </div>
          <div className="text-left lg:text-right w-full lg:w-auto">
            <div className="text-xl lg:text-2xl font-black text-[#8ab4f8] tracking-widest uppercase mb-1 flex items-center lg:justify-end gap-2">
              <Timer className="w-5 h-5" /> Time Remaining
            </div>
            <div className="text-6xl lg:text-7xl font-black text-[#e8eaed] tabular-nums tracking-tighter">
              {timeLeft}
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 mt-8 lg:mt-12">
          <section className="h-full overflow-y-auto pr-2 custom-scroll">
            <h3 className="text-[#9aa0a6] text-[10px] lg:text-[11px] uppercase font-bold mb-4 flex items-center gap-2 tracking-widest">
              <ListChecks className="w-4 h-4 text-[#8ab4f8]" /> Notes
            </h3>
            <p className="text-lg lg:text-xl text-[#e8eaed] leading-relaxed tracking-tight whitespace-pre-wrap">
              {task.notes}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
