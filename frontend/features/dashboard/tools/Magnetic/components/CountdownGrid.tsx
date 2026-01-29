import React, { useEffect, useState } from "react";
import { Milestone } from "../types";
import { Clock, Calendar as CalendarIcon, Edit2 } from "lucide-react";
import { MilestoneModal } from "./MilestoneModal";
import { useMagnetic } from "../hooks/useMagnetic";

import { calculateTimeLeft, getNextOccurrence } from "../utils";

interface CountdownGridProps {
  milestones: Milestone[];
}

const CountdownCard: React.FC<{
  milestone: Milestone;
  onEdit: (m: Milestone) => void;
}> = ({ milestone, onEdit }) => {
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
        <button
          onClick={() => onEdit(milestone)}
          className="text-[#8E9299] hover:text-[#1B264F] transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <Edit2 className="w-4 h-4" />
        </button>
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
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(
    null,
  );
  const { updateMilestone, deleteMilestone } = useMagnetic();

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-6">
        {milestones.length === 0 && (
          <div className="col-span-full text-[#8E9299] italic text-center py-10">
            No upcoming events.
          </div>
        )}
        {milestones.map((m) => (
          <CountdownCard
            key={m.id}
            milestone={m}
            onEdit={setEditingMilestone}
          />
        ))}
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
    </>
  );
};
