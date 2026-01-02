import React from "react";
import { Task } from "../types";
import { Circle, Activity } from "lucide-react";

interface QuestLogProps {
  tasks: Task[];
  currentTime: Date;
}

export const QuestLog: React.FC<QuestLogProps> = ({ tasks, currentTime }) => {
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

  const sortedTasks = [...tasks].sort((a, b) => {
    const statusA = getTaskStatus(a);
    const statusB = getTaskStatus(b);

    // 1. Sort by Priority: ACTIVE (top) -> PENDING -> COMPLETED (bottom)
    const priority = { ACTIVE: 0, PENDING: 1, COMPLETED: 2 };
    if (priority[statusA] !== priority[statusB]) {
      return priority[statusA] - priority[statusB];
    }

    // 2. Sort by Time
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#09090b] border-l border-white/5">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h1 className="uppercase tracking-widest text-[#5f6368]">Queue</h1>
        <div className="text-[10px] text-[#5f6368]">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        {sortedTasks.map((task) => {
          const status = getTaskStatus(task);
          const isActive = status === "ACTIVE";
          const isCompleted = status === "COMPLETED";

          return (
            <div
              key={task.id}
              className={`group px-6 py-3 border-b border-white/5 last:border-0 transition-all duration-300 ${
                isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
              } ${isCompleted ? "opacity-30 blur-[0.5px]" : "opacity-100"}`}
            >
              <div className="flex items-start gap-4">
                {/* Time Column */}
                <div className="flex flex-col items-end w-12 pt-0.5">
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-[#E1306C]" : "text-[#5f6368]"
                    }`}
                  >
                    {task.startTime}
                  </span>
                  <span className="text-[10px] text-[#3c4043]">
                    {task.durationMinutes}m
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="relative pt-1.5 flex flex-col items-center">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ring-2 ring-black ${
                      isActive
                        ? "bg-[#E1306C] shadow-[0_0_8px_rgba(225,48,108,0.5)]"
                        : isCompleted
                        ? "bg-[#3c4043]"
                        : "bg-[#3c4043]"
                    }`}
                  />
                  {isActive && (
                    <div className="absolute top-1.5 w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-ping opacity-75" />
                  )}
                  {/* Vertical Line */}
                  <div className="w-[1px] h-full bg-white/5 absolute top-4 -translate-x-1/2 left-1/2 -z-10 group-last:hidden" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-2">
                  <h3
                    className={`text-sm font-medium leading-tight truncate transition-colors ${
                      isActive
                        ? "text-[#e8eaed]"
                        : "text-[#9aa0a6] group-hover:text-[#bdc1c6]"
                    }`}
                  >
                    {task.title}
                  </h3>
                  {isActive && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-medium text-[#E1306C] uppercase tracking-wider flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        In Progress
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {sortedTasks.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-[#3c4043] gap-2">
            <Circle className="w-12 h-12 stroke-[1px]" />
            <span className="text-xs tracking-wider">NO ACTIVE TASKS</span>
          </div>
        )}
      </div>
    </div>
  );
};
