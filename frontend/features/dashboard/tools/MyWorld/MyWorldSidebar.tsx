import React, { useRef, useState } from "react";
import { useMyWorld } from "./hooks/useMyWorld";
import { NoteFolder, Note } from "./types";
import {
  NotebookText,
  FileText,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  FolderPlus,
  SquarePen,
  Star,
} from "lucide-react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragStartEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";

// --- Draggable Note Component ---
interface NoteItemProps {
  note: Note;
  activeNoteId: string | null;
  selectedNoteIds: string[];
  onSelect: (id: string, multi: boolean, range: boolean) => void;
  onDeleteItem: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  depth: number;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
  activeNoteId,
  selectedNoteIds,
  onSelect,
  onDeleteItem,
  onToggleFavorite,
  depth,
}) => {
  const isSelected = selectedNoteIds.includes(note.id);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: note.id,
      data: { type: "note", note },
    });

  const style = {
    paddingLeft: `${depth * 12 + 12}px`,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-2 py-1 px-2 cursor-pointer group select-none ${
        activeNoteId === note.id || isSelected
          ? "bg-blue-500/20 text-blue-300"
          : "text-gray-400 hover:bg-white/5"
      } ${note.isOptimistic ? "opacity-50 pointer-events-none" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(note.id, e.ctrlKey || e.metaKey, e.shiftKey);
      }}
    >
      <NotebookText size={12} className={isSelected ? "text-blue-400" : ""} />
      <span className="text-sm truncate flex-1">{note.title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(note.id);
        }}
        className={`p-1 rounded hover:bg-white/10 ${
          note.is_favorite
            ? "text-yellow-500 opacity-100"
            : "text-gray-400 opacity-0 group-hover:opacity-100 hover:text-white"
        }`}
      >
        <Star size={12} fill={note.is_favorite ? "currentColor" : "none"} />
      </button>
      {!note.isOptimistic && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteItem(note.id);
          }}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400"
        >
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
};

// --- Droppable Folder Component ---
interface FolderItemProps {
  folder: NoteFolder;
  activeNoteId: string | null;
  selectedNoteIds: string[];
  selectedFolderId: string | null;
  expandedFolderIds: string[];
  onToggleFolder: (id: string) => void;
  onSelectNote: (id: string, multi: boolean, range: boolean) => void;
  onSelectFolder: (id: string) => void;
  onCreateFolder: (name: string, parentId: string | null) => void;
  onCreateNote: (title: string, folderId: string | null) => void;
  onRenameFolder: (id: string, newName: string) => void;
  onDeleteItem: (id: string, type: "note" | "folder") => void;
  onToggleFavorite: (id: string, type: "note" | "folder") => void;
  depth: number;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  activeNoteId,
  selectedNoteIds,
  selectedFolderId,
  expandedFolderIds,
  onToggleFolder,
  onSelectNote,
  onSelectFolder,
  onCreateFolder,
  onCreateNote,
  onRenameFolder,
  onDeleteItem,
  onToggleFavorite,
  depth,
}) => {
  const isOpen = expandedFolderIds.includes(folder.id);
  const isSelected = selectedFolderId === folder.id;
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(folder.name);

  const { setNodeRef, isOver } = useDroppable({
    id: folder.id,
    data: { type: "folder", folder },
  });

  const paddingLeft = `${depth * 12 + 12}px`;

  const handleRenameSubmit = () => {
    if (renameValue.trim() && renameValue !== folder.name) {
      onRenameFolder(folder.id, renameValue);
    } else {
      setRenameValue(folder.name);
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRenameSubmit();
    if (e.key === "Escape") {
      setRenameValue(folder.name);
      setIsRenaming(false);
    }
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        className={`group flex items-center gap-1 py-1 px-2 cursor-pointer text-gray-400 select-none transition-colors ${
          folder.isOptimistic ? "opacity-50 pointer-events-none" : ""
        } ${isOver ? "bg-blue-500/20 ring-1 ring-blue-500/50" : ""} ${
          isSelected ? "bg-white/10 text-white" : "hover:bg-white/5"
        }`}
        style={{ paddingLeft }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isRenaming) {
            onSelectFolder(folder.id);
            onToggleFolder(folder.id);
          }
        }}
      >
        <button
          className="p-0.5 hover:bg-white/10 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFolder(folder.id);
          }}
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        {isRenaming ? (
          <input
            autoFocus
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-black text-white text-sm border border-blue-500/50 rounded px-1 min-w-0 focus:outline-none"
          />
        ) : (
          <span
            className={`text-sm truncate flex-1 ${
              isOver ? "text-blue-200" : ""
            }`}
            onDoubleClick={(e) => {
              e.stopPropagation();
              setIsRenaming(true);
            }}
          >
            {folder.name}
          </span>
        )}

        {!folder.isOptimistic && !isRenaming && (
          <div className="flex gap-1 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(folder.id, "folder");
              }}
              className={`p-1 rounded hover:bg-white/10 ${
                folder.is_favorite
                  ? "text-yellow-500 opacity-100"
                  : "text-gray-400 opacity-0 group-hover:opacity-100 hover:text-white"
              }`}
            >
              <Star
                size={12}
                fill={folder.is_favorite ? "currentColor" : "none"}
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(folder.id, "folder");
              }}
              title="Delete Folder"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-400"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div>
          {folder.children.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              activeNoteId={activeNoteId}
              selectedNoteIds={selectedNoteIds}
              selectedFolderId={selectedFolderId}
              expandedFolderIds={expandedFolderIds}
              onToggleFolder={onToggleFolder}
              onSelectNote={onSelectNote}
              onSelectFolder={onSelectFolder}
              onCreateFolder={onCreateFolder}
              onCreateNote={onCreateNote}
              onRenameFolder={onRenameFolder}
              onDeleteItem={onDeleteItem}
              onToggleFavorite={onToggleFavorite}
              depth={depth + 1}
            />
          ))}
          {folder.notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              activeNoteId={activeNoteId}
              selectedNoteIds={selectedNoteIds}
              onSelect={onSelectNote}
              onDeleteItem={(id) => onDeleteItem(id, "note")}
              onToggleFavorite={(id) => onToggleFavorite(id, "note")}
              depth={depth + 1}
            />
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
    selectedNoteIds,
    setSelectedNoteIds,
    selectedFolderId,
    setSelectedFolderId,
    expandedFolderIds,
    toggleFolder,
    getVisibleNoteIds,
    moveNotes,
    renameFolder,
    toggleFavorite,
  } = useMyWorld();

  const lastClickedId = useRef<string | null>(null);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // Handle Note Selection
  const handleSelectNote = (id: string, multi: boolean, range: boolean) => {
    setActiveNoteId(id);

    // logic for range/multi selection as before
    // this implicitly clears folder selection via the hook's setSelectedNoteIds
    if (range && lastClickedId.current) {
      const visibleIds = getVisibleNoteIds();
      const startIdx = visibleIds.indexOf(lastClickedId.current);
      const endIdx = visibleIds.indexOf(id);

      if (startIdx !== -1 && endIdx !== -1) {
        const min = Math.min(startIdx, endIdx);
        const max = Math.max(startIdx, endIdx);
        const rangeIds = visibleIds.slice(min, max + 1);
        if (multi) {
          const newSet = new Set([...selectedNoteIds, ...rangeIds]);
          setSelectedNoteIds(Array.from(newSet));
        } else {
          setSelectedNoteIds(rangeIds);
        }
      } else {
        setSelectedNoteIds([id]);
      }
    } else if (multi) {
      if (selectedNoteIds.includes(id)) {
        setSelectedNoteIds(selectedNoteIds.filter((nid) => nid !== id));
      } else {
        setSelectedNoteIds([...selectedNoteIds, id]);
      }
      lastClickedId.current = id;
    } else {
      setSelectedNoteIds([id]);
      lastClickedId.current = id;
    }
  };

  // Handle Folder Selection
  const handleSelectFolder = (id: string) => {
    setSelectedFolderId(id);
    // hook clears note selection
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const sourceId = active.id as string;
    const targetFolderId = over.id as string;
    const activeData = active.data.current as { type?: string } | undefined;
    const overData = over.data.current as { type?: string } | undefined;

    if (activeData?.type === "note" && overData?.type === "folder") {
      const isDraggedNoteSelected = selectedNoteIds.includes(sourceId);
      const idsToMove = isDraggedNoteSelected ? selectedNoteIds : [sourceId];
      moveNotes(idsToMove, targetFolderId);
    }
  };

  const [activeDragItem, setActiveDragItem] = useState<Note | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current as { note?: Note };
    if (data?.note) {
      setActiveDragItem(data.note);
    }
  };

  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    type: "note" | "folder";
    title?: string;
  } | null>(null);

  const requestDelete = (id: string, type: "note" | "folder") => {
    let title = "Item";
    if (type === "note") {
      const findNote = (
        notes: Note[],
        folders: NoteFolder[],
      ): string | undefined => {
        const n = notes.find((n) => n.id === id);
        if (n) return n.title;
        for (const f of folders) {
          const found = findNote(f.notes, f.children);
          if (found) return found;
        }
        return undefined;
      };
      title = findNote(tree.rootNotes, tree.folders) || "Note";
    } else {
      const findFolder = (folders: NoteFolder[]): string | undefined => {
        const f = folders.find((f) => f.id === id);
        if (f) return f.name;
        for (const child of folders) {
          const found = findFolder(child.children);
          if (found) return found;
        }
        return undefined;
      };
      title = findFolder(tree.folders) || "Folder";
    }
    setItemToDelete({ id, type, title });
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id, itemToDelete.type);
      setItemToDelete(null);
    }
  };

  const activeParentId = selectedFolderId;

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="h-full bg-black border-r border-white/5 flex flex-col w-full relative">
        <div className="p-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <button
              onClick={() => createNote("New Note", activeParentId)}
              className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
              title={activeParentId ? "New Note in Selection" : "New Note"}
            >
              <SquarePen size={14} />
            </button>
            <button
              onClick={() => createFolder("New Folder", activeParentId)}
              className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
              title={activeParentId ? "New Folder in Selection" : "New Folder"}
            >
              <FolderPlus size={14} />
            </button>
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto custom-scroll"
          onClick={() => {
            // Clicking empty space deselects folder
            setSelectedFolderId(null);
            // And notes? Maybe. Usually yes.
            setSelectedNoteIds([]);
          }}
        >
          {tree.folders.map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              activeNoteId={activeNoteId}
              selectedNoteIds={selectedNoteIds}
              selectedFolderId={selectedFolderId}
              expandedFolderIds={expandedFolderIds}
              onToggleFolder={toggleFolder}
              onSelectNote={handleSelectNote}
              onSelectFolder={handleSelectFolder}
              onCreateFolder={createFolder}
              onCreateNote={createNote}
              onRenameFolder={renameFolder}
              onDeleteItem={requestDelete}
              onToggleFavorite={toggleFavorite}
              depth={0}
            />
          ))}
          {tree.rootNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              activeNoteId={activeNoteId}
              selectedNoteIds={selectedNoteIds}
              onSelect={handleSelectNote}
              onDeleteItem={(id) => requestDelete(id, "note")}
              onToggleFavorite={(id) => toggleFavorite(id, "note")}
              depth={0}
            />
          ))}
        </div>

        {/* Confirmation Modal Overlay */}
        {itemToDelete && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[1px]">
            <div className="bg-[#09090b] border border-white/10 rounded-lg shadow-2xl w-full max-w-[280px] p-4 flex flex-col gap-3 animation-fade-in">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Trash2 size={14} className="text-red-500" />
                  Confirm Deletion
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to delete{" "}
                  <span className="text-gray-200">"{itemToDelete.title}"</span>?
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-2 justify-end mt-1">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="px-3 py-1.5 rounded text-xs text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-3 py-1.5 rounded text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <DragOverlay>
        {activeDragItem ? (
          <div className="bg-zinc-800 text-white p-2 rounded shadow-lg flex items-center gap-2 opacity-90 w-48 border border-white/10">
            <FileText size={14} />
            <span className="text-sm truncate">{activeDragItem.title}</span>
            {selectedNoteIds.length > 1 &&
              selectedNoteIds.includes(activeDragItem.id) && (
                <span className="text-xs bg-blue-500 px-1 rounded-full">
                  {selectedNoteIds.length}
                </span>
              )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
