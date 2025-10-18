import { LoginRequest, RegisterRequest, User } from '@/types/user';
import { nextServer } from './api';
import type { NewNote, Note, FetchNoteList } from '@/types/note';

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username: string;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>('/auth/session');
  return response.data.success;
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>('/auth/register', data);
  return response.data;
};

export const loginUser = async (data: LoginRequest) => {
  const response = await nextServer.post<User>('/auth/login', data);
  return response.data;
};

export const logoutUser = async () => {
  await nextServer.post('/auth/logout');
};

export const getMe = async () => {
  const response = await nextServer.get<User>('/users/me');
  return response.data;
};

export const updateMe = async (data: UpdateUserRequest) => {
  const response = await nextServer.patch<User>('/users/me', data);
  return response.data;
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNoteList> => {
  const params = {
    perPage: 12,
    page,
    tag,
    search,
  };

  if (search.trim() !== '') {
    params.search = search;
  }

  const response = await nextServer.get<FetchNoteList>(`/notes`, {
    params,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);

  return response.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>('/notes', noteData);

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);

  return response.data;
};
