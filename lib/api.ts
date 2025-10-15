import axios from 'axios';
import type { NewNote, Note, FetchNoteList } from '../types/note';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const authHeaders = {
  Authorization: `Bearer ${token}`,
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNoteList> => {
  const params: Record<string, string | number | undefined> = {
    perPage: 12,
    page,
  };

  if (tag && tag.trim() !== '') {
    const formattedTag =
      tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    params.tag = formattedTag;
  }

  if (search && search.trim() !== '') params.search = search.trim();

  const { data } = await axios.get<FetchNoteList>('/notes', {
    headers: authHeaders,
    params,
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(`/notes/${id}`, {
    headers: authHeaders,
  });
  return data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const { data } = await axios.post<Note>('/notes', noteData, {
    headers: authHeaders,
  });
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: authHeaders,
  });
  return data;
};
