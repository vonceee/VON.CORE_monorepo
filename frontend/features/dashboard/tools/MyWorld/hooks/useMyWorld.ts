import { useState, useEffect, useCallback } from "react";
import { noteApi } from "../../../../../services/api/note";
import { Note, NoteFolder, NoteTree } from "../types";

// Singleton Store State
let globalTree: NoteTree = { folders: [], rootNotes: [] };
let globalActiveNoteId: string | null = null;
let globalIsLoading: boolean = true;
let listeners: Array<() => void> = [];

// Race condition tracking: Map<NoteId, LatestRequestTimestamp>
const updateTimestamps: Map<string, number> = new Map();

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
          if (f.id === tempId) return { ...newFolder, children: [], notes: [] };
          return { ...f, children: replaceInFolder(f.children) };
        });
      };

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
        globalTree = {
          ...globalTree,
          folders: replaceInFolder(globalTree.folders),
        };
      }

      notifyListeners();
    } catch (e) {
      console.error("Failed to create folder", e);
      // Revert optimistic update
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
    if (id.startsWith("temp-")) return;

    // Snapshot mechanism for rollback
    const previousTree = globalTree;
    const requestTimestamp = Date.now();
    updateTimestamps.set(id, requestTimestamp);

    try {
      // 1. Optimistic Local Update
      // Helper to remove note from anywhere in the tree
      const removeNoteFromTree = (
        tree: NoteTree,
        noteId: string
      ): { tree: NoteTree; removedNote: Note | null } => {
        let removedNote: Note | null = null;

        // Check root
        const rootIndex = tree.rootNotes.findIndex((n) => n.id === noteId);
        if (rootIndex !== -1) {
          removedNote = tree.rootNotes[rootIndex];
          return {
            tree: {
              ...tree,
              rootNotes: tree.rootNotes.filter((n) => n.id !== noteId),
            },
            removedNote,
          };
        }

        // Recursive helper for folders
        const removeFromFolders = (
          folders: NoteFolder[]
        ): { folders: NoteFolder[]; found: boolean } => {
          let foundInLevel = false;
          const newFolders = folders.map((f) => {
            if (foundInLevel) return f; // Already found in this level's siblings (unlikely but safe)

            // Check notes in this folder
            const noteIndex = f.notes.findIndex((n) => n.id === noteId);
            if (noteIndex !== -1) {
              removedNote = f.notes[noteIndex];
              foundInLevel = true; // Mark found to bubble up if needed
              return { ...f, notes: f.notes.filter((n) => n.id !== noteId) };
            }

            // check children
            const childResult = removeFromFolders(f.children);
            if (childResult.found) {
              // If found deeper, we just return the update, no note extraction here needed (already extracted)
              foundInLevel = true;
              return { ...f, children: childResult.folders };
            }
            return f;
          });
          return { folders: newFolders, found: foundInLevel };
        };

        const result = removeFromFolders(tree.folders);
        return {
          tree: { ...tree, folders: result.folders },
          removedNote,
        };
      };

      // Helper to add note to specific folder (or root)
      const addNoteToTree = (
        tree: NoteTree,
        note: Note,
        targetFolderId: string | null
      ): NoteTree => {
        if (!targetFolderId) {
          return { ...tree, rootNotes: [...tree.rootNotes, note] };
        }

        const addToFolders = (folders: NoteFolder[]): NoteFolder[] => {
          return folders.map((f) => {
            if (f.id === targetFolderId) {
              return { ...f, notes: [...f.notes, note] };
            }
            return { ...f, children: addToFolders(f.children) };
          });
        };
        return { ...tree, folders: addToFolders(tree.folders) };
      };

      // Helper to update note in place
      const updateInPlace = (tree: NoteTree): NoteTree => {
        const updateList = (notes: Note[]) =>
          notes.map((n) => (n.id === id ? { ...n, ...updates } : n));
        const updateFolders = (folders: NoteFolder[]): NoteFolder[] =>
          folders.map((f) => ({
            ...f,
            notes: updateList(f.notes),
            children: updateFolders(f.children),
          }));
        return {
          rootNotes: updateList(tree.rootNotes),
          folders: updateFolders(tree.folders),
        };
      };

      if (updates.folder_id !== undefined) {
        // Structural Move!
        // 1. Find and remove
        const { tree: prunedTree, removedNote } = removeNoteFromTree(
          globalTree,
          id
        );
        if (!removedNote) {
          console.warn("Could not find note to move", id);
          return; // Abort if note not found
        }

        // 2. Update note properties
        const updatedNote = { ...removedNote, ...updates };

        // 3. Add to new location
        globalTree = addNoteToTree(prunedTree, updatedNote, updates.folder_id);
      } else {
        // Surgical Update (Title/Content only)
        globalTree = updateInPlace(globalTree);
      }

      notifyListeners();

      // 2. Network Request
      const updatedNoteResponse = await noteApi.updateNote(id, updates);

      // 3. Race Condition Check
      const latestTimestamp = updateTimestamps.get(id);
      if (latestTimestamp && latestTimestamp > requestTimestamp) {
        // A newer request has started/finished. Do not overwrite with this stale/intermediate state.
        // We trust the optimistic update of the newer request.
        return;
      }

      // 4. Server Reconciliation (Merge)
      // We apply the server response to ensure things like sanitized titles are correct.
      // We must treat this like an "update" again to be safe, but we know the folder_id is consistent now.

      const serverMerge = (tree: NoteTree): NoteTree => {
        const updateList = (notes: Note[]) =>
          notes.map((n) => (n.id === id ? updatedNoteResponse : n));
        const updateFolders = (folders: NoteFolder[]): NoteFolder[] =>
          folders.map((f) => ({
            ...f,
            notes: updateList(f.notes),
            children: updateFolders(f.children),
          }));

        return {
          rootNotes: updateList(tree.rootNotes),
          folders: updateFolders(tree.folders),
        };
      };

      globalTree = serverMerge(globalTree);
      notifyListeners();
    } catch (e) {
      console.error("Failed to update note", e);
      // Rollback
      globalTree = previousTree;
      notifyListeners();
    }
  };

  const deleteItem = async (id: string, type: "note" | "folder") => {
    if (id.startsWith("temp-")) return;

    // Snapshot
    const previousTree = globalTree;

    try {
      // Optimistic Delete
      if (type === "note") {
        // Helper similar to updateNote's remove
        // Simplified for brevity since we largely duplicate logic
        const removeNote = (notes: Note[]) => notes.filter((n) => n.id !== id);
        const removeInFolders = (folders: NoteFolder[]): NoteFolder[] =>
          folders.map((f) => ({
            ...f,
            notes: removeNote(f.notes),
            children: removeInFolders(f.children),
          }));
        globalTree = {
          rootNotes: removeNote(globalTree.rootNotes),
          folders: removeInFolders(globalTree.folders),
        };
      } else {
        // Folder delete
        const removeFolder = (folders: NoteFolder[]): NoteFolder[] => {
          return folders
            .filter((f) => f.id !== id)
            .map((f) => ({
              ...f,
              children: removeFolder(f.children),
            }));
        };
        globalTree = {
          ...globalTree,
          folders: removeFolder(globalTree.folders),
        };
      }

      if (globalActiveNoteId === id) {
        globalActiveNoteId = null;
      }
      notifyListeners();

      if (type === "note") {
        await noteApi.deleteNote(id);
      } else {
        await noteApi.deleteFolder(id);
      }
      // No re-fetch needed if successful
    } catch (e) {
      console.error("Failed to delete item", e);
      // Rollback
      globalTree = previousTree;
      notifyListeners();
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
