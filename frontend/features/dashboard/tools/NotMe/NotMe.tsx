import React from "react";
import { useNotMe, TrackerConfig } from "./hooks/useNotMe";
import { NotMeCalendar } from "./NotMeCalendar";
import { NotMeGridSkeleton } from "./NotMeSkeleton";
import {
  Droplets,
  Gamepad2,
  Trophy,
  XCircle,
  CheckCircle2,
  Minus,
  Plus,
  Swords,
  Activity,
  Zap,
  Target,
  Calendar as CalendarIcon,
  MessageSquare,
} from "lucide-react";

// Icon Map
const ICON_MAP: Record<string, React.ElementType> = {
  Droplets,
  Gamepad2,
  Swords,
  Trophy,
  Activity,
  Zap,
  Target,
};

// Helper for YYYY-MM-DD
const getISODate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const NotMe: React.FC = () => {
  const [activeDate, setActiveDate] = React.useState(getISODate());
  /* Add Habit Modal State */
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [newHabit, setNewHabit] = React.useState({
    label: "",
    type: "counter",
    goal: 1,
    icon: "Activity",
  });
  const { listItems, updateValue, getValue, history, addItem, isLoading } =
    useNotMe(activeDate);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [openNoteId, setOpenNoteId] = React.useState<string | null>(null);
  const [noteText, setNoteText] = React.useState("");

  const isToday = activeDate === getISODate();

  const handleNoteToggle = (id: string, currentNote?: string | null) => {
    if (openNoteId === id) {
      setOpenNoteId(null);
      setNoteText("");
    } else {
      setOpenNoteId(id);
      setNoteText(currentNote || "");
    }
  };

  const saveNote = (id: string) => {
    updateValue(id, { note: noteText });
    setOpenNoteId(null);
    // don't clear noteText immediately to avoid flickering if we re-open,
    // though conceptually we should probably reset or let the toggle handle it
  };

  const handleAdd = () => {
    addItem({
      label: newHabit.label,
      type: newHabit.type as "counter" | "outcome",
      goal: newHabit.type === "counter" ? newHabit.goal : undefined,
      icon: newHabit.icon,
    });
    setIsAddModalOpen(false);
    setNewHabit({ label: "", type: "counter", goal: 1, icon: "Activity" });
  };

  const renderTracker = (item: TrackerConfig) => {
    const IconComponent = ICON_MAP[item.icon || "Activity"] || Activity;
    const valueObj = getValue(item.id);
    const amount = valueObj?.amount;

    // Counter View
    if (item.type === "counter") {
      const current = Number(amount) || 0;
      const goal = item.goal || 1;
      const progress = Math.min(100, (current / goal) * 100);

      return (
        <div
          key={item.id}
          className="group relative flex flex-col justify-between p-5 rounded-2xl hover:bg-white/5 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <h2 className="text-lg font-medium text-gray-200 tracking-tight">
                {item.label}
              </h2>
            </div>
            <button
              onClick={() => handleNoteToggle(item.id, valueObj?.note)}
              className={`p-1.5 rounded-lg transition-all duration-300 ${
                valueObj?.note
                  ? "text-blue-400"
                  : "text-gray-600 opacity-0 group-hover:opacity-100 hover:text-gray-300"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() =>
                  updateValue(item.id, { amount: Math.max(0, current - 1) })
                }
                className="group/btn p-1.5 transition-all hover:scale-110 disabled:opacity-30"
                disabled={current === 0}
              >
                <Minus className="w-5 h-5 text-gray-600 group-hover/btn:text-gray-300 transition-colors" />
              </button>

              <div className="text-center">
                <span className="text-5xl font-light tracking-tighter tabular-nums block text-white">
                  {current}
                </span>
                <span className="text-xs text-gray-600 font-medium tracking-wide mt-1 block">
                  GOAL: {goal}
                </span>
              </div>

              <button
                onClick={() => updateValue(item.id, { amount: current + 1 })}
                className="group/btn p-1.5 transition-all hover:scale-110"
              >
                <Plus className="w-5 h-5 text-gray-600 group-hover/btn:text-gray-300 transition-colors" />
              </button>
            </div>

            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500/50 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Note Input Area */}
            {openNoteId === item.id && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="add a note..."
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 min-h-[80px] resize-none"
                  autoFocus
                  onBlur={() => saveNote(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      saveNote(item.id);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    // Outcome View (Win/Loss)
    if (item.type === "outcome") {
      const outcome = amount as "WIN" | "LOSS" | null;

      return (
        <div
          key={item.id}
          className="group relative flex flex-col justify-between p-5 rounded-2xl hover:bg-white/5 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
              <h2 className="text-lg font-medium text-gray-200 tracking-tight">
                {item.label}
              </h2>
            </div>
            <button
              onClick={() => handleNoteToggle(item.id, valueObj?.note)}
              className={`p-1.5 rounded-lg transition-all duration-300 ${
                valueObj?.note
                  ? "text-blue-400"
                  : "text-gray-600 opacity-0 group-hover:opacity-100 hover:text-gray-300"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() =>
                updateValue(item.id, {
                  amount: outcome === "WIN" ? null : "WIN",
                })
              }
              className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all duration-300 ${
                outcome === "WIN"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
              }`}
            >
              <CheckCircle2
                className={`w-5 h-5 ${
                  outcome === "WIN" ? "text-emerald-400" : "opacity-50"
                }`}
              />
              <span className="text-[10px] font-medium tracking-widest uppercase">
                WIN
              </span>
            </button>
            <button
              onClick={() =>
                updateValue(item.id, {
                  amount: outcome === "LOSS" ? null : "LOSS",
                })
              }
              className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all duration-300 ${
                outcome === "LOSS"
                  ? "bg-rose-500/10 text-rose-400"
                  : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
              }`}
            >
              <XCircle
                className={`w-5 h-5 ${
                  outcome === "LOSS" ? "text-rose-400" : "opacity-50"
                }`}
              />
              <span className="text-[10px] font-medium tracking-widest uppercase">
                LOSS
              </span>
            </button>
          </div>

          {/* Note Input Area */}
          {openNoteId === item.id && (
            <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="add a note..."
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 min-h-[80px] resize-none"
                autoFocus
                onBlur={() => saveNote(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    saveNote(item.id);
                  }
                }}
              />
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const habits = listItems.filter((item) => item.type === "counter");
  const games = listItems.filter((item) => item.type === "outcome");

  return (
    <div className="h-full w-full flex bg-[#09090b] text-white overflow-hidden font-sans">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-light tracking-tighter mb-1 text-white">
              Not Me.
            </h1>
            <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
              {isToday ? "Today's Focus" : `History: ${activeDate}`}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-3 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all duration-300"
              title="Add Habit"
            >
              <Plus className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={`p-3 rounded-full transition-all duration-300 ${
                showCalendar
                  ? "bg-white text-black hover:bg-gray-200"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <CalendarIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 max-w-7xl">
          {/* Habits Section */}
          {isLoading ? (
            <div className="space-y-4">
              <NotMeGridSkeleton />
            </div>
          ) : (
            habits.length > 0 && (
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {habits.map(renderTracker)}
                </div>
              </section>
            )
          )}

          {/* Games Section */}
          {games.length > 0 && (
            <section className="pt-6 border-t border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {games.map(renderTracker)}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Calendar Side Panel */}
      {showCalendar && (
        <div className="h-full border-l border-white/5 bg-[#09090b] shadow-xl z-10 animate-in slide-in-from-right duration-200">
          <NotMeCalendar
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            history={history}
            listItems={listItems}
          />
        </div>
      )}

      {/* Add Habit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Add New Habit</h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">
                  Label
                </label>
                <input
                  value={newHabit.label}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, label: e.target.value })
                  }
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Read Book"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">Type</label>
                <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() =>
                      setNewHabit({ ...newHabit, type: "counter" })
                    }
                    className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      newHabit.type === "counter"
                        ? "bg-blue-500/20 text-blue-400"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Counter
                  </button>
                  <button
                    onClick={() =>
                      setNewHabit({ ...newHabit, type: "outcome" })
                    }
                    className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      newHabit.type === "outcome"
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Outcome
                  </button>
                </div>
              </div>

              {newHabit.type === "counter" && (
                <div>
                  <label className="text-sm text-gray-400 block mb-1">
                    Daily Goal
                  </label>
                  <input
                    type="number"
                    value={newHabit.goal}
                    onChange={(e) =>
                      setNewHabit({
                        ...newHabit,
                        goal: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-gray-400 block mb-1">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(ICON_MAP).map((iconKey) => {
                    const Icon = ICON_MAP[iconKey];
                    return (
                      <button
                        key={iconKey}
                        onClick={() =>
                          setNewHabit({ ...newHabit, icon: iconKey })
                        }
                        className={`p-2 rounded-lg border ${
                          newHabit.icon === iconKey
                            ? "bg-white/10 border-blue-500 text-blue-400"
                            : "border-transparent text-gray-500 hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newHabit.label}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotMe;
