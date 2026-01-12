import { useState, useEffect, useCallback } from "react";
import { noteApi } from "../../../../../services/api/note";
import { Note, NoteFolder, NoteTree } from "../types";

// Singleton Store State
let globalTree: NoteTree = { folders: [], rootNotes: [] };
let globalActiveNoteId: string | null = null;
let globalOpenNoteIds: string[] = []; // Track open tabs
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
      setActiveNoteId(tempId); // This will also add to open tabs
      notifyListeners();

      // API Call
      const newNote = await noteApi.createNote({
        title,
        folder_id: folderId,
        content: "",
      });

      // Replace Optimistic Note
      // Note: setActiveNoteId handles the tempId to realId switch for active note?
      // Actually we need to update openNoteIds if the ID changes

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

      // Update Open Tabs IDs
      globalOpenNoteIds = globalOpenNoteIds.map((id) =>
        id === tempId ? newNote.id : id
      );
      if (globalActiveNoteId === tempId) {
        globalActiveNoteId = newNote.id;
      }

      notifyListeners();
    } catch (e) {
      console.error("Failed to create note", e);
      if (globalActiveNoteId === tempId) globalActiveNoteId = null;
      globalOpenNoteIds = globalOpenNoteIds.filter((id) => id !== tempId);

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

    // Helper for surgical updates (replaces ad-hoc update code)
    const applySurgicalUpdate = (
      targetId: string,
      noteUpdates: Partial<Note>
    ) => {
      const updateInNotes = (notes: Note[]) =>
        notes.map((n) => (n.id === targetId ? { ...n, ...noteUpdates } : n));

      const updateInFolders = (folders: NoteFolder[]): NoteFolder[] =>
        folders.map((f) => ({
          ...f,
          notes: updateInNotes(f.notes),
          children: updateInFolders(f.children),
        }));

      globalTree = {
        ...globalTree,
        rootNotes: updateInNotes(globalTree.rootNotes),
        folders: updateInFolders(globalTree.folders),
      };
    };

    try {
      // 1. Optimistic Local Update
      // Handle structural moves separately if needed, but for content/title we use surgical update
      if (updates.folder_id !== undefined) {
        // Re-use existing move logic if it exists elsewhere or implement clean move
        // For now retaining the existing move logic structure but simplifying where possible
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
              if (foundInLevel) return f;
              const noteIndex = f.notes.findIndex((n) => n.id === noteId);
              if (noteIndex !== -1) {
                removedNote = f.notes[noteIndex];
                foundInLevel = true;
                return { ...f, notes: f.notes.filter((n) => n.id !== noteId) };
              }
              const childResult = removeFromFolders(f.children);
              if (childResult.found) {
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

        const { tree: prunedTree, removedNote } = removeNoteFromTree(
          globalTree,
          id
        );

        if (removedNote) {
          const updatedNote = { ...removedNote, ...updates };
          globalTree = addNoteToTree(
            prunedTree,
            updatedNote,
            updates.folder_id
          );
        }
      } else {
        // Surgical Update (Title/Content only)
        applySurgicalUpdate(id, updates);
      }

      notifyListeners();

      // 2. Network Request
      const updatedNoteResponse = await noteApi.updateNote(id, updates);

      // 3. Race Condition Check
      const latestTimestamp = updateTimestamps.get(id);
      if (latestTimestamp && latestTimestamp > requestTimestamp) {
        return;
      }

      // 4. Server Reconciliation (Merge)
      // Apply the exact server response using the surgical helper
      // This ensures we have the canonical state (e.g. sanitized title)
      applySurgicalUpdate(id, updatedNoteResponse);

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
        // Remove from open tabs
        globalOpenNoteIds = globalOpenNoteIds.filter((nid) => nid !== id);
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
        // TODO: Could trigger clearing tabs if notes were inside, but simple enough for now
      }

      if (globalActiveNoteId === id) {
        // Switch to another tab if available
        if (globalOpenNoteIds.length > 0) {
          globalActiveNoteId = globalOpenNoteIds[globalOpenNoteIds.length - 1];
        } else {
          globalActiveNoteId = null;
        }
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
    if (id && !globalOpenNoteIds.includes(id)) {
      globalOpenNoteIds = [...globalOpenNoteIds, id];
    }
    notifyListeners();
  };

  const closeNote = (id: string) => {
    globalOpenNoteIds = globalOpenNoteIds.filter((nid) => nid !== id);
    if (globalActiveNoteId === id) {
      // Switch to the last opened note or null
      const remaining = globalOpenNoteIds;
      globalActiveNoteId =
        remaining.length > 0 ? remaining[remaining.length - 1] : null;
    }
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

  const openNotes = globalOpenNoteIds
    .map((id) => findNote(id, globalTree.folders, globalTree.rootNotes))
    .filter((n): n is Note => n !== null);

  return {
    tree: globalTree,
    activeNote,
    activeNoteId: globalActiveNoteId,
    openNotes, // Export open notes
    setActiveNoteId,
    closeNote, // Export close function
    createFolder,
    createNote,
    updateNote,
    deleteItem,
    refresh: fetchData,
    isLoading: globalIsLoading,
  };
};
