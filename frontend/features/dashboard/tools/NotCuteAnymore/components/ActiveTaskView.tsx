import React, { useState, useEffect, useRef } from "react";
import { Task } from "../types";
import { ListChecks, Play, Zap, Edit2, Eye } from "lucide-react";

interface ActiveTaskViewProps {
  task: Task | null;
  onUpdateTask?: (task: Task) => void;
}

export const ActiveTaskView: React.FC<ActiveTaskViewProps> = ({
  task,
  onUpdateTask,
}) => {
  const [percentDone, setPercentDone] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>("00:00");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const isSavingRef = useRef(false);
  const prevTaskIdRef = useRef<string | null>(null);

  const handleSave = (content: string) => {
    if (!task || !onUpdateTask) return;
    setIsEditingNotes(false); // Optimistically close editor if we want, or keep it open.
    // Actually, user wants toggle behavior.

    if (content !== task.notes) {
      isSavingRef.current = true;
      onUpdateTask({ ...task, notes: content });
    }
  };

  // Sync draft with task prop changes, respecting edit mode & save state
  useEffect(() => {
    if (task) {
      if (task.id !== prevTaskIdRef.current) {
        // New task: always sync
        setNotesDraft(task.notes || "");
        prevTaskIdRef.current = task.id;
        isSavingRef.current = false;
      } else if (task.notes !== notesDraft) {
        // Same task, potential sync
        if (isSavingRef.current) {
          // We are expecting a specific update.
          // If task.notes is STILL not what we drafted, it might be stale or collision.
          // But we can check if task.notes matches our draft.
          // If task.notes matches draft, sync is complete.
          if (task.notes === notesDraft) {
            isSavingRef.current = false;
          }
        } else {
          // Not saving, just normal sync (external update)
          // Only sync if we are NOT editing to avoid interrupting typing?
          // OR sync strictly if !isEditingNotes.
          if (!isEditingNotes) {
            setNotesDraft(task.notes || "");
          }
        }
      }
    }
  }, [task, isEditingNotes, notesDraft]);

  // Auto-save effect (debounced)
  useEffect(() => {
    if (!isEditingNotes || !task || !onUpdateTask) return;

    const timeoutId = setTimeout(() => {
      if (notesDraft !== task.notes) {
        isSavingRef.current = true;
        onUpdateTask({ ...task, notes: notesDraft });
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [notesDraft, isEditingNotes, task, onUpdateTask]);

  const toggleEditMode = () => {
    if (isEditingNotes) {
      // Switching to Read Mode: Save immediately if changed
      if (task && onUpdateTask && notesDraft !== task.notes) {
        isSavingRef.current = true;
        onUpdateTask({ ...task, notes: notesDraft });
      }
    }
    setIsEditingNotes(!isEditingNotes);
  };

  useEffect(() => {
    if (task) {
      const updateProgress = () => {
        const now = new Date();
        const nowInMinutes =
          now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
        const [startH, startM] = task.startTime.split(":").map(Number);
        const startInMinutes = startH * 60 + startM;
        const elapsed = nowInMinutes - startInMinutes;
        const progress = Math.max(
          0,
          Math.min(100, (elapsed / task.durationMinutes) * 100)
        );
        setPercentDone(progress);

        const remainingMinutes = Math.max(0, task.durationMinutes - elapsed);
        const totalSeconds = Math.floor(remainingMinutes * 60);

        if (totalSeconds >= 3600) {
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;
          setTimeLeft(
            `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        } else {
          const mins = Math.floor(totalSeconds / 60);
          const secs = totalSeconds % 60;
          setTimeLeft(
            `${mins.toString().padStart(2, "0")}:${secs
              .toString()
              .padStart(2, "0")}`
          );
        }
      };

      updateProgress();
      const interval = setInterval(updateProgress, 1000);
      return () => clearInterval(interval);
    }
  }, [task]);

  if (!task) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#3c4043] gap-4">
        <Zap className="w-8 h-8 opacity-50" />
        <span className="text-xs uppercase tracking-[0.2em] font-medium">
          Standby Mode
        </span>
      </div>
    );
  }

  return (
    <div className="h-full relative flex flex-col overflow-hidden bg-[#09090b]">
      {/* Minimal Progress Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
        <div
          className="h-full bg-[#E1306C] transition-all duration-1000 ease-linear"
          style={{ width: `${percentDone}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col p-8 md:p-12 overflow-hidden">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between flex-shrink-0">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#E1306C] font-medium">
                Now Active
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-medium text-[#e8eaed] tracking-tight leading-tight">
              {task.title}
            </h1>
          </div>

          <div className="text-4xl md:text-6xl font-light text-[#e8eaed] tabular-nums tracking-tighter opacity-90">
            {timeLeft}
          </div>
        </div>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-white/10 my-8 md:my-12" />

        {/* Notes/Content Section */}
        {/* Notes/Content Section */}
        <div className="flex-1 overflow-y-hidden min-h-0 group relative flex flex-col">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-xs uppercase tracking-widest text-[#5f6368] font-medium">
              Notes
            </h3>
            {task && onUpdateTask && (
              <button
                onClick={toggleEditMode}
                className={`p-1.5 rounded-md transition-all ${
                  isEditingNotes
                    ? "text-[#E1306C] bg-[#E1306C]/10"
                    : "opacity-0 group-hover:opacity-100 text-[#5f6368] hover:text-[#e8eaed] hover:bg-white/5"
                }`}
                title={isEditingNotes ? "Switch to Reading View" : "Edit Notes"}
              >
                {isEditingNotes ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <Edit2 className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>

          <div className="flex-1 min-h-0 relative">
            {isEditingNotes ? (
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                className="w-full h-full bg-transparent border-none p-0 text-[#9aa0a6] placeholder-white/20 focus:ring-0 focus:outline-none resize-none font-light leading-relaxed text-lg custom-scroll"
                placeholder="add notes..."
                autoFocus
              />
            ) : (
              <div className="h-full overflow-y-auto custom-scroll">
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-[#9aa0a6] leading-relaxed whitespace-pre-wrap font-light">
                    {task.notes || notesDraft || (
                      <span className="italic opacity-50">
                        no notes for this task.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
