import { create } from 'zustand';
import { NewNoteData } from '@/types/note';
import { persist } from 'zustand/middleware';

const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraft = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

export const useDraftNote = create<NoteDraft>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (note: NewNoteData) => set({ draft: note }),
        clearDraft: () => set({ draft: initialDraft }),
      };
    },
    {
      name: 'draft',
      partialize: (state) => {
        return { draft: state.draft };
      },
    },
  ),
);
