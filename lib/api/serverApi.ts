// lib/api/serverApi.ts
import { api } from './api';

export const fetchUserProfileServer = async (cookies: string) => {
  const response = await api.get('/user/profile', {
    headers: {
      Cookie: cookies,
    },
  });
  return response.data;
};
//Це тільки для прикладу!!!
