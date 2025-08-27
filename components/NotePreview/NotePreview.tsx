import styles from '@/components/NotePreview/NotePreview.module.css';
import { fetchNoteById } from '@/lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);
  if (!note) {
    return <p>Note not found</p>;
  }

  const formattedDate = note.updatedAt
    ? `Update at:${note.updatedAt}`
    : `Create at:${note.createdAt}`;

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
          <span className={styles.tag}>{note.tag}</span>
        </div>
        <div className={styles.content}>
          {note.content || 'No content available.'}
        </div>
        <div className={styles.date}>{formattedDate}</div>
      </div>
    </div>
  );
};

export default NotePreview;
