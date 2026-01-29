import React, { useEffect, useState } from "react";
import { Milestone } from "../types";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

interface CountdownGridProps {
  milestones: Milestone[];
}

const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0 }; // Should likely calculate next occurrence for recurring

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return { days, hours };
};

const getNextOccurrence = (m: Milestone) => {
  const today = new Date();
  let target = new Date(m.event_date);

  // Adjust year for one-time events that are in the future?
  // If one-time and passed, it shouldn't be here (logic in parent).
  // If recurring:
  if (m.frequency === "annual") {
    target.setFullYear(today.getFullYear());
    if (target < today) {
      target.setFullYear(today.getFullYear() + 1);
    }
  } else if (m.frequency === "monthly") {
    target.setMonth(today.getMonth());
    target.setFullYear(today.getFullYear()); // Month changed, year might need update?
    // simple monthly logic: set to current month's day.
    // If passed, next month.
    if (target < today) {
      target.setMonth(today.getMonth() + 1);
    }
  }

  return target;
};

const CountdownCard: React.FC<{ milestone: Milestone }> = ({ milestone }) => {
  const targetDate = getNextOccurrence(milestone);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className={`p-6 rounded-xl bg-white border border-[#D1D5DB] hover:border-[#1B264F] hover:shadow-[0_8px_30px_rgba(27,38,79,0.1)] transition-all duration-300 relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B264F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="font-semibold text-lg text-[#1B264F]">
          {milestone.name}
        </h3>
        <CalendarIcon className="w-5 h-5 opacity-40 text-[#2C2E33]" />
      </div>

      <div className="flex items-baseline space-x-1 relative z-10">
        <span className="text-4xl font-bold bg-gradient-to-br from-[#F2F4F7] to-[#D1D5DB] bg-clip-text text-transparent drop-shadow-sm">
          {timeLeft.days}
        </span>
        <span className="text-sm text-[#8E9299] font-medium tracking-wide">
          DAYS
        </span>
        <span className="text-2xl font-bold ml-2 text-[#D1D5DB]/80">
          {timeLeft.hours}
        </span>
        <span className="text-xs text-[#8E9299] font-medium tracking-wide">
          HRS
        </span>
      </div>

      <div className="mt-4 flex items-center text-xs text-[#8E9299] relative z-10">
        <Clock className="w-3 h-3 mr-1" />
        <span>Next: {targetDate.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export const CountdownGrid: React.FC<CountdownGridProps> = ({ milestones }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-6">
      {milestones.length === 0 && (
        <div className="col-span-full text-[#8E9299] italic text-center py-10">
          No upcoming events.
        </div>
      )}
      {milestones.map((m) => (
        <CountdownCard key={m.id} milestone={m} />
      ))}
    </div>
  );
};
