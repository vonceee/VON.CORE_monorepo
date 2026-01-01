import React, { useState, useMemo } from "react";
import { Task, DayOfWeek } from "./types";
import { ActiveTaskView } from "./components/ActiveTaskView";
import { RoutineEditor } from "./components/RoutineEditor";
import { useSchedule } from "./hooks/useSchedule";
import { Edit3, Clock, Calendar, ChevronDown } from "lucide-react";

const NotCuteAnymore: React.FC = () => {
  const {
    currentDay,
    setCurrentDay,
    currentTime,
    currentDayTasks,
    saveDayRoutine,
    copyRoutineToDays,
    DAYS,
  } = useSchedule();

  const [isEditing, setIsEditing] = useState(false);

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

  const handleSaveRoutine = (newTasks: Task[]) => {
    saveDayRoutine(newTasks);
    setIsEditing(false);
  };

  const handleCopyRoutine = (tasks: Task[], targetDays: DayOfWeek[]) => {
    copyRoutineToDays(tasks, targetDays);
    // Editor closes itself via its own logic or we can ensure it here if needed,
    // but RoutineEditor calls onClose() internally after copy confirm.
    setIsEditing(false);
  };

  return (
    <div className="h-full w-full flex flex-col bg-black relative overflow-hidden rounded-lg">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between app-card px-2 lg:px-2 shadow-xl border-white/20 gap-2 lg:gap-0">
        <div className="flex items-center gap-2 lg:gap-2 justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <img
              src="assets/logo/notcuteanymore_logo.svg"
              style={{ filter: "invert(1)", width: "100px" }}
              alt=""
            />
          </div>

          <div className="hidden lg:block h-8 w-[1px] bg-white/20" />

          <div className="relative group">
            <button className="flex items-center gap-2 bg-[#121212] border border-white/20 px-3 py-1.5 lg:px-4 rounded-lg hover:border-[#E1306C] transition-colors group">
              <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#e8eaed] group-hover:text-[#E1306C] transition-colors" />
              <span className="text-xs lg:text-sm font-bold uppercase tracking-wide text-[#e8eaed] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#f09433] group-hover:to-[#bc1888]">
                {currentDay}
              </span>
              <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#9aa0a6]" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#121212] border border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-[#262626] transition-colors ${
                    currentDay === day
                      ? "text-[#E1306C] font-bold bg-[#E1306C]/10"
                      : "text-[#9aa0a6]"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between lg:justify-end gap-6 lg:gap-12">
          <div className="flex items-center gap-4 pl-6 lg:pl-8">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 hover:opacity-90 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-opacity shadow-lg"
            >
              <Edit3 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-0 overflow-y-auto p-4">
        <div className="col-span-1 lg:col-span-12 h-auto lg:h-full">
          <ActiveTaskView task={activeTask} />
        </div>
      </main>

      {isEditing && (
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

export default NotCuteAnymore;
