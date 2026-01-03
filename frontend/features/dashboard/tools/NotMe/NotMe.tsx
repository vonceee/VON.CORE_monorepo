import React from "react";
import { useNotMe, TrackerConfig } from "./hooks/useNotMe";
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

const NotMe: React.FC = () => {
  const { listItems, updateValue, getValue } = useNotMe();

  const renderTracker = (item: TrackerConfig) => {
    const IconComponent = ICON_MAP[item.icon || "Activity"] || Activity;
    const value = getValue(item.id);

    // Counter View
    if (item.type === "counter") {
      const current = typeof value === "number" ? value : 0;
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
    <div className="h-full w-full flex flex-col bg-[#09090b] text-white p-6 overflow-y-auto custom-scroll">
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
        Not Me.
      </h1>

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
  );
};

export default NotMe;
