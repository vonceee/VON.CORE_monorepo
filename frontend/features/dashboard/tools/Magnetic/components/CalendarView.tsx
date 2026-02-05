import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  getDate,
  getMonth,
  getYear,
} from "date-fns";
import { ChevronLeft, ChevronRight, Edit2 } from "lucide-react";
import { Milestone } from "../types";
import { useMagnetic } from "../hooks/useMagnetic";
import { MilestoneModal } from "./MilestoneModal";

interface CalendarViewProps {
  milestones: Milestone[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ milestones }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(
    null,
  );
  const { updateMilestone, deleteMilestone } = useMagnetic();

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getMilestonesForDate = (date: Date) => {
    return milestones.filter((m) => {
      const mDate = new Date(m.event_date);

      if (m.frequency === "one-time") {
        return isSameDay(date, mDate);
      }

      if (m.frequency === "annual") {
        return (
          getDate(date) === getDate(mDate) && getMonth(date) === getMonth(mDate)
        );
      }

      if (m.frequency === "monthly") {
        return getDate(date) === getDate(mDate);
      }

      return false;
    });
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-[#D1D5DB] shadow-sm overflow-hidden text-[#2C2E33] mt-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#D1D5DB] bg-[#F9FAFB]">
        <h2 className="text-lg font-semibold text-[#1B264F]">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-medium text-[#1B264F] hover:bg-[#1B264F]/5 rounded-md transition-colors mr-2 cursor-pointer"
          >
            Today
          </button>
          <button
            onClick={prevMonth}
            className="p-1.5 text-[#8E9299] hover:text-[#1B264F] hover:bg-[#1B264F]/5 rounded-full transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 text-[#8E9299] hover:text-[#1B264F] hover:bg-[#1B264F]/5 rounded-full transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid Header (Days) */}
      <div className="grid grid-cols-7 border-b border-[#D1D5DB] bg-[#F9FAFB]">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-semibold text-[#8E9299] uppercase tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr bg-[#D1D5DB] gap-px overflow-y-auto">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const dayMilestones = getMilestonesForDate(day);
          const isDayToday = isToday(day);

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[100px] bg-white p-2 flex flex-col gap-1 transition-colors ${
                !isCurrentMonth ? "bg-gray-50/50" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                    isDayToday
                      ? "bg-[#1B264F] text-white"
                      : isCurrentMonth
                        ? "text-[#2C2E33]"
                        : "text-[#8E9299]"
                  }`}
                >
                  {format(day, "d")}
                </span>
                {dayMilestones.length > 0 && (
                  <span className="text-[10px] text-[#8E9299] font-medium">
                    {dayMilestones.length}
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-1 mt-1 overflow-visible">
                {dayMilestones.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setEditingMilestone(m)}
                    className="group relative text-left px-2 py-1 rounded-md text-xs font-medium bg-[#1B264F]/5 text-[#1B264F] border border-[#1B264F]/10 hover:bg-[#1B264F]/10 hover:border-[#1B264F]/30 transition-all truncate cursor-pointer w-full"
                  >
                    {m.name}

                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#2C2E33] text-white text-[11px] p-2 rounded shadow-lg pointer-events-none z-50 transition-opacity whitespace-normal text-left">
                      <div className="font-semibold mb-0.5">{m.name}</div>
                      <div className="text-gray-300 capitalize">
                        {m.category} • {m.frequency}
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2C2E33]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {editingMilestone && (
        <MilestoneModal
          isOpen={!!editingMilestone}
          onClose={() => setEditingMilestone(null)}
          milestone={editingMilestone}
          onSave={updateMilestone}
          onDelete={deleteMilestone}
        />
      )}
    </div>
  );
};
