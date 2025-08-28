import axios from 'axios';

export type User = {
  username: string;
  email: string;
  avatar: 'https://ac.goit.global/fullstack/react/default-avatar.jpg';
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type RegisterRequestData = {
  username: string;
  email: string;
};

export const loginUser = async (notesData: LoginRequestData) => {
  const { data } = await axios.post<User>('/auth/login', notesData);
  return data;
};

export const registerUser = async (notesData: RegisterRequestData) => {
  const { data } = await axios.post<User>('/auth/register', notesData);
  return data;
};

// Наприклад: вийти з акаунту
// export const logoutUser = async () => {
//   const response = await axios.post('/auth/logout');
//   return response.data;
// };
