import React, { useState, useMemo } from "react";
import { Task, DayOfWeek } from "./types";
import { ActiveTaskView } from "./components/ActiveTaskView";
import { RoutineEditor } from "./components/RoutineEditor";
import { useSchedule } from "./hooks/useSchedule";
import {
  Edit3,
  Clock,
  Calendar,
  ChevronDown,
  RotateCcw,
  Info,
} from "lucide-react";
import { IntroductionView } from "./components/IntroductionView";

const SkeletonTask = () => (
  <div className="animate-pulse flex flex-col gap-4 p-8 h-full justify-center items-center">
    <div className="h-8 bg-white/5 rounded-md w-3/4 mb-4"></div>
    <div className="h-32 bg-white/5 rounded-md w-full"></div>
    <div className="h-4 bg-white/5 rounded-md w-1/2 mt-4"></div>
  </div>
);

const SHORT_DAY_NAMES: Record<string, string> = {
  Monday: "M",
  Tuesday: "T",
  Wednesday: "W",
  Thursday: "Th",
  Friday: "F",
  Saturday: "Sa",
  Sunday: "Su",
};

export const NotCuteAnymore: React.FC = () => {
  const {
    currentDay,
    setCurrentDay,
    currentTime,
    currentDayTasks,
    isLoading,
    saveDayRoutine,
    copyRoutineToDays,
    DAYS,
  } = useSchedule();

  const [isEditing, setIsEditing] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  // Asset Loading
  const backgroundImages = useMemo(() => {
    const images = import.meta.glob(
      "../../../../assets/aes/*.{png,jpg,jpeg,svg}",
      {
        eager: true,
        query: "?url",
        import: "default",
      },
    );
    return Object.values(images) as string[];
  }, []);

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

  const currentBackgroundImage = useMemo(() => {
    if (backgroundImages.length === 0) return "";

    if (!activeTask) {
      // default idle image (first one)
      return backgroundImages[0];
    }

    // stable selection logic
    const seed = (activeTask.id || activeTask.title)
      .toString()
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const index = seed % backgroundImages.length;
    return backgroundImages[index];
  }, [activeTask, backgroundImages]);

  const handleSaveRoutine = (newTasks: Task[]) => {
    saveDayRoutine(newTasks);
    setIsEditing(false);
  };

  const handleCopyRoutine = (tasks: Task[], targetDays: DayOfWeek[]) => {
    copyRoutineToDays(tasks, targetDays);
    // editor closes itself via its own logic
    // but RoutineEditor calls onClose() internally after copy confirm.
    setIsEditing(false);
  };

  const isToday = useMemo(() => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return currentDay === today;
  }, [currentDay]);

  const showEditor = !isToday;

  return (
    <div className="h-full w-full flex flex-col bg-black relative overflow-hidden rounded-lg">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between px-6 py-4 border-b border-white/5 gap-4 lg:gap-0 bg-[#09090b]">
        {/* Left Side: Logo & Day Selector */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img
              src="assets/logo/notcuteanymore_logo.svg"
              style={{ filter: "invert(1)", width: "100px", opacity: 0.8 }}
              alt=""
            />
          </div>

          <div className="hidden lg:block h-4 w-[1px] bg-white/10" />

          {/* Minimal Day List Header */}
          <div className="flex items-center gap-1 overflow-hidden">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setCurrentDay(day)}
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1.5 rounded-md transition-all ${
                  currentDay === day
                    ? "text-[#E1306C] bg-[#E1306C]/10"
                    : "text-[#5f6368] hover:text-[#e8eaed] hover:bg-white/5"
                }`}
              >
                <span className="hidden sm:inline">{day.slice(0, 3)}</span>
                <span className="sm:hidden">
                  {SHORT_DAY_NAMES[day] || day.slice(0, 1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex justify-between lg:justify-end gap-2">
          {!isToday && (
            <div className="flex items-center gap-4 pl-0 lg:pl-8">
              <button
                onClick={() => {
                  const today = new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                  }) as DayOfWeek;
                  setCurrentDay(today);
                }}
                className="group flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5f6368] group-hover:text-[#e8eaed]">
                  Back to Today
                </span>
                <RotateCcw className="w-3.5 h-3.5 text-[#5f6368] group-hover:text-[#e8eaed]" />
              </button>
            </div>
          )}
          {isToday && (
            <div className="flex items-center gap-4 pl-0 lg:pl-8">
              <button
                disabled={isLoading}
                onClick={() => setIsEditing(true)}
                className={`group flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg transition-all ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Edit3 className="w-3.5 h-3.5 text-[#5f6368] group-hover:text-[#e8eaed]" />
              </button>
            </div>
          )}
          {!showIntro && (
            <button
              onClick={() => setShowIntro(true)}
              className="p-1.5 hover:bg-white/5 rounded-lg transition-colors group"
              title="System Info"
            >
              <Info className="w-4 h-4 text-[#5f6368] group-hover:text-[#e8eaed]" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main
        className={`flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-0 ${
          showIntro
            ? "overflow-hidden p-0"
            : "overflow-y-auto custom-scroll p-4"
        }`}
      >
        <div
          className={`col-span-1 lg:col-span-12 ${
            showIntro ? "h-full" : "h-auto lg:h-full"
          }`}
        >
          {showIntro ? (
            <IntroductionView onClose={() => setShowIntro(false)} />
          ) : showEditor ? (
            <RoutineEditor
              day={currentDay}
              tasks={currentDayTasks}
              onSave={handleSaveRoutine}
              onCopy={handleCopyRoutine}
              onClose={() => {}} // no-op when embedded
              isEmbedded={true}
            />
          ) : isLoading ? (
            <SkeletonTask />
          ) : (
            <ActiveTaskView
              task={activeTask}
              backgroundImage={currentBackgroundImage}
              onUpdateTask={(updatedTask) => {
                const updatedTasks = currentDayTasks.map((t) =>
                  t.id === updatedTask.id ? updatedTask : t,
                );
                saveDayRoutine(updatedTasks);
              }}
            />
          )}
        </div>
      </main>

      {isEditing && isToday && (
        <RoutineEditor
          day={currentDay}
          tasks={currentDayTasks}
          onSave={handleSaveRoutine}
          onCopy={handleCopyRoutine}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};
