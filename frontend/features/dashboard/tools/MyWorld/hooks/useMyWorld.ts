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
    const tempId = `temp-${Date.now()}`;
    const tempFolder: NoteFolder = {
      id: tempId,
      name,
      parent_id: parentId,
      icon: "Folder",
      children: [],
      notes: [],
      isOptimistic: true,
    };

    // Optimistic Update
    try {
      if (!parentId) {
        globalTree = {
          ...globalTree,
          folders: [...globalTree.folders, tempFolder],
        };
      } else {
        const updateInFolder = (folders: NoteFolder[]): NoteFolder[] => {
          return folders.map((f) => {
            if (f.id === parentId) {
              return { ...f, children: [...f.children, tempFolder] };
            }
            return { ...f, children: updateInFolder(f.children) };
          });
        };
        globalTree = {
          ...globalTree,
          folders: updateInFolder(globalTree.folders),
        };
      }
      notifyListeners();

      // API Call
      const newFolder = await noteApi.createFolder({
        name,
        parent_id: parentId,
      });

      // Replace Optimistic Item with Real Item
      const replaceInFolder = (folders: NoteFolder[]): NoteFolder[] => {
        return folders.map((f) => {
          // Exact match or recursive
          if (f.id === tempId) return { ...newFolder, children: [], notes: [] };

          // Handle children replacement
          const updatedChildren = replaceInFolder(f.children);
          // Handle root folder replacement if needed (though map covers it)
          // Wait, if we added it to children, we need to find the parent again?
          // No, we are iterating the WHOLE tree again to find and replace.
          return { ...f, children: updatedChildren };
        });
      };

      // We need to replace it wherever it is.
      // Top level
      if (!parentId) {
        globalTree = {
          ...globalTree,
          folders: globalTree.folders.map((f) =>
            f.id === tempId
              ? { ...newFolder, children: [], notes: [] }
              : replaceInFolder([f])[0]
          ),
        };
      } else {
        // It's deep in the tree.
        globalTree = {
          ...globalTree,
          folders: replaceInFolder(globalTree.folders),
        };
      }

      notifyListeners();
    } catch (e) {
      console.error("Failed to create folder", e);
      // Revert optimistic update
      // Simple way: just remove the temp ID
      const removeFromFolder = (folders: NoteFolder[]): NoteFolder[] => {
        return folders
          .filter((f) => f.id !== tempId)
          .map((f) => ({
            ...f,
            children: removeFromFolder(f.children),
          }));
      };
      globalTree = {
        ...globalTree,
        folders: removeFromFolder(globalTree.folders),
      };
      notifyListeners();
    }
  };

  const createNote = async (title: string, folderId: string | null = null) => {
    const tempId = `temp-${Date.now()}`;
    const tempNote: Note = {
      id: tempId,
      title,
      folder_id: folderId,
      content: "",
      tags: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      isOptimistic: true,
    };

    try {
      // Optimistic Insert
      if (!folderId) {
        globalTree = {
          ...globalTree,
          rootNotes: [...globalTree.rootNotes, tempNote],
        };
      } else {
        const updateInFolder = (folders: NoteFolder[]): NoteFolder[] => {
          return folders.map((f) => {
            if (f.id === folderId) {
              return { ...f, notes: [...f.notes, tempNote] };
            }
            return { ...f, children: updateInFolder(f.children) };
          });
        };
        globalTree = {
          ...globalTree,
          folders: updateInFolder(globalTree.folders),
        };
      }
      globalActiveNoteId = tempId;
      notifyListeners();

      // API Call
      const newNote = await noteApi.createNote({
        title,
        folder_id: folderId,
        content: "",
      });

      // Replace Optimistic Note
      // If we are still looking at the temp note, switch to the real one
      if (globalActiveNoteId === tempId) {
        globalActiveNoteId = newNote.id;
      }

      const replaceNote = (notes: Note[]) =>
        notes.map((n) => (n.id === tempId ? newNote : n));
      const replaceInFolder = (folders: NoteFolder[]): NoteFolder[] => {
        return folders.map((f) => ({
          ...f,
          notes: replaceNote(f.notes),
          children: replaceInFolder(f.children),
        }));
      };

      globalTree = {
        ...globalTree,
        rootNotes: replaceNote(globalTree.rootNotes),
        folders: replaceInFolder(globalTree.folders),
      };

      notifyListeners();
    } catch (e) {
      console.error("Failed to create note", e);
      // Revert
      if (globalActiveNoteId === tempId) globalActiveNoteId = null;

      const removeNote = (notes: Note[]) =>
        notes.filter((n) => n.id !== tempId);
      const removeFromFolder = (folders: NoteFolder[]): NoteFolder[] => {
        return folders.map((f) => ({
          ...f,
          notes: removeNote(f.notes),
          children: removeFromFolder(f.children),
        }));
      };

      globalTree = {
        ...globalTree,
        rootNotes: removeNote(globalTree.rootNotes),
        folders: removeFromFolder(globalTree.folders),
      };

      notifyListeners();
    }
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      if (id.startsWith("temp-")) return; // Don't update optimistic notes yet

      await noteApi.updateNote(id, updates);
      if (updates.title || updates.folder_id) {
        fetchData();
      }

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
    if (id.startsWith("temp-")) return;

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
