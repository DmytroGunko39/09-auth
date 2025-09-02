import React from 'react';
import css from '@/components/LayoutNotes/LayoutNotes.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const LayoutNotes = ({ children, sidebar }: Props) => {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
};

export default LayoutNotes;
