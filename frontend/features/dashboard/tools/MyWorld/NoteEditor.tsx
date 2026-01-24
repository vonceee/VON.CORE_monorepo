import React, { useState, useEffect } from "react";
import { Note } from "./types";
import { Pen, X, Info } from "lucide-react";
import clsx from "clsx";
import { IntroductionView } from "./components/IntroductionView";

interface NoteEditorProps {
  note: Note | null;
  openNotes: Note[];
  activeNoteId: string | null;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onSelectNote: (id: string) => void;
  onCloseNote: (id: string) => void;
  onShowIntro: () => void;
  onCloseIntro: () => void;
  showIntro: boolean;
  isLoading?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  openNotes,
  activeNoteId,
  onUpdate,
  onSelectNote,
  onCloseNote,
  onShowIntro,
  onCloseIntro,
  showIntro,
  isLoading,
}) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // sync local state when switching notes
  useEffect(() => {
    if (note) {
      // only update content if we've switched to a different note
      // this prevents "reverting" when the server responds with a saved version
      // while we are still typing.
      setContent((prev) => {
        // if it's the first load (empty) or we switched notes, take the prop.
        // but we actually need to know if the ID changed.
        return note.content || "";
      });
      setTitle(note.title || "");
    } else {
      setContent("");
      setTitle("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note?.id]); // CRITICAL: only depend on ID, not the whole note object

  // debounce logic for CONTENT only
  useEffect(() => {
    if (!note) return;

    const timer = setTimeout(() => {
      const localContent = content || "";
      const remoteContent = note.content || "";

      if (localContent !== remoteContent) {
        onUpdate(note.id, { content: localContent });
      }
    }, 2500); // increased to 2.5s to reduce network load

    return () => clearTimeout(timer);
  }, [content, note, onUpdate]);

  const handleTitleCommit = () => {
    if (note && title !== note.title) {
      onUpdate(note.id, { title });
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur(); // trigger onBlur to save
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#09090b] text-white h-full relative">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex shrink-0">
        {/* Left Side: Logo (20%) */}
        <div className="w-1/5 flex items-center justify-between px-4 border-r border-white/5 relative group/header">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
          <button
            onClick={onShowIntro}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-500 hover:text-white transition-colors relative z-10"
            title="Info & Patch Notes"
          >
            <Info size={16} />
          </button>
        </div>

        {/* Right Side: Tabs */}
        <div className="flex-1 flex items-center overflow-hidden px-2 gap-1 bg-black/20">
          {openNotes.map((n) => (
            <div
              key={n.id}
              onClick={() => onSelectNote(n.id)}
              className={clsx(
                "group flex items-center gap-2 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-all border border-transparent flex-1 min-w-0 max-w-[200px]",
                activeNoteId === n.id
                  ? "bg-[#09090b] border-white/10 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5",
              )}
            >
              <span className="truncate flex-1 font-medium">
                {n.title || "Untitled"}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseNote(n.id);
                }}
                className={clsx(
                  "p-0.5 rounded-full hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0",
                  activeNoteId === n.id && "opacity-100",
                )}
              >
                <X size={12} />
              </button>
              {activeNoteId === n.id && isLoading && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse ml-1 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {showIntro ? (
        <div className="flex-1 overflow-hidden relative">
          <IntroductionView onClose={onCloseIntro} />
        </div>
      ) : !note ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 flex-col gap-2">
          <p>~whats on your mind?</p>
        </div>
      ) : (
        <>
          <div className="border-white/5 p-4 flex items-center justify-between gap-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleCommit}
              onKeyDown={handleTitleKeyDown}
              className="bg-transparent text-xl font-bold focus:outline-none flex-1 min-w-0 placeholder-white/20"
              placeholder="Note Title"
            />
            <div className="text-xs text-gray-500 flex items-center gap-2 font-mono shrink-0 whitespace-nowrap">
              {note.updated_at && (
                <span className="flex items-center gap-1.5">
                  <Pen size={10} />
                  {new Date(note.updated_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
          <textarea
            className="flex-1 w-full bg-[#09090b] p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed custom-scroll selection:bg-blue-500/30"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="~~what's on your mind von?..."
            spellCheck={false}
          />
          <div className="h-8 border-t border-white/5 flex items-center justify-end px-4 text-[10px] text-gray-600 font-mono gap-4 select-none">
            <span>
              {content.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <span>{content.length} chars</span>
          </div>
        </>
      )}
    </div>
  );
};
