import { nextServer } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { FetchNoteList, Note } from '@/types/note';

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string,
): Promise<FetchNoteList> => {
  const cookieStore = await cookies();
  const cookieHeaders = cookieStore.toString();
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
    headers: {
      Cookie: cookieHeaders,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const fetchUserProfile = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response;
};
