import axios from "axios";
import {
  Note,
  NoteFolder,
  NoteTree,
} from "../../features/dashboard/tools/MyWorld/types";

const API_URL = "http://localhost:8000/api/v1/my-world";

export const noteApi = {
  async fetchTree(): Promise<NoteTree> {
    const response = await axios.get(`${API_URL}/tree`);
    return response.data;
  },

  async createNote(note: Partial<Note>): Promise<Note> {
    const response = await axios.post(`${API_URL}/notes`, note);
    return response.data;
  },

  async updateNote(id: string, updates: Partial<Note>): Promise<Note> {
    const response = await axios.patch(`${API_URL}/notes/${id}`, updates);
    return response.data;
  },

  async deleteNote(id: string): Promise<void> {
    await axios.delete(`${API_URL}/notes/${id}`);
  },

  async createFolder(folder: Partial<NoteFolder>): Promise<NoteFolder> {
    const response = await axios.post(`${API_URL}/folders`, folder);
    return response.data;
  },

  async updateFolder(
    id: string,
    updates: Partial<NoteFolder>
  ): Promise<NoteFolder> {
    const response = await axios.patch(`${API_URL}/folders/${id}`, updates);
    return response.data;
  },

  async deleteFolder(id: string): Promise<void> {
    await axios.delete(`${API_URL}/folders/${id}`);
  },
};
