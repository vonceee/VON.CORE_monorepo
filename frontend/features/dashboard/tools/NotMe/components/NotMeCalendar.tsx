import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  Droplets,
  Gamepad2,
  Swords,
  Activity,
  Zap,
  MessageSquare,
} from "lucide-react";
import { TrackerConfig, HistoryState } from "../types";

interface NotMeCalendarProps {
  activeDate: string;
  setActiveDate: (date: string) => void;
  history: HistoryState;
  listItems: TrackerConfig[];
}

// Helper for YYYY-MM-DD
const getISODate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const NotMeCalendar: React.FC<NotMeCalendarProps> = ({
  activeDate,
  setActiveDate,
  history,
  listItems,
}) => {
  const [selectedHabitId, setSelectedHabitId] = useState<string>(
    listItems[0]?.id || "",
  );

  const [currentMonth, setCurrentMonth] = useState(new Date(activeDate));

  const selectedHabit = listItems.find((item) => item.id === selectedHabitId);

  // Month Navigation
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  // Generate Calendar Grid
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay(); // 0 = Sunday

  // Array of days to render
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty slots
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const renderDot = (dateStr: string, habit?: TrackerConfig) => {
    if (!habit) return null;
    const valueObj = history[dateStr]?.[habit.id];
    const amount = valueObj?.amount;

    if (habit.type === "counter") {
      const count = Number(amount) || 0;
      const goal = habit.goal || 1;

      if (count >= goal) {
        // Goal reached -> Bright Glow
        return (
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
        );
      } else if (count > 0) {
        // Progress -> Dim
        return <div className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />;
      }
      return null;
    }

    if (habit.type === "outcome") {
      const outcome = amount as "WIN" | "LOSS" | null;
      if (outcome === "WIN") {
        return (
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        );
      }
      if (outcome === "LOSS") {
        return (
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
        );
      }
    }

    return null;
  };

  return (
    <div className="flex flex-col h-full bg-[#09090b] border-l border-white/5 p-6 w-[320px] flex-shrink-0">
      <h2 className="text-xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        History
      </h2>

      {/* Habit Selector */}
      <div className="mb-6">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
          Visualizing
        </label>
        <select
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-white/20"
          value={selectedHabitId}
          onChange={(e) => setSelectedHabitId(e.target.value)}
        >
          {listItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
          {/* fallback if list is empty */}
          {listItems.length === 0 && <option>no habits tracking</option>}
        </select>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-sm font-semibold text-gray-200">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2 font-medium">
        <span>S</span>
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} />;
          }

          const dateStr = getISODate(date);
          const isActive = dateStr === activeDate;
          const isToday = dateStr === getISODate();

          return (
            <button
              key={dateStr}
              onClick={() => setActiveDate(dateStr)}
              className={`
                aspect-square rounded-md flex flex-col items-center justify-center gap-1 relative overflow-hidden transition-all
                ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }
                ${
                  isToday && !isActive
                    ? "border border-blue-500/30 text-blue-400"
                    : ""
                }
              `}
            >
              <span className="text-[10px] font-medium z-10 relative">
                {date.getDate()}
              </span>

              {/* Dot Indicator */}
              <div className="h-1.5 flex items-center justify-center">
                {renderDot(dateStr, selectedHabit)}
              </div>

              {/* Today Indicator Background */}
              {isToday && (
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Selected:</span>
          <span
            className={`${
              activeDate === getISODate()
                ? "text-blue-400 font-bold"
                : "text-gray-300"
            }`}
          >
            {activeDate === getISODate() ? "Today" : activeDate}
          </span>
        </div>

        {/* Day Notes Summary */}
        <div className="space-y-2">
          {listItems.map((item) => {
            const note = history[activeDate]?.[item.id]?.note;
            if (!note) return null;

            return (
              <div
                key={item.id}
                className="bg-white/5 rounded p-2 text-xs border border-white/5"
              >
                <div className="flex items-center gap-1.5 mb-1 text-gray-400">
                  <MessageSquare className="w-3 h-3" />
                  <span className="font-medium text-gray-300">
                    {item.label}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed break-words pl-4.5">
                  {note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
