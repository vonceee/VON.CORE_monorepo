import React, { useState, useEffect, useMemo } from "react";
import {
  Task,
  TaskStatus,
  ScheduleMetrics,
  DayOfWeek,
  DailyRoutines,
} from "./types";
import { ActiveTaskView } from "./components/ActiveTaskView";
import { QuestLog } from "./components/QuestLog";
import { RoutineEditor } from "./components/RoutineEditor";
import { Shield, Edit3, Clock, Zap, Calendar, ChevronDown } from "lucide-react";

const DEFAULT_TASKS: Task[] = [
  {
    id: "1",
    title: "Calibration",
    description: "Systems check and focus initialization.",
    startTime: "08:00",
    durationMinutes: 30,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: ["Water", "No Screens"],
  },
  {
    id: "2",
    title: "Deep Work A",
    description: "High-leverage engineering or research.",
    startTime: "08:30",
    durationMinutes: 120,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: ["Phone locked"],
  },
  {
    id: "3",
    title: "Recovery",
    description: "Biological replenishment.",
    startTime: "10:30",
    durationMinutes: 15,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: ["Stretch"],
  },
];

const INITIAL_ROUTINES: DailyRoutines = {
  Monday: [...DEFAULT_TASKS],
  Tuesday: [...DEFAULT_TASKS],
  Wednesday: [...DEFAULT_TASKS],
  Thursday: [...DEFAULT_TASKS],
  Friday: [...DEFAULT_TASKS],
  Saturday: [...DEFAULT_TASKS],
  Sunday: [...DEFAULT_TASKS],
};

const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const NotCuteAnymore: React.FC = () => {
  const [routines, setRoutines] = useState<DailyRoutines>(() => {
    const saved = localStorage.getItem("life_router_routines");
    return saved ? JSON.parse(saved) : INITIAL_ROUTINES;
  });

  const [currentDay, setCurrentDay] = useState<DayOfWeek>(() => {
    const day = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    }) as DayOfWeek;
    return day;
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);

  // Sync routines to localStorage
  useEffect(() => {
    localStorage.setItem("life_router_routines", JSON.stringify(routines));
  }, [routines]);

  // Wall clock timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDayTasks = useMemo(
    () => routines[currentDay],
    [routines, currentDay]
  );

  // Determine the active task based on the current clock
  const activeTask = useMemo(() => {
    const nowHours = currentTime.getHours();
    const nowMins = currentTime.getMinutes();
    const nowInMinutes = nowHours * 60 + nowMins;

    return (
      currentDayTasks.find((task) => {
        const [startH, startM] = task.startTime.split(":").map(Number);
        const startInMinutes = startH * 60 + startM;
        const endInMinutes = startInMinutes + task.durationMinutes;
        return nowInMinutes >= startInMinutes && nowInMinutes < endInMinutes;
      }) || null
    );
  }, [currentDayTasks, currentTime]);

  // Calculate metrics based on time elapsed in the schedule
  const metrics = useMemo(() => {
    const nowHours = currentTime.getHours();
    const nowMins = currentTime.getMinutes();
    const nowInMinutes = nowHours * 60 + nowMins;

    const completed = currentDayTasks.filter((task) => {
      const [startH, startM] = task.startTime.split(":").map(Number);
      const endInMinutes = startH * 60 + startM + task.durationMinutes;
      return nowInMinutes >= endInMinutes;
    }).length;

    return {
      completionRate:
        currentDayTasks.length > 0
          ? (completed / currentDayTasks.length) * 100
          : 0,
      timeEfficiency: 100, // static for now as it's continuous
      currentStreak: 4,
    };
  }, [currentDayTasks, currentTime]);

  const handleSaveRoutine = (newTasks: Task[]) => {
    setRoutines((prev) => ({ ...prev, [currentDay]: newTasks }));
    setIsEditing(false);
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 lg:gap-6 bg-[#0e1113] relative overflow-hidden rounded-lg">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between app-card px-4 py-4 lg:px-6 shadow-xl border-[#3c4043] gap-4 lg:gap-0">
        <div className="flex items-center gap-6 lg:gap-8 justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <h1 className="text-lg lg:text-xl font-bold tracking-tight text-[#e8eaed]">
              Not Cute <span className="text-[#9aa0a6]">Anymore</span>
            </h1>
          </div>

          <div className="hidden lg:block h-8 w-[1px] bg-[#3c4043]" />

          <div className="relative group">
            <button className="flex items-center gap-2 bg-[#1e1f20] border border-[#3c4043] px-3 py-1.5 lg:px-4 rounded-lg hover:bg-[#3c4043] transition-colors">
              <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#8ab4f8]" />
              <span className="text-xs lg:text-sm font-bold uppercase tracking-wide text-[#e8eaed]">
                {currentDay}
              </span>
              <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#9aa0a6]" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#1e1f20] border border-[#3c4043] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-[#3c4043] transition-colors ${
                    currentDay === day
                      ? "text-[#8ab4f8] font-bold bg-[#8ab4f8]/5"
                      : "text-[#9aa0a6]"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#8ab4f8]" />
          <span className="tabular-nums text-[#8ab4f8]">
            Local Time: {currentTime.toLocaleTimeString([], { hour12: false })}
          </span>
        </div>

        <div className="flex justify-between lg:justify-end gap-6 lg:gap-12">
          <div className="flex items-center gap-4 border-l border-[#3c4043] pl-6 lg:pl-8">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-[#3c4043] hover:bg-[#5f6368] rounded-lg text-xs font-bold uppercase tracking-wider text-[#e8eaed] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-0 overflow-y-auto p-4">
        <div className="col-span-1 lg:col-span-8 h-auto lg:h-full">
          <ActiveTaskView task={activeTask} />
        </div>

        <div className="col-span-1 lg:col-span-4 h-auto lg:h-full">
          <QuestLog tasks={currentDayTasks} currentTime={currentTime} />
        </div>
      </main>

      {isEditing && (
        <RoutineEditor
          day={currentDay}
          tasks={currentDayTasks}
          onSave={handleSaveRoutine}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default NotCuteAnymore;
