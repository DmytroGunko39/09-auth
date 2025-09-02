import { api } from './api';
import { cookies } from 'next/headers';
import type { Note } from '../../types/note';
import type { FetchNotesResponse, FetchNotesParams } from '@/types/types';
import { AxiosResponse } from 'axios';
import { User } from '@/types/user';

export const fetchNotesServer = async ({
  page = 1,
  perPage = 9,
  search = '',
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(tag ? { tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async (): Promise<AxiosResponse> => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const getMeServer = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const res = await api.get<User>('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch user on server:', error);
    return null;
  }
};
