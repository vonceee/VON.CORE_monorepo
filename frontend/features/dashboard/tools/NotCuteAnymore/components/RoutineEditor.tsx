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
}

export const RoutineEditor: React.FC<RoutineEditorProps> = ({
  day,
  tasks,
  onSave,
  onCopy,
  onClose,
}) => {
  const [localTasks, setLocalTasks] = React.useState<Task[]>([...tasks]);
  const [isCopyMode, setIsCopyMode] = React.useState(false);
  const [selectedDays, setSelectedDays] = React.useState<DayOfWeek[]>([]);

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
      notes: "Task notes...",
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
    onClose();
  };

  const handleCopyConfirm = () => {
    if (onCopy && selectedDays.length > 0) {
      onCopy(localTasks, selectedDays);
      setIsCopyMode(false);
      onClose();
    }
  };

  const toggleDaySelection = (d: DayOfWeek) => {
    if (selectedDays.includes(d)) {
      setSelectedDays(selectedDays.filter((day) => day !== d));
    } else {
      setSelectedDays([...selectedDays, d]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-black w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl rounded-2xl border border-white/20">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/20 flex justify-between items-center bg-[#121212] flex-shrink-0">
          <div>
            <h2 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#f09433] to-[#bc1888] mb-1">
              {isCopyMode ? "Copy Routine" : "Edit Routine"}
            </h2>
            <p className="text-sm text-[#9aa0a6]">
              {isCopyMode ? (
                "Select days to copy the current schedule to."
              ) : (
                <>
                  Schedule for{" "}
                  <span className="text-[#E1306C] font-medium">{day}</span>
                </>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#262626] rounded-full transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#9aa0a6]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
          {!isCopyMode ? (
            <>
              {localTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="p-5 bg-black border border-white/20 rounded-xl space-y-4 hover:border-[#E1306C]/50 transition-all duration-200"
                >
                  {/* Task Header Row */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#262626] flex items-center justify-center text-xs font-medium text-[#9aa0a6]">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-medium text-[#9aa0a6] mb-2 block">
                          Task Title
                        </label>
                        <input
                          value={task.title}
                          onChange={(e) =>
                            updateTask(task.id, { title: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-[#121212] border border-white/20 rounded-lg text-sm text-[#e8eaed] placeholder-[#5f6368] focus:outline-none focus:border-[#E1306C] focus:ring-1 focus:ring-[#E1306C] transition-colors"
                          placeholder="Enter task title"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="p-2 text-[#ea4335] hover:bg-[#ea4335]/10 rounded-lg transition-colors duration-200 mt-6"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Time and Duration Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-[#9aa0a6] mb-2 block">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={task.startTime}
                        onChange={(e) =>
                          updateTask(task.id, { startTime: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-[#121212] border border-white/20 rounded-lg text-sm text-[#e8eaed] focus:outline-none focus:border-[#E1306C] focus:ring-1 focus:ring-[#E1306C] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#9aa0a6] mb-2 block">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        value={task.durationMinutes}
                        onChange={(e) =>
                          updateTask(task.id, {
                            durationMinutes: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-[#121212] border border-white/20 rounded-lg text-sm text-[#e8eaed] placeholder-[#5f6368] focus:outline-none focus:border-[#E1306C] focus:ring-1 focus:ring-[#E1306C] transition-colors"
                        placeholder="60"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs font-medium text-[#9aa0a6] mb-2 block">
                      Notes
                    </label>
                    <textarea
                      value={task.notes}
                      onChange={(e) =>
                        updateTask(task.id, { notes: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-[#121212] border border-white/20 rounded-lg text-sm text-[#e8eaed] placeholder-[#5f6368] focus:outline-none focus:border-[#E1306C] focus:ring-1 focus:ring-[#E1306C] transition-colors resize-none"
                      placeholder="add task notes..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={addTask}
                className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl text-[#9aa0a6] hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/5 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm"
              >
                <Plus className="w-5 h-5" />
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
        <div className="px-6 py-4 border-t border-white/20 flex justify-end gap-3 bg-[#121212] flex-shrink-0">
          <button
            onClick={isCopyMode ? () => setIsCopyMode(false) : onClose}
            className="px-6 py-2.5 text-sm font-medium text-[#E1306C] hover:bg-[#E1306C]/10 rounded-lg transition-all duration-200"
          >
            {isCopyMode ? "Back" : "Cancel"}
          </button>

          {onCopy && !isCopyMode && (
            <button
              onClick={() => setIsCopyMode(true)}
              className="px-6 py-2.5 bg-[#262626] hover:bg-[#333] text-[#e8eaed] font-medium rounded-lg shadow-md flex items-center gap-2 transition-all duration-200 active:scale-98"
            >
              <Copy className="w-4 h-4" />
              Copy to...
            </button>
          )}

          {isCopyMode ? (
            <button
              onClick={handleCopyConfirm}
              disabled={selectedDays.length === 0}
              className={`px-6 py-2.5 font-medium rounded-lg shadow-md flex items-center gap-2 transition-all duration-200 active:scale-98 ${
                selectedDays.length === 0
                  ? "bg-[#262626] text-[#9aa0a6] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white"
              }`}
            >
              <Copy className="w-4 h-4" />
              Confirm Copy ({selectedDays.length})
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 text-white font-medium rounded-lg shadow-md flex items-center gap-2 transition-all duration-200 active:scale-98"
            >
              <Save className="w-4 h-4" />
              Save Routine
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
