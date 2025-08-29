import { api } from './api';
import { cookies } from 'next/headers';
import type { Note } from '../../types/note';
import type { FetchNotesResponse, FetchNotesParams } from '@/types/types';

export const fetchNotesServer = async ({
  page = 1,
  perPage = 9,
  search = '',
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const cookieStore = cookies();
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
  const cookieStore = cookies();
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
