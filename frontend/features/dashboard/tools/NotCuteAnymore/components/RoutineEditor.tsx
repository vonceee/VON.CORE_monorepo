import React from "react";
import { X, Plus, Trash2, Save, Copy, Check } from "lucide-react";

enum TaskStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface Task {
  id: string;
  title: string;
  notes: string;
  startTime: string;
  durationMinutes: number;
  status: TaskStatus;
  dependencies: string[];
  requirements: string[];
}

interface RoutineEditorProps {
  day: DayOfWeek;
  tasks: Task[];
  onSave: (tasks: Task[]) => void;
  onCopy?: (tasks: Task[], targetDays: DayOfWeek[]) => void;
  onClose: () => void;
  isEmbedded?: boolean;
}

export const RoutineEditor: React.FC<RoutineEditorProps> = ({
  day,
  tasks,
  onSave,
  onCopy,
  onClose,
  isEmbedded = false,
}) => {
  const [localTasks, setLocalTasks] = React.useState<Task[]>([...tasks]);
  const [isCopyMode, setIsCopyMode] = React.useState(false);
  const [selectedDays, setSelectedDays] = React.useState<DayOfWeek[]>([]);

  React.useEffect(() => {
    setLocalTasks([...tasks]);
  }, [tasks]);

  const ALL_DAYS: DayOfWeek[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const addTask = () => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Task",
      notes: "",
      startTime: "09:00",
      durationMinutes: 60,
      status: TaskStatus.PENDING,
      dependencies: [],
      requirements: [],
    };
    setLocalTasks([...localTasks, newTask]);
  };

  const removeTask = (id: string) => {
    setLocalTasks(localTasks.filter((t) => t.id !== id));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setLocalTasks(
      localTasks.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const handleSave = () => {
    onSave(localTasks);
    if (!isEmbedded) onClose();
  };

  const handleCopyConfirm = () => {
    if (onCopy && selectedDays.length > 0) {
      onCopy(localTasks, selectedDays);
      setIsCopyMode(false);
      if (!isEmbedded) onClose();
    }
  };

  const toggleDaySelection = (d: DayOfWeek) => {
    if (selectedDays.includes(d)) {
      setSelectedDays(selectedDays.filter((day) => day !== d));
    } else {
      setSelectedDays([...selectedDays, d]);
    }
  };

  const Container = isEmbedded ? "div" : "div";
  const containerClasses = isEmbedded
    ? "h-full w-full flex flex-col bg-[#09090b] rounded-xl border border-white/5"
    : "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4";

  const innerClasses = isEmbedded
    ? "flex flex-col h-full overflow-hidden"
    : "bg-[#09090b] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl shadow-black/50 rounded-xl border border-white/10";

  return (
    <Container className={containerClasses}>
      <div className={innerClasses}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-lg font-medium text-[#e8eaed] mb-0.5">
              {isCopyMode ? "Copy Routine" : "Edit Routine"}
            </h2>
            <p className="text-xs text-[#9aa0a6]">
              {isCopyMode ? (
                "Select days to copy to"
              ) : (
                <>
                  <span className="text-[#E1306C] font-medium uppercase tracking-wider">
                    {day}
                  </span>
                </>
              )}
            </p>
          </div>
          {!isEmbedded && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-[#9aa0a6]" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
          {!isCopyMode ? (
            <>
              {localTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="p-4 group border-b border-white/5 last:border-0 hover:bg-white/5 transition-all duration-200"
                >
                  {/* Task Header Row */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-medium text-[#9aa0a6]">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <input
                          value={task.title}
                          onChange={(e) =>
                            updateTask(task.id, { title: e.target.value })
                          }
                          className="w-full bg-transparent border-none text-[#e8eaed] placeholder-[#5f6368] focus:ring-0 text-base font-medium p-0"
                          placeholder="What needs to be done?"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="p-1 text-[#5f6368] hover:text-[#ea4335] transition-colors duration-200 opacity-0 group-hover:opacity-100"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Time and Duration Row */}
                  <div className="pl-9 grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#5f6368] mb-1 font-medium">
                        Start
                      </div>
                      <input
                        type="time"
                        value={task.startTime}
                        onChange={(e) =>
                          updateTask(task.id, { startTime: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-white/10 focus:border-[#E1306C] text-sm text-[#9aa0a6] focus:text-[#e8eaed] py-1 transition-colors outline-none [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                      />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#5f6368] mb-1 font-medium">
                        Duration (min)
                      </div>
                      <input
                        type="number"
                        value={task.durationMinutes}
                        onChange={(e) =>
                          updateTask(task.id, {
                            durationMinutes: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full bg-transparent border-b border-white/10 focus:border-[#E1306C] text-sm text-[#9aa0a6] focus:text-[#e8eaed] py-1 transition-colors outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="60"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  {/* Notes */}
                  <div className="pl-9 mt-2">
                    <textarea
                      value={task.notes}
                      onChange={(e) =>
                        updateTask(task.id, { notes: e.target.value })
                      }
                      className="w-full bg-transparent text-sm text-[#9aa0a6] placeholder-[#5f6368]/50 focus:text-[#e8eaed] focus:placeholder-[#5f6368] outline-none resize-none transition-colors"
                      placeholder="add notes..."
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addTask}
                className="w-full py-3 text-[#5f6368] hover:text-[#9aa0a6] hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-wider rounded-lg mt-2"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ALL_DAYS.filter((d) => d !== day).map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDaySelection(d)}
                  className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all duration-200 group ${
                    selectedDays.includes(d)
                      ? "border-[#E1306C] bg-[#E1306C]/10"
                      : "border-white/20 bg-[#121212] hover:border-[#E1306C]/50"
                  }`}
                >
                  <span
                    className={`font-medium ${
                      selectedDays.includes(d)
                        ? "text-[#E1306C]"
                        : "text-[#e8eaed]"
                    }`}
                  >
                    {d}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedDays.includes(d)
                        ? "border-[#E1306C] bg-[#E1306C]"
                        : "border-[#5f6368] group-hover:border-[#9aa0a6]"
                    }`}
                  >
                    {selectedDays.includes(d) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 flex-shrink-0">
          {!isEmbedded && (
            <button
              onClick={isCopyMode ? () => setIsCopyMode(false) : onClose}
              className="px-4 py-2 text-xs font-medium text-[#9aa0a6] hover:text-[#e8eaed] rounded-lg transition-all duration-200"
            >
              {isCopyMode ? "Back" : "Cancel"}
            </button>
          )}
          {isEmbedded && isCopyMode && (
            <button
              onClick={() => setIsCopyMode(false)}
              className="px-4 py-2 text-xs font-medium text-[#9aa0a6] hover:text-[#e8eaed] rounded-lg transition-all duration-200"
            >
              Back
            </button>
          )}

          {onCopy && !isCopyMode && (
            <button
              onClick={() => setIsCopyMode(true)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#e8eaed] text-xs font-medium rounded-lg flex items-center gap-2 transition-all duration-200"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy to...
            </button>
          )}

          {isCopyMode ? (
            <button
              onClick={handleCopyConfirm}
              disabled={selectedDays.length === 0}
              className={`px-4 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition-all duration-200 ${
                selectedDays.length === 0
                  ? "bg-white/5 text-[#5f6368] cursor-not-allowed"
                  : "bg-[#E1306C] hover:bg-[#C13584] text-white"
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              Confirm Copy
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#E1306C] hover:bg-[#C13584] text-white text-xs font-medium rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg shadow-[#E1306C]/20"
            >
              <Save className="w-3.5 h-3.5" />
              Save Routine
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};
