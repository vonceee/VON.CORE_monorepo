import React, { useState } from "react";
import { useMyWorld } from "./hooks/useMyWorld";
import { NoteEditor } from "./NoteEditor";

const MyWorld: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);
  const {
    activeNote,
    updateNote,
    isLoading,
    openNotes,
    activeNoteId,
    setActiveNoteId,
    closeNote,
  } = useMyWorld();

  return (
    <div className="flex h-full w-full bg-[#09090b]">
      {/* Sidebar is now rendered in PrimarySidebar via toolRegistry */}
      <NoteEditor
        note={activeNote}
        openNotes={openNotes}
        activeNoteId={activeNoteId}
        onUpdate={updateNote}
        onSelectNote={setActiveNoteId}
        onCloseNote={closeNote}
        onShowIntro={() => setShowIntro(true)}
        onCloseIntro={() => setShowIntro(false)}
        showIntro={showIntro}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MyWorld;
