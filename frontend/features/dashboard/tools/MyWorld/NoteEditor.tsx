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

  // Debounce logic
  useEffect(() => {
    if (!note) return;

    const timer = setTimeout(() => {
      if (content !== note.content || title !== note.title) {
        onUpdate(note.id, { content, title });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, title, note, onUpdate]);

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-[#09090b]">
        <p>Select a note to start writing</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#09090b] text-white">
      <div className="border-b border-white/5 p-4 flex items-center justify-between">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent text-xl font-bold focus:outline-none w-full"
          placeholder="Note Title"
        />
        <div className="text-xs text-gray-500 flex items-center gap-2">
          {isLoading && <span className="animate-pulse">Saving...</span>}
        </div>
      </div>
      <textarea
        className="flex-1 w-full bg-[#09090b] p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
      />
    </div>
  );
};
