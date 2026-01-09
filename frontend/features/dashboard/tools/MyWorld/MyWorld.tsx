import React from "react";
import { useMyWorld } from "./hooks/useMyWorld";
import { NoteEditor } from "./NoteEditor";

const MyWorld: React.FC = () => {
  const { activeNote, updateNote, isLoading } = useMyWorld();

  return (
    <div className="flex h-full w-full bg-[#09090b]">
      {/* Sidebar is now rendered in PrimarySidebar via toolRegistry */}
      <NoteEditor
        note={activeNote}
        onUpdate={updateNote}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MyWorld;
