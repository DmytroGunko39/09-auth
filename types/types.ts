import { Note } from './note';

export type User = {
  username: string;
  email: string;
  avatar: 'https://ac.goit.global/fullstack/react/default-avatar.jpg';
};

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

export type LoginRequestData = {
  email: string;
  password: string;
};

export type RegisterRequestData = {
  email: string;
  password: string;
};
