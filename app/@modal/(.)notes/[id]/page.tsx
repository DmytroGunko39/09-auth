import NotePreview from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

const PreviewPage = async ({ params }: Props) => {
  const { id } = await params;
  const querClient = new QueryClient();

  await querClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(querClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
};

export default PreviewPage;
