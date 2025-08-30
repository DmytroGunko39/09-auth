'use client';
import { User } from '@/types/types';
import { api } from './api';
import type { Note, NewNoteData, DeleteNoteResponse } from '@/types/note';
import type { FetchNotesResponse, FetchNotesParams } from '@/types/types';

export type LoginRequestData = {
  email: string;
  password: string;
};

export type RegisterRequestData = {
  email: string;
  password: string;
};

export const fetchNotes = async ({
  page = 1,
  perPage = 9,
  search = '',
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search: search.trim() } : {}),
      ...(tag ? { tag } : {}),
    },
  });

  return res.data;
};

export const createNote = async (notesData: NewNoteData): Promise<Note> => {
  const res = await api.post<Note>('/notes', notesData);
  return res.data;
};

export const deleteNote = async (
  noteId: string,
): Promise<DeleteNoteResponse> => {
  const res = await api.delete<DeleteNoteResponse>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const loginUser = async (notesData: LoginRequestData): Promise<User> => {
  const res = await api.post<User>('/auth/login', notesData);
  return res.data;
};

export const logOutUser = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

export const registerUser = async (notesData: RegisterRequestData) => {
  const res = await api.post<User>('/auth/register', notesData);
  return res.data;
};

export const checkSession = async (): Promise<boolean> => {
  const res = await api.get<{ success: boolean }>('/auth/session');
  return res.data.success;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

// export const logOut = async (): Promise<void> => {
//   try {
//     await api.post('/auth/logout');
//   } catch (error) {
//     handleApiError(error, 'logout');
//     throw error;
//   }
// };
