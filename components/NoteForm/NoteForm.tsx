'use client';
import css from './NoteForm.module.css';
import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import type { NewNote } from '@/types/note';

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const NoteForm = () => {
  const router = useRouter();
  const id = useId();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleClickCancel = () => router.push('/notes/filter/all');

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title');
    const content = formData.get('content');
    const tag = formData.get('tag');

    if (!title || !content || !tag) {
      alert('Please fill in all fields');
      return;
    }

    const data: NewNote = {
      title: String(title),
      content: String(content),
      tag: String(tag) as NewNote['tag'],
    };

    mutate(data);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          id={`${id}-title`}
          type="text"
          name="title"
          className={css.input}
          value={draft?.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content </label>
        <textarea
          id={`${id}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={draft?.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        {
          <select
            id={`${id}-tag`}
            name="tag"
            className={css.select}
            value={draft?.tag}
            onChange={handleChange}
          >
            {tags.map((tag) => (
              <option value={tag} key={tag}>
                {tag}
              </option>
            ))}
          </select>
        }
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleClickCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
