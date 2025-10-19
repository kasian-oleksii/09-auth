import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

type NotesPageProps = {
  params: { slug?: string[] };
  searchParams?: { [key: string]: string | undefined };
};

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const currentPage = Number(searchParams?.page ?? 1);
  const search = String(searchParams?.search ?? '');
  const tag = params.slug?.[0] ?? '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', currentPage, search, tag],
    queryFn: () => fetchNotes(currentPage, search, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
