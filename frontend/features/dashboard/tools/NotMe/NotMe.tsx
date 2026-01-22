import React from "react";
import { useNotMe, TrackerConfig } from "./hooks/useNotMe";
import { IntroductionView } from "./components/IntroductionView";
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
  Info,
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
  /* Add Habit Modal State - REMOVED (Moved to Sidebar) */
  const { listItems, updateValue, getValue, history, addItem, isLoading } =
    useNotMe(activeDate);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(false);
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

  /* Refactored Render Tracker for List View */
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
          className="group relative flex flex-col p-4 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
        >
          {/* Top Row: Content + Actions */}
          <div className="flex items-center justify-between gap-4">
            {/* Left Side: Text Info */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-medium text-gray-200 tracking-tight truncate">
                  {item.label}
                </h2>
              </div>
              {item.description && (
                <p className="text-xs text-gray-500 mt-1 pl-[3.25rem] line-clamp-1">
                  {item.description}
                </p>
              )}
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-6 shrink-0">
              {/* Counter Controls */}
              <div className="flex items-center gap-4 bg-black/20 p-1.5 rounded-xl border border-white/5">
                <button
                  onClick={() =>
                    updateValue(item.id, { amount: Math.max(0, current - 1) })
                  }
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  disabled={current === 0}
                >
                  <Minus className="w-4 h-4 text-gray-400" />
                </button>

                <div className="flex items-baseline gap-1 min-w-[3rem] justify-center">
                  <span className="text-lg font-medium text-white tabular-nums">
                    {current}
                  </span>
                  <span className="text-xs text-gray-600 font-medium">
                    /{goal}
                  </span>
                </div>

                <button
                  onClick={() => updateValue(item.id, { amount: current + 1 })}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Note Toggle */}
              <button
                onClick={() => handleNoteToggle(item.id, valueObj?.note)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  valueObj?.note || openNoteId === item.id
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-gray-600 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar (Bottom Line) */}
          <div className="mt-4 h-1 w-full bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500/50 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Note Input Area */}
          {openNoteId === item.id && (
            <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
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
      );
    }

    // Outcome View (Win/Loss)
    if (item.type === "outcome") {
      const outcome = amount as "WIN" | "LOSS" | null;

      return (
        <div
          key={item.id}
          className="group relative flex flex-col p-4 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300"
        >
          {/* Top Row: Content + Actions */}
          <div className="flex items-center justify-between gap-4">
            {/* Left Side: Text Info */}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-medium text-gray-200 tracking-tight truncate">
                  {item.label}
                </h2>
              </div>
              {item.description && (
                <p className="text-xs text-gray-500 mt-1 pl-[3.25rem] line-clamp-1">
                  {item.description}
                </p>
              )}
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateValue(item.id, {
                      amount: outcome === "WIN" ? null : "WIN",
                    })
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border ${
                    outcome === "WIN"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-surface-200/50 text-gray-500 border-transparent hover:bg-surface-300 hover:text-gray-300"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider">WIN</span>
                </button>

                <button
                  onClick={() =>
                    updateValue(item.id, {
                      amount: outcome === "LOSS" ? null : "LOSS",
                    })
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 border ${
                    outcome === "LOSS"
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      : "bg-surface-200/50 text-gray-500 border-transparent hover:bg-surface-300 hover:text-gray-300"
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider">LOSS</span>
                </button>
              </div>

              {/* Note Toggle */}
              <button
                onClick={() => handleNoteToggle(item.id, valueObj?.note)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  valueObj?.note || openNoteId === item.id
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-gray-600 hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
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
      {showIntro ? (
        <IntroductionView onClose={() => setShowIntro(false)} />
      ) : (
        <>
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
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    showCalendar
                      ? "bg-white text-black hover:bg-gray-200"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <CalendarIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setShowIntro(true)}
                  className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  <Info className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 max-w-7xl">
              {/* Habits Section */}
              {/* Habits Section */}
              {isLoading ? (
                <div className="space-y-4">
                  <NotMeGridSkeleton />
                </div>
              ) : listItems.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center min-h-[400px] text-center p-8 animate-in fade-in zoom-in duration-500">
                  <div className="bg-white/5 p-6 rounded-full mb-6 border border-white/10 shadow-2xl">
                    <Activity className="w-12 h-12 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Welcome to Not Me
                  </h2>
                  <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                    start by creating your first tracker using the{" "}
                    <strong className="text-white">+</strong> button.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl w-full">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                          <Target className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-medium text-white">
                          Counters
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500">
                        track daily quantities like water intake, pages read, or
                        pushups. set a daily goal and fill the bar.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                          <Trophy className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-medium text-white">
                          Outcomes
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500">
                        track binary results like "Win/Loss" for games, or
                        "Pass/Fail" for daily challenges.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {habits.length > 0 && (
                    <section>
                      <div className="flex flex-col gap-3">
                        {habits.map(renderTracker)}
                      </div>
                    </section>
                  )}

                  {games.length > 0 && (
                    <section
                      className={
                        habits.length > 0 ? "pt-6 border-t border-white/5" : ""
                      }
                    >
                      <div className="flex flex-col gap-3">
                        {games.map(renderTracker)}
                      </div>
                    </section>
                  )}
                </>
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
        </>
      )}
    </div>
  );
};

export default NotMe;
