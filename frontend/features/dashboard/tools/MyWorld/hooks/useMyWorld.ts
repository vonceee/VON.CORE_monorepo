import { useState, useEffect, useCallback } from "react";
import { noteApi } from "../../../../../services/api/note";
import { Note, NoteFolder, NoteTree } from "../types";

// Singleton Store State
let globalTree: NoteTree = { folders: [], rootNotes: [] };
let globalActiveNoteId: string | null = null;
let globalIsLoading: boolean = true;
let listeners: Array<() => void> = [];

const notifyListeners = () => {
  listeners.forEach((l) => l());
};

const fetchData = async () => {
  try {
    globalIsLoading = true;
    notifyListeners();
    const data = await noteApi.fetchTree();
    globalTree = data;
  } catch (e) {
    console.error("Failed to fetch MyWorld data", e);
  } finally {
    globalIsLoading = false;
    notifyListeners();
  }
};

// Initial fetch
fetchData();

export const useMyWorld = () => {
  // Local state to trigger re-renders
  const [_, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const createFolder = async (name: string, parentId: string | null = null) => {
    try {
      await noteApi.createFolder({ name, parent_id: parentId });
      fetchData();
    } catch (e) {
      console.error("Failed to create folder", e);
    }
  };

  const createNote = async (title: string, folderId: string | null = null) => {
    try {
      const newNote = await noteApi.createNote({
        title,
        folder_id: folderId,
        content: "",
      });
      await fetchData();
      globalActiveNoteId = newNote.id;
      notifyListeners();
    } catch (e) {
      console.error("Failed to create note", e);
    }
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      await noteApi.updateNote(id, updates);
      if (updates.title || updates.folder_id) {
        fetchData();
      }

      // If content updated, we might need to update the local tree copy if we want search/previews to reflect it immediately
      // But for now, we rely on tree structure updates.
      // If active note is updated, we might need to update the tree's copy of it?
      // Since `tree` contains everything, `findNote` will return the *old* content if we don't update `globalTree`.
      // Let's implement a shallow update on globalTree for responsiveness.

      if (updates.content !== undefined || updates.title !== undefined) {
        // Recursive update helper
        const updateInTree = (notes: Note[]): Note[] => {
          return notes.map((n) => (n.id === id ? { ...n, ...updates } : n));
        };
        const updateInFolder = (folders: NoteFolder[]): NoteFolder[] => {
          return folders.map((f) => ({
            ...f,
            notes: updateInTree(f.notes),
            children: updateInFolder(f.children),
          }));
        };

        globalTree = {
          ...globalTree,
          rootNotes: updateInTree(globalTree.rootNotes),
          folders: updateInFolder(globalTree.folders),
        };
        notifyListeners();
      }
    } catch (e) {
      console.error("Failed to update note", e);
    }
  };

  const deleteItem = async (id: string, type: "note" | "folder") => {
    try {
      if (type === "note") {
        await noteApi.deleteNote(id);
      } else {
        await noteApi.deleteFolder(id);
      }
      if (globalActiveNoteId === id) {
        globalActiveNoteId = null;
      }
      fetchData();
    } catch (e) {
      console.error("Failed to delete item", e);
    }
  };

  const setActiveNoteId = (id: string | null) => {
    globalActiveNoteId = id;
    notifyListeners();
  };

  // Helper to find note by ID in tree (recursive)
  const findNote = (
    id: string,
    folders: NoteFolder[],
    rootNotes: Note[]
  ): Note | null => {
    const note = rootNotes.find((n) => n.id === id);
    if (note) return note;

    for (const folder of folders) {
      const found = findNote(id, folder.children, folder.notes);
      if (found) return found;
    }
    return null;
  };

  const activeNote = globalActiveNoteId
    ? findNote(globalActiveNoteId, globalTree.folders, globalTree.rootNotes)
    : null;

  return {
    tree: globalTree,
    activeNote,
    activeNoteId: globalActiveNoteId,
    setActiveNoteId,
    createFolder,
    createNote,
    updateNote,
    deleteItem,
    refresh: fetchData,
    isLoading: globalIsLoading,
  };
};
