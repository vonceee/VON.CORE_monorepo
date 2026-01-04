import React from "react";
import { useNotMe, TrackerConfig } from "./hooks/useNotMe";
import { NotMeCalendar } from "./NotMeCalendar";
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
  const { listItems, updateValue, getValue, history, addItem } =
    useNotMe(activeDate);
  const [showCalendar, setShowCalendar] = React.useState(false);

  const isToday = activeDate === getISODate();

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
    const value = getValue(item.id);

    // Counter View
    if (item.type === "counter") {
      const current = Number(value) || 0;
      const goal = item.goal || 1;
      const progress = Math.min(100, (current / goal) * 100);

      return (
        <div
          key={item.id}
          className="bg-[#18181b] rounded-xl p-6 border border-white/5 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <IconComponent className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-200">
              {item.label}
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => updateValue(item.id, Math.max(0, current - 1))}
                className="p-3 rounded-full hover:bg-white/5 border border-white/10 transition-colors"
                disabled={current === 0}
              >
                <Minus className="w-5 h-5 text-gray-400" />
              </button>

              <div className="text-center">
                <span className="text-4xl font-bold tabular-nums block">
                  {current}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  / {goal}
                </span>
              </div>

              <button
                onClick={() => updateValue(item.id, current + 1)}
                className="p-3 rounded-full hover:bg-white/5 border border-white/10 transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      );
    }

    // Outcome View (Win/Loss)
    if (item.type === "outcome") {
      const outcome = value as "WIN" | "LOSS" | null;

      return (
        <div
          key={item.id}
          className="bg-[#18181b] rounded-xl p-6 border border-white/5 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <IconComponent className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-200">
              {item.label}
            </h2>
          </div>

          <div className="p-4 bg-black/20 rounded-lg border border-white/5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  updateValue(item.id, outcome === "WIN" ? null : "WIN")
                }
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  outcome === "WIN"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                WIN
              </button>
              <button
                onClick={() =>
                  updateValue(item.id, outcome === "LOSS" ? null : "LOSS")
                }
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  outcome === "LOSS"
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/50"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 border border-transparent"
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                LOSS
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const habits = listItems.filter((item) => item.type === "counter");
  const games = listItems.filter((item) => item.type === "outcome");

  return (
    <div className="h-full w-full flex bg-[#09090b] text-white overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scroll">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Not Me.
            </h1>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  isToday ? "text-gray-500" : "text-blue-400"
                }`}
              >
                {isToday ? "Today's Focus" : `Viewing History: ${activeDate}`}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Add Habit"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={`p-2 rounded-lg transition-colors border ${
                showCalendar
                  ? "bg-white/10 border-white/20 text-white"
                  : "text-gray-400 border-transparent hover:bg-white/5"
              }`}
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-10 max-w-7xl">
          {/* Habits Section */}
          {habits.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                Daily Habits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map(renderTracker)}
              </div>
            </section>
          )}

          {/* Games Section */}
          {games.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                Games & Discipline
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
