// lib/api/clientApi.ts
import { api } from './api';

// Наприклад: отримати профіль користувача
export const fetchUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

// Наприклад: вийти з акаунту
export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};
// Цк для прикладу!!
