import React, { useState, useEffect } from "react";
import { ScheduleItem } from "../../../types";

const STORAGE_KEY = "vh_schedule";

type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
const DAYS: DayOfWeek[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type WeeklySchedule = Record<DayOfWeek, ScheduleItem[]>;

const DEFAULT_SCHEDULE: WeeklySchedule = {
  MON: [],
  TUE: [],
  WED: [],
  THU: [],
  FRI: [],
  SAT: [],
  SUN: [],
};

/* -------------------------------------------------------------------------- */
/*                                    UTILS                                   */
/* -------------------------------------------------------------------------- */

const getCurrentDay = (): DayOfWeek => {
  const dayIndex = new Date().getDay();
  const map: Record<number, DayOfWeek> = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
  };
  return map[dayIndex];
};

const getSchedule = (): WeeklySchedule => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_SCHEDULE;

    const parsed = JSON.parse(saved);

    // Migration support for old array format
    if (Array.isArray(parsed)) {
      const currentDay = getCurrentDay();
      return {
        ...DEFAULT_SCHEDULE,
        [currentDay]: parsed,
      };
    }

    return { ...DEFAULT_SCHEDULE, ...parsed };
  } catch {
    return DEFAULT_SCHEDULE;
  }
};

/* -------------------------------------------------------------------------- */
/*                                    HOOK                                    */
/* -------------------------------------------------------------------------- */

const useSchedule = () => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(getCurrentDay());
  const [schedule, setSchedule] = useState<WeeklySchedule>(getSchedule);

  useEffect(() => {
    const handleUpdate = () => setSchedule(getSchedule());
    window.addEventListener("luckygirl-update", handleUpdate);
    return () => window.removeEventListener("luckygirl-update", handleUpdate);
  }, []);

  const updateSchedule = (newSchedule: WeeklySchedule) => {
    setSchedule(newSchedule);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSchedule));
    window.dispatchEvent(new Event("luckygirl-update"));
  };

  const currentItems = schedule[selectedDay] || [];

  const addItem = (item: ScheduleItem) => {
    const updatedList = [...currentItems, item].sort((a, b) =>
      a.time.localeCompare(b.time)
    );
    updateSchedule({
      ...schedule,
      [selectedDay]: updatedList,
    });
  };

  const toggleItem = (id: string) => {
    const updatedList = currentItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    updateSchedule({
      ...schedule,
      [selectedDay]: updatedList,
    });
  };

  const deleteItem = (id: string) => {
    const updatedList = currentItems.filter((item) => item.id !== id);
    updateSchedule({
      ...schedule,
      [selectedDay]: updatedList,
    });
  };

  return {
    selectedDay,
    setSelectedDay,
    schedule,
    currentItems,
    addItem,
    toggleItem,
    deleteItem,
  };
};

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

const StarIcon = ({
  filled,
  className,
}: {
  filled?: boolean;
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ProgressBar: React.FC<{ total: number; claimed: number }> = ({
  total,
  claimed,
}) => {
  const percentage = total === 0 ? 0 : Math.round((claimed / total) * 100);

  return (
    <div className="mb-8 font-mono">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs tracking-[0.2em] text-pink-400 font-bold animate-pulse">
          REALITY LOADING...
        </span>
        <span className="text-xs text-white/50">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-[#111] rounded-full overflow-hidden border border-white/5 relative">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-white/10 w-full animate-[shimmer_2s_infinite] -translate-x-full" />
      </div>
    </div>
  );
};

const DayNavigator: React.FC<{
  selectedDay: DayOfWeek;
  onSelect: (day: DayOfWeek) => void;
}> = ({ selectedDay, onSelect }) => {
  return (
    <div className="relative mb-8 p-1 bg-black/40 border-y-2 border-[#333] overflow-hidden">
      {/* Tape Holes Top/Bottom */}
      <div className="absolute top-0 left-0 right-0 h-1 flex justify-between px-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`t-${i}`} className="w-1 h-1 bg-[#222] rounded-full" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-between px-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`b-${i}`} className="w-1 h-1 bg-[#222] rounded-full" />
        ))}
      </div>

      <div className="flex justify-between items-center py-2 px-1 overflow-x-auto no-scrollbar relative z-10">
        {DAYS.map((day) => {
          const isActive = day === selectedDay;
          return (
            <button
              key={day}
              onClick={() => onSelect(day)}
              className={`
                relative px-4 py-2 text-sm font-mono font-bold transition-all duration-300
                ${
                  isActive
                    ? "text-white scale-110"
                    : "text-white/20 hover:text-white/60"
                }
              `}
            >
              {isActive && (
                <div className="absolute inset-0 bg-pink-500/20 blur-md rounded-lg" />
              )}
              <span className="relative z-10">{day}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full shadow-[0_0_5px_#f472b6]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ScheduleList: React.FC<{
  items: ScheduleItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ items, onToggle, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg bg-black/20">
        <div className="text-center">
          <div className="text-4xl mb-2 opacity-20">★</div>
          <div className="text-white/30 font-mono text-sm">
            No timelines active.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pl-4">
      {/* Vertical Dashed Line Connector */}
      <div className="absolute left-[27px] top-6 bottom-6 w-px border-l border-dashed border-white/10 z-0" />

      <div className="space-y-6 relative z-10">
        {items.map((item) => (
          <div
            key={item.id}
            className={`
              group relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300
              ${
                item.completed
                  ? "bg-white/5 opacity-60"
                  : "bg-[#1a1a1a] hover:bg-[#222] border border-white/5 hover:border-pink-500/30"
              }
            `}
          >
            {/* Star Checkbox */}
            <button
              onClick={() => onToggle(item.id)}
              className={`
                mt-1 flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300
                ${
                  item.completed
                    ? "text-pink-400 scale-110 rotate-12 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]"
                    : "text-white/20 hover:text-pink-300"
                }
              `}
            >
              <StarIcon filled={item.completed} className="w-5 h-5" />
            </button>

            {/* Content */}
            <div
              className="flex-1 w-full min-w-0"
              onClick={() => onToggle(item.id)}
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className={`font-mono text-xs font-bold tracking-wider ${
                    item.completed ? "text-pink-400/70" : "text-indigo-400"
                  }`}
                >
                  {item.time}
                </span>
                {item.completed && (
                  <span className="text-[10px] text-pink-400 font-bold tracking-widest border border-pink-400/30 px-1 rounded">
                    MANIFESTED
                  </span>
                )}
              </div>

              <h3
                className={`text-lg font-medium transition-all duration-300 truncate pr-4 ${
                  item.completed
                    ? "text-pink-200/50 line-through decoration-pink-500/50 decoration-wavy"
                    : "text-white"
                }`}
              >
                {item.activity}
              </h3>

              {item.intention && (
                <p
                  className={`text-sm mt-1 font-serif italic ${
                    item.completed ? "text-white/20" : "text-white/40"
                  }`}
                >
                  " {item.intention} "
                </p>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all hover:rotate-90"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddItemForm: React.FC<{
  onAdd: (item: ScheduleItem) => void;
}> = ({ onAdd }) => {
  const [newTime, setNewTime] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [newIntention, setNewIntention] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime || !newActivity) return;

    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    onAdd({
      id,
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
    <div className="sticky top-8">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glass Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-pink-400">✧</span> Manifest Station
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-1 block">
              Time Coordinates
            </label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full bg-black/40 text-white p-3 rounded-lg border border-white/10 focus:border-pink-500/50 outline-none font-mono transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-1 block">
              Event
            </label>
            <input
              type="text"
              placeholder="What's happening?"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              className="w-full bg-black/40 text-white p-3 rounded-lg border border-white/10 focus:border-pink-500/50 outline-none transition-colors placeholder-white/20"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-1 block">
              Intention
            </label>
            <input
              type="text"
              placeholder="Vibe check..."
              value={newIntention}
              onChange={(e) => setNewIntention(e.target.value)}
              className="w-full bg-black/40 text-white p-3 rounded-lg border border-white/10 focus:border-pink-500/50 outline-none italic font-serif transition-colors placeholder-white/20"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 group relative px-6 py-3 bg-gradient-to-r from-pink-500 to-indigo-600 rounded-xl font-bold text-sm tracking-widest text-white overflow-hidden transition-all hover:scale-[1.02] hover:rotate-1 shadow-lg shadow-pink-500/20 border border-white/20"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ADD TO REALITY <StarIcon filled className="w-3 h-3" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </form>
      </div>

      {/* Decorative Stickers */}
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full blur-xl opacity-20 pointer-events-none" />
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-500 rounded-full blur-xl opacity-20 pointer-events-none" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

export const LuckyGirl: React.FC = () => {
  const {
    selectedDay,
    setSelectedDay,
    currentItems,
    addItem,
    toggleItem,
    deleteItem,
  } = useSchedule();

  const total = currentItems.length;
  const claimed = currentItems.filter((i) => i.completed).length;

  return (
    <div className="w-full">
      {" "}
      {/* Removed max-w limitation for full layout */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-2 tracking-tighter">
          LUCKY GIRL SYNDROME
        </h1>
        <p className="text-white/40 font-mono text-sm tracking-wide">
          // DAY_SEQUENCE: <span className="text-white">{selectedDay}</span>
        </p>
      </div>
      <DayNavigator selectedDay={selectedDay} onSelect={setSelectedDay} />
      <ProgressBar total={total} claimed={claimed} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: List */}
        <div className="lg:col-span-8">
          <ScheduleList
            items={currentItems}
            onToggle={toggleItem}
            onDelete={deleteItem}
          />
        </div>

        {/* Right Col: Form */}
        <div className="lg:col-span-4">
          <AddItemForm onAdd={addItem} />
        </div>
      </div>
    </div>
  );
};

export const LuckyGirlSidebar: React.FC = () => {
  const currentDayStr = getCurrentDay();
  const { schedule } = useSchedule();
  const todayItems = schedule[currentDayStr] || [];

  return (
    <>
      <div className="px-6 pb-2 flex items-center justify-between mb-1">
        <div className="text-[10px] text-pink-400 font-bold tracking-widest opacity-80">
          TODAY [{currentDayStr}]
        </div>
        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
      </div>

      {todayItems.length === 0 ? (
        <div className="px-6 text-xs text-white/30 italic font-mono">
          No active timelines...
        </div>
      ) : (
        todayItems.map((s) => (
          <div
            key={s.id}
            className={`px-6 py-1 text-xs truncate transition-colors ${
              s.completed
                ? "text-white/20 line-through decoration-pink-500/30"
                : "text-white/60 hover:text-pink-300"
            }`}
          >
            <span className="font-mono opacity-50 mr-2">[{s.time}]</span>
            {s.activity}
          </div>
        ))
      )}
    </>
  );
};
