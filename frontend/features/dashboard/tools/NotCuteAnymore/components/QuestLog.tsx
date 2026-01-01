import React from "react";
import { Task } from "../types";
import { Circle, ChevronRight, Activity } from "lucide-react";

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
    <div className="app-card h-full flex flex-col overflow-hidden border-white/20">
      <div className="flex justify-between items-center mb-2 px-2 pt-2">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto:wght@400;500&display=swap');
        
        body {
          font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        h1 {
          font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>

        <h1 className="text-[#e8eaed] font-bold tracking-widest flex items-center gap-2">
          ToDo Queue
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll px-2 pb-2">
        {sortedTasks.map((task) => {
          const status = getTaskStatus(task);
          const isActive = status === "ACTIVE";
          const isCompleted = status === "COMPLETED";

          return (
            <div
              key={task.id}
              className={`p-2 rounded-lg transition-all border ${
                isActive
                  ? "border-[#E1306C]/50 bg-[#E1306C]/10 shadow-lg"
                  : isCompleted
                  ? "border-white/10 bg-[#000000]/20 opacity-40"
                  : "border-white/20 bg-[#000000]/40"
              }`}
            >
              {/* Time and Status Row */}
              <div className="flex justify-between items-center">
                <span
                  className={`text-[10px] uppercase ${
                    isActive
                      ? "rounded-full px-2 py-1 bg-gradient-to-r from-[#f09433] to-[#bc1888] text-white font-bold"
                      : "text-[#e8eaed]"
                  }`}
                >
                  {task.startTime}
                </span>
                <div className="flex items-center gap-2">
                  {isActive && (
                    <Activity className="w-3.5 h-3.5 text-[#E1306C] animate-pulse" />
                  )}
                  <span
                    className={`text-[10px] font-black ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-[#f09433] to-[#bc1888]"
                        : isCompleted
                        ? "text-[#5f6368]"
                        : "text-[#9aa0a6]"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
              {/* Task Title */}
              <h3
                className={`font-medium leading-relaxed lowercase ${
                  isActive
                    ? "text-[#e8eaed] text-base sm:text-lg"
                    : "text-[#bdc1c6] text-sm sm:text-base"
                }`}
              >
                {task.title}
              </h3>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5 text-[10px]">
                  {task.durationMinutes}m
                </div>
                {isActive && (
                  <div className="flex items-center gap-1 text-[10px] text-[#E1306C] font-black uppercase tracking-widest">
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
