import React, { useState, useEffect, useRef } from "react";
import { Task } from "../types";
import { ListChecks, Play, Zap, Edit2, Eye } from "lucide-react";

interface ActiveTaskViewProps {
  task: Task | null;
  onUpdateTask?: (task: Task) => void;
  backgroundImage?: string;
}

export const ActiveTaskView: React.FC<ActiveTaskViewProps> = ({
  task,
  onUpdateTask,
  backgroundImage,
}) => {
  const [percentDone, setPercentDone] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<string>("00:00");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const isSavingRef = useRef(false);
  const prevTaskIdRef = useRef<string | null>(null);

  const handleSave = (content: string) => {
    if (!task || !onUpdateTask) return;
    setIsEditingNotes(false); // optimistically close editor if we want, or keep it open.

    if (content !== task.notes) {
      isSavingRef.current = true;
      onUpdateTask({ ...task, notes: content });
    }
  };

  // sync draft with task prop changes, respecting edit mode & save state
  useEffect(() => {
    if (task) {
      if (task.id !== prevTaskIdRef.current) {
        // new task: always sync
        setNotesDraft(task.notes || "");
        prevTaskIdRef.current = task.id;
        isSavingRef.current = false;
      } else if (task.notes !== notesDraft) {
        // same task, potential sync
        if (isSavingRef.current) {
          // we are expecting a specific update.
          // if task.notes is still not what we drafted, it might be stale or collision.
          // but we can check if task.notes matches our draft.
          // if task.notes matches draft, sync is complete.
          if (task.notes === notesDraft) {
            isSavingRef.current = false;
          }
        } else {
          // not saving, just normal sync (external update)
          // only sync if we are NOT editing to avoid interrupting typing?
          // OR sync strictly if !isEditingNotes.
          if (!isEditingNotes) {
            setNotesDraft(task.notes || "");
          }
        }
      }
    }
  }, [task, isEditingNotes, notesDraft]);

  // auto-save effect (debounced)
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
      // switching to read mode: save immediately if changed
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
          Math.min(100, (elapsed / task.durationMinutes) * 100),
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
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
          );
        } else {
          const mins = Math.floor(totalSeconds / 60);
          const secs = totalSeconds % 60;
          setTimeLeft(
            `${mins.toString().padStart(2, "0")}:${secs
              .toString()
              .padStart(2, "0")}`,
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
    <div className="h-full relative flex flex-col overflow-hidden isolate bg-[#09090b]">
      {/* Background Image Layer */}
      {backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover transition-opacity duration-700 opacity-60"
          />
          <div className="" />
        </div>
      )}

      {/* Minimal Progress Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-20">
        <div
          className="h-full bg-[#E1306C] transition-all duration-1000 ease-linear"
          style={{ width: `${percentDone}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col p-8 md:p-12 overflow-hidden gap-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between flex-shrink-0 backdrop-blur-md bg-black/10 rounded-2xl p-6">
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl md:text-5xl font-medium text-[#e8eaed] tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {task.title}
            </h1>
          </div>

          <div className="text-4xl md:text-6xl font-light text-[#e8eaed] tabular-nums tracking-tighter opacity-90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {timeLeft}
          </div>
        </div>

        {/* Notes/Content Section */}
        <div className="flex-1 overflow-y-hidden min-h-0 group relative flex flex-col backdrop-blur-md bg-black/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-xs uppercase tracking-widest text-[#e8eaed] font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Notes
            </h3>
            {task && onUpdateTask && (
              <button
                onClick={toggleEditMode}
                className={`p-1.5 rounded-md transition-all ${
                  isEditingNotes
                    ? "text-[#E1306C] bg-[#E1306C]/10"
                    : "opacity-50 group-hover:opacity-100 text-[#e8eaed] hover:text-[#e8eaed] hover:bg-white/5"
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
                className="w-full h-full bg-transparent border-none p-0 text-[#9aa0a6] placeholder-white/20 focus:ring-0 focus:outline-none resize-none font-light leading-relaxed text-lg custom-scroll drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                placeholder="add notes..."
                autoFocus
              />
            ) : (
              <div className="h-full overflow-y-auto custom-scroll">
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-[#9aa0a6] leading-relaxed whitespace-pre-wrap font-light drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {task.notes || notesDraft || (
                      <span className="italic opacity-100">
                        ~no notes for this task.
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
