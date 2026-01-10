import React, { useState, useEffect } from "react";
import { Note } from "./types";
import { Save } from "lucide-react";

interface NoteEditorProps {
  note: Note | null;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  isLoading?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  onUpdate,
  isLoading,
}) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (note) {
      setContent(note.content || "");
      setTitle(note.title || "");
    } else {
      setContent("");
      setTitle("");
    }
  }, [note]);

  // Debounce logic for CONTENT only
  useEffect(() => {
    if (!note) return;

    const timer = setTimeout(() => {
      const localContent = content || "";
      const remoteContent = note.content || "";

      if (localContent !== remoteContent) {
        onUpdate(note.id, { content: localContent });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, note, onUpdate]);

  const handleTitleCommit = () => {
    if (note && title !== note.title) {
      onUpdate(note.id, { title });
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur(); // Trigger onBlur to save
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#09090b] text-white h-full">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center px-4 shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="assets/logo/myworld_logo.svg"
            style={{ filter: "invert(1)", width: "120px" }}
            alt=""
          />
        </div>
      </div>

      {!note ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>Select a note to start writing</p>
        </div>
      ) : (
        <>
          <div className="border-b border-white/5 p-4 flex items-center justify-between">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleCommit}
              onKeyDown={handleTitleKeyDown}
              className="bg-transparent text-xl font-bold focus:outline-none w-full"
              placeholder="Note Title"
            />
            <div className="text-xs text-gray-500 flex items-center gap-2">
              {isLoading && <span className="animate-pulse">Saving...</span>}
            </div>
          </div>
          <textarea
            className="flex-1 w-full bg-[#09090b] p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed custom-scroll"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
          />
        </>
      )}
    </div>
  );
};
