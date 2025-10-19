'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/clientApi';
import css from './NotePreview.module.css';
import { Note } from '@/types/note';

const NotePreview = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isError, isLoading } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return null;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
            <button
              type="button"
              onClick={() => router.back()}
              className={css.closeButton}
            >
              ✕
            </button>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.content}>{data.tag}</p>
          <p className={css.date}>{data.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
