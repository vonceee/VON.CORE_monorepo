export interface Note {
  id: string;
  folder_id: string | null;
  title: string;
  content: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
  isOptimistic?: boolean;
}

export interface NoteFolder {
  id: string;
  parent_id: string | null;
  name: string;
  icon: string;
  is_favorite: boolean;
  children: NoteFolder[];
  notes: Note[];
  isOpen?: boolean; // UI state
  isOptimistic?: boolean;
}

export interface NoteTree {
  folders: NoteFolder[];
  rootNotes: Note[];
}
