import axios from 'axios';
import type { NewNoteData, Note, DeleteNoteResponse } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages?: number;
  page: number;
  perPage: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

const myKey = process.env.NEXT_PUBLIC_API_URL;

if (!myKey) {
  throw new Error('NEXT_PUBLIC_API_URL is missing in environment variables');
}

axios.defaults.baseURL = 'https://notehub-api.goit.study';

export const fetchNotes = async ({
  page = 1,
  perPage = 9,
  search = '',
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`/notes`, {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(tag ? { tag } : {}),
    },
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });

  return response.data;
};

export const createNote = async (notesData: NewNoteData) => {
  const response = await axios.post<Note>('/notes', notesData, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

export const deleteNote = async (
  noteId: string,
): Promise<DeleteNoteResponse> => {
  const response = await axios.delete<DeleteNoteResponse>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
  });
  return response.data;
};

// export const fetchNoteByTag = async (tag?: string): Promise<Note[]> => {
//   const params = tag && tag !== 'All' ? { tag } : {};

//   const response = await axios.get<Note[]>(`/notes/`, {
//     headers: {
//       Authorization: `Bearer ${myKey}`,
//     },
//     params,
//   });
//   return response.data;
// };
