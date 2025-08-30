import { User } from '@/types/types';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => ({ isAuthenticated: true, user }),
  clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;
