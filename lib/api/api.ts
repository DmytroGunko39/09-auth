import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is missing in environment variables');
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
