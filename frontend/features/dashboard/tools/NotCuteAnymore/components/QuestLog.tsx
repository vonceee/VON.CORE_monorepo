import React from "react";
import { Task } from "../types";
import { Circle, Calendar, Clock, ChevronRight, Activity } from "lucide-react";

interface QuestLogProps {
  tasks: Task[];
  currentTime: Date;
}

export const QuestLog: React.FC<QuestLogProps> = ({ tasks, currentTime }) => {
  const sortedTasks = [...tasks].sort((a, b) =>
    a.startTime.localeCompare(b.startTime)
  );

  const getTaskStatus = (task: Task) => {
    const nowInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startH, startM] = task.startTime.split(":").map(Number);
    const startInMinutes = startH * 60 + startM;
    const endInMinutes = startInMinutes + task.durationMinutes;

    if (nowInMinutes >= endInMinutes) return "COMPLETED";
    if (nowInMinutes >= startInMinutes && nowInMinutes < endInMinutes)
      return "ACTIVE";
    return "PENDING";
  };

  return (
    <div className="app-card h-full flex flex-col overflow-hidden border-[#3c4043]">
      <div className="border-b border-[#3c4043] bg-[#0e1113]/50 flex justify-between items-center mb-2">
        <h2 className="text-[#9aa0a6] text-[11px] uppercase font-bold tracking-widest flex items-center gap-2">
          Objective Queue
        </h2>
        <span className="text-[10px] font-mono text-[#5f6368] tabular-nums">
          {sortedTasks.length} UNITS
        </span>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scroll space-y-1">
        {sortedTasks.map((task) => {
          const status = getTaskStatus(task);
          const isActive = status === "ACTIVE";
          const isCompleted = status === "COMPLETED";

          return (
            <div
              key={task.id}
              className={`p-2 rounded-lg transition-all border ${
                isActive
                  ? "border-[#8ab4f8]/50 bg-[#8ab4f8]/10 shadow-2xl scale-[1.02]"
                  : isCompleted
                  ? "border-[#3c4043]/30 bg-[#0e1113]/20 opacity-40"
                  : "border-[#3c4043] bg-[#0e1113]/40"
              }`}
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-[10px] px-2 py-1 rounded-full uppercase ${
                    isActive
                      ? "bg-[#8ab4f8] text-[#202124]"
                      : "bg-[#3c4043] text-[#e8eaed]"
                  }`}
                >
                  {task.startTime}
                </span>
                <div className="flex items-center gap-2">
                  {isActive && (
                    <Activity className="w-3.5 h-3.5 text-[#81c995] animate-pulse" />
                  )}
                  <span
                    className={`text-[10px] font-black ${
                      isActive
                        ? "text-[#8ab4f8]"
                        : isCompleted
                        ? "text-[#5f6368]"
                        : "text-[#9aa0a6]"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
              <h3
                className={`font-black tracking-tight uppercase ${
                  isActive ? "text-[#e8eaed] text-lg" : "text-[#9aa0a6]"
                }`}
              >
                {task.title}
              </h3>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5 text-[10px]">
                  {task.durationMinutes}m
                </div>
                {isActive && (
                  <div className="flex items-center gap-1 text-[10px] text-[#81c995] font-black uppercase tracking-widest">
                    <ChevronRight className="w-3 h-3" /> Live
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {sortedTasks.length === 0 && (
          <div className="py-24 text-center">
            <Circle className="w-16 h-16 text-[#3c4043] mx-auto mb-6" />
            <p className="text-[#5f6368] uppercase text-[10px] tracking-[0.2em]">
              Queue Termination
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
