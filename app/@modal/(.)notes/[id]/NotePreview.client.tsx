'use client';

import React from 'react';
import Modal from '@/components/Modal/Modal';
import css from '@/components/NotePreview/NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: string;
};

const NotePreview = ({ id }: Props) => {
  const router = useRouter();
  const handleClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  const formattedDate = note.updatedAt
    ? `Update at:${note.updatedAt}`
    : `Create at:${note.createdAt}`;
  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <button className={css.backBtn} onClick={handleClose}>
            Back
          </button>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>
            {note.content || 'No content available.'}
          </p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
};
export default NotePreview;
