import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface NotePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: NotePageProps): Promise<Metadata> => {
  const { id } = await params;
  const noteData = await fetchNoteById(id);

  const title = noteData?.title ?? 'Note details';
  const description = noteData?.content ?? 'Detailed note view';
  return {
    title: title,
    description: description.slice(0, 30),
    openGraph: {
      title: title,
      description: description,
      url: `https://07-routing-nextjs-sage.vercel.app/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: noteData?.title ?? 'View note details',
        },
      ],
      type: 'article',
    },
  };
};

const NoteDetails = async ({ params }: NotePageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};
export default NoteDetails;
