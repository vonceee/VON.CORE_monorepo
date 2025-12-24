import React, { useState, useEffect } from "react";
import { ScheduleItem } from "../../../types";

const STORAGE_KEY = "vh_schedule";

const DEFAULT_SCHEDULE: ScheduleItem[] = [
  {
    id: "1",
    time: "09:00",
    activity: "System Sync",
    intention: "Aligning frequency",
    completed: false,
    type: "routine",
  },
  {
    id: "2",
    time: "11:00",
    activity: "Creative Sprints",
    intention: "Flow state activation",
    completed: false,
    type: "work",
  },
  {
    id: "3",
    time: "14:00",
    activity: "Core Maintenance",
    intention: "Sustaining momentum",
    completed: false,
    type: "wellness",
  },
];

const getSchedule = (): ScheduleItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
  } catch {
    return DEFAULT_SCHEDULE;
  }
};

const useSchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(getSchedule);

  useEffect(() => {
    const handleUpdate = () => setSchedule(getSchedule());
    window.addEventListener("luckygirl-update", handleUpdate);
    return () => window.removeEventListener("luckygirl-update", handleUpdate);
  }, []);

  const updateSchedule = (newSchedule: ScheduleItem[]) => {
    setSchedule(newSchedule);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSchedule));
    window.dispatchEvent(new Event("luckygirl-update"));
  };

  const addItem = (item: ScheduleItem) => {
    const next = [...schedule, item].sort((a, b) =>
      a.time.localeCompare(b.time)
    );
    updateSchedule(next);
  };

  const toggleItem = (id: string) => {
    const next = schedule.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    updateSchedule(next);
  };

  const deleteItem = (id: string) => {
    const next = schedule.filter((item) => item.id !== id);
    updateSchedule(next);
  };

  return { schedule, addItem, toggleItem, deleteItem };
};

export const LuckyGirl: React.FC = () => {
  const { schedule, addItem, toggleItem, deleteItem } = useSchedule();
  // Form state
  const [newTime, setNewTime] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [newIntention, setNewIntention] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime || !newActivity) return;
    addItem({
      id: crypto.randomUUID(),
      time: newTime,
      activity: newActivity,
      intention: newIntention,
      completed: false,
      type: "routine",
    });
    setNewTime("");
    setNewActivity("");
    setNewIntention("");
  };

  return (
    <div className="max-w-2xl w-full">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">
          LUCKY GIRL SYNDROME
        </h1>
        <div className="text-[#666] font-mono text-xs tracking-[0.2em] border-l-2 border-orange-500 pl-3">
          // ROUTINE_ARCHITECT
        </div>
      </div>

      <div className="space-y-2 border-l border-[#333333] ml-4 min-h-[200px]">
        {schedule.map((item) => (
          <div
            key={item.id}
            className="relative pl-8 py-4 group hover:bg-white/5 transition-colors -ml-4 pr-4 rounded-r"
          >
            <div
              className={`absolute left-[0px] top-6 w-2 h-2 rounded-full transition-all duration-300
                         ${
                           item.completed
                             ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                             : "bg-orange-500 shadow-[0_0_10px_rgba(255,95,31,0.5)]"
                         }`}
            ></div>

            <div className="flex justify-between items-start">
              <div
                className="flex-1 cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center space-x-3 mb-1">
                  <span
                    className={`text-sm font-mono ${
                      item.completed
                        ? "text-green-500 line-through"
                        : "text-orange-500"
                    }`}
                  >
                    {item.time}
                  </span>
                  {item.completed && (
                    <span className="text-[10px] text-green-500 font-bold tracking-widest">
                      [CLAIMED]
                    </span>
                  )}
                </div>

                <div
                  className={`text-lg font-semibold transition-all ${
                    item.completed
                      ? "text-[#444] line-through decoration-green-500/50"
                      : "text-white"
                  }`}
                >
                  {item.activity}
                </div>

                {item.intention && (
                  <div
                    className={`text-sm italic mt-1 font-serif ${
                      item.completed ? "text-[#333]" : "text-[#666]"
                    }`}
                  >
                    ↳ {item.intention}
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-[#444] hover:text-red-500 transition-opacity px-2"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Block Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-12 ml-4 pl-8 border-l border-dashed border-[#333] pt-6 group"
      >
        <div className="grid grid-cols-12 gap-4 text-sm mb-4">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="col-span-3 bg-[#252526] text-white p-3 border border-[#444] focus:border-orange-500 outline-none font-mono placeholder-[#555]"
            required
          />
          <input
            type="text"
            placeholder="Activity Name"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            className="col-span-9 bg-[#252526] text-white p-3 border border-[#444] focus:border-orange-500 outline-none placeholder-[#555]"
            required
          />
          <input
            type="text"
            placeholder="Set your intention..."
            value={newIntention}
            onChange={(e) => setNewIntention(e.target.value)}
            className="col-span-12 bg-[#252526] text-white p-3 border border-[#444] focus:border-orange-500 outline-none italic font-serif placeholder-[#555]"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-black font-bold uppercase text-xs tracking-widest px-6 py-3 hover:bg-orange-400 transition-colors w-full sm:w-auto"
        >
          + Manifest Block
        </button>
      </form>
    </div>
  );
};

export const LuckyGirlSidebar: React.FC = () => {
  const { schedule } = useSchedule();
  return (
    <>
      {schedule.map((s) => (
        <div
          key={s.id}
          className="p-1 px-6 text-xs text-[#858585] hover:text-white truncate"
        >
          [{s.time}] {s.activity}
        </div>
      ))}
    </>
  );
};
