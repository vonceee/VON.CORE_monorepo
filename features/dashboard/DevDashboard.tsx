import React, { useState, useEffect } from "react";
import { ToolId, Task, ScheduleItem } from "../../types";

interface DevDashboardProps {
  onExit: () => void;
}

const DevDashboard: React.FC<DevDashboardProps> = ({ onExit }) => {
  const [activeTool, setActiveTool] = useState<ToolId>("MAGNETIC");
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Refactor intersection observer logic", completed: false },
    { id: "2", text: "Update metadata for SEO", completed: true },
    { id: "3", text: "Design terminal icons", completed: false },
  ]);
  const [schedule] = useState<ScheduleItem[]>([
    { id: "1", time: "09:00", activity: "System Sync" },
    { id: "2", time: "11:00", activity: "Creative Sprints" },
    { id: "3", time: "14:00", activity: "Core Maintenance" },
  ]);
  const [timer, setTimer] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#1e1e1e] text-[#cccccc] flex flex-col font-sans select-none overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 space-y-4">
          <button
            title="Magnetic (ToDo)"
            onClick={() => setActiveTool("MAGNETIC")}
            className={`p-2 transition-colors ${
              activeTool === "MAGNETIC"
                ? "text-white border-l-2 border-orange-500"
                : "text-[#858585] hover:text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </button>
          <button
            title="Lucky Girl Syndrome (Schedule)"
            onClick={() => setActiveTool("LUCKY_GIRL_SYNDROME")}
            className={`p-2 transition-colors ${
              activeTool === "LUCKY_GIRL_SYNDROME"
                ? "text-white border-l-2 border-orange-500"
                : "text-[#858585] hover:text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
          <button
            title="Midnight Fiction (Timer)"
            onClick={() => setActiveTool("MIDNIGHT_FICTION")}
            className={`p-2 transition-colors ${
              activeTool === "MIDNIGHT_FICTION"
                ? "text-white border-l-2 border-orange-500"
                : "text-[#858585] hover:text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <div className="flex-1"></div>
          <button
            onClick={onExit}
            className="p-2 text-[#858585] hover:text-white"
            title="Exit Dev Mode"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-[#252526] border-r border-black/20 flex flex-col">
          <div className="p-3 text-[11px] font-bold text-[#bbbbbb] tracking-wider uppercase">
            Explorer
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            <div className="p-1 px-2 text-xs hover:bg-[#37373d] rounded cursor-pointer flex items-center group">
              <span className="text-orange-500 mr-2">▼</span>
              <span className="font-semibold">
                {activeTool.replace(/_/g, " ")}
              </span>
            </div>
            {activeTool === "MAGNETIC" &&
              tasks.map((t) => (
                <div
                  key={t.id}
                  className="p-1 px-6 text-xs text-[#858585] hover:text-white truncate"
                >
                  {t.completed ? "✓ " : "○ "} {t.text}
                </div>
              ))}
            {activeTool === "LUCKY_GIRL_SYNDROME" &&
              schedule.map((s) => (
                <div
                  key={s.id}
                  className="p-1 px-6 text-xs text-[#858585] hover:text-white truncate"
                >
                  [{s.time}] {s.activity}
                </div>
              ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          <div className="h-9 bg-[#2d2d2d] flex items-center px-4 space-x-2 border-b border-black/20">
            <div className="flex items-center space-x-2 bg-[#1e1e1e] h-full px-4 border-t border-orange-500 text-xs">
              <span className="text-orange-500">◈</span>
              <span>{activeTool.replace(/_/g, " ")}.ts</span>
            </div>
          </div>
          <div className="flex-1 p-10 flex flex-col">
            {activeTool === "MAGNETIC" && (
              <div className="max-w-xl">
                <h1 className="text-3xl font-bold mb-8 text-white">
                  Magnetic / Task Management
                </h1>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center p-3 bg-[#252526] hover:bg-[#2a2d2e] rounded border border-white/5 group cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center transition-colors ${
                          task.completed
                            ? "bg-orange-500 border-orange-500"
                            : "border-[#444444]"
                        }`}
                      >
                        {task.completed && (
                          <span className="text-black font-bold">✓</span>
                        )}
                      </div>
                      <span
                        className={`${
                          task.completed
                            ? "line-through text-neutral-600"
                            : "text-[#cccccc]"
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTool === "LUCKY_GIRL_SYNDROME" && (
              <div className="max-w-xl">
                <h1 className="text-3xl font-bold mb-8 text-white">
                  Lucky Girl Syndrome / Schedule
                </h1>
                <div className="space-y-2 border-l border-[#333333] ml-4">
                  {schedule.map((item) => (
                    <div key={item.id} className="relative pl-8 py-4 group">
                      <div className="absolute left-[-5px] top-6 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(255,95,31,0.5)]"></div>
                      <div className="text-sm font-mono text-orange-500 mb-1">
                        {item.time}
                      </div>
                      <div className="text-lg text-white font-semibold">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTool === "MIDNIGHT_FICTION" && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-bold mb-4 text-[#858585] uppercase tracking-[0.2em]">
                  Midnight Fiction / Focus
                </h1>
                <div className="text-[120px] font-mono text-white leading-none mb-12 tabular-nums">
                  {formatTime(timer)}
                </div>
                <div className="flex space-x-6">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="px-8 py-3 bg-orange-500 text-black font-bold rounded hover:bg-orange-400 transition-colors uppercase tracking-widest text-xs"
                  >
                    {isTimerRunning ? "Pause" : "Start Focus"}
                  </button>
                  <button
                    onClick={() => {
                      setTimer(25 * 60);
                      setIsTimerRunning(false);
                    }}
                    className="px-8 py-3 border border-[#444444] text-white font-bold rounded hover:bg-[#333333] transition-colors uppercase tracking-widest text-xs"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-orange-600 text-black text-[11px] flex items-center px-4 justify-between font-medium">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-1">⎇</span> dev-branch
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="uppercase tracking-tighter">
            VON.CORE CORE-ENGINE-1.0
          </div>
          <div>UTF-8</div>
          <div className="font-bold">MODE: DEV</div>
        </div>
      </div>
    </div>
  );
};

export default DevDashboard;
