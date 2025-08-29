import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] as NoteTag | 'All' | undefined;

  const tagTitle = tag && tag !== 'All' ? `Notes by tag: ${tag}` : `All notes`;
  const tagDescription =
    tag && tag !== 'All' ? `by category ${tag}` : 'from all categories';

  return {
    title: tagTitle,
    description: `Here are all notes ${tagDescription}.`,
    openGraph: {
      title: tagTitle,
      description: `Collection notes filtered ${tagDescription}`,
      url: `https://07-routing-nextjs-sage.vercel.app/notes/filter/${tag ?? 'All'}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tagTitle,
        },
      ],
    },
  };
};

const NotesFilterPage = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug?.[0] as NoteTag | 'All' | undefined;
  const initialData = await fetchNotes({
    page: 1,
    perPage: 9,
    search: '',
    ...(tag && tag !== 'All' && { tag }),
  });

  return <NotesClient initialData={initialData} tag={tag} />;
};
export default NotesFilterPage;
