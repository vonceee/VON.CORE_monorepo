import React, { useState } from "react";
import { useMyWorld } from "./hooks/useMyWorld";
import { NoteFolder, Note } from "./types";
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  FolderPlus,
  FilePlus,
} from "lucide-react";

interface FolderItemProps {
  folder: NoteFolder;
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateFolder: (name: string, parentId: string | null) => void;
  onCreateNote: (title: string, folderId: string | null) => void;
  onDeleteItem: (id: string, type: "note" | "folder") => void;
  depth: number;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  activeNoteId,
  onSelectNote,
  onCreateFolder,
  onCreateNote,
  onDeleteItem,
  depth,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const paddingLeft = `${depth * 12 + 12}px`;

  return (
    <div>
      <div
        className="group flex items-center gap-1 py-1 px-2 hover:bg-white/5 cursor-pointer text-gray-400 hover:text-gray-200 select-none"
        style={{ paddingLeft }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-0.5 hover:bg-white/10 rounded"
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <Folder size={14} className="text-blue-500" />
        <span className="text-sm truncate flex-1">{folder.name}</span>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCreateNote("New Note", folder.id);
              setIsOpen(true);
            }}
            title="New Note"
          >
            <FilePlus size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCreateFolder("New Folder", folder.id);
              setIsOpen(true);
            }}
            title="New Folder"
          >
            <FolderPlus size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteItem(folder.id, "folder");
            }}
            title="Delete Folder"
            className="text-red-500 hover:text-red-400"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div>
          {folder.children.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              activeNoteId={activeNoteId}
              onSelectNote={onSelectNote}
              onCreateFolder={onCreateFolder}
              onCreateNote={onCreateNote}
              onDeleteItem={onDeleteItem}
              depth={depth + 1}
            />
          ))}
          {folder.notes.map((note) => (
            <div
              key={note.id}
              className={`flex items-center gap-2 py-1 px-2 cursor-pointer group hover:bg-white/5 ${
                activeNoteId === note.id
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-gray-400"
              }`}
              style={{ paddingLeft: `${(depth + 1) * 12 + 12}px` }}
              onClick={() => onSelectNote(note.id)}
            >
              <FileText size={14} />
              <span className="text-sm truncate flex-1">{note.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(note.id, "note");
                }}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
          {folder.children.length === 0 && folder.notes.length === 0 && (
            <div
              className="text-[10px] text-gray-600 py-1"
              style={{ paddingLeft: `${(depth + 1) * 12 + 12}px` }}
            >
              Empty
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const MyWorldSidebar: React.FC = () => {
  const {
    tree,
    activeNoteId,
    setActiveNoteId,
    createFolder,
    createNote,
    deleteItem,
  } = useMyWorld();

  return (
    <div className="h-full bg-black border-r border-white/5 flex flex-col w-full">
      <div className="p-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex gap-1">
          <button
            onClick={() => createNote("New Note", null)}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
            title="New Note"
          >
            <FilePlus size={14} />
          </button>
          <button
            onClick={() => createFolder("New Folder", null)}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
            title="New Folder"
          >
            <FolderPlus size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scroll">
        {tree.folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            activeNoteId={activeNoteId}
            onSelectNote={setActiveNoteId}
            onCreateFolder={createFolder}
            onCreateNote={createNote}
            onDeleteItem={deleteItem}
            depth={0}
          />
        ))}
        {tree.rootNotes.map((note) => (
          <div
            key={note.id}
            className={`flex items-center gap-2 py-1 px-4 cursor-pointer group hover:bg-white/5 ${
              activeNoteId === note.id
                ? "bg-blue-500/10 text-blue-400"
                : "text-gray-400"
            }`}
            onClick={() => setActiveNoteId(note.id)}
          >
            <FileText size={14} />
            <span className="text-sm truncate flex-1">{note.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(note.id, "note");
              }}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
