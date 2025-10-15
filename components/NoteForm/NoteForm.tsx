'use client';

import css from './NoteForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { type NewNote } from '@/types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
  onCloseModal?: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Enter the note title'),
  content: Yup.string().max(500, 'Too Long!'),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']),
});

export default function NoteForm({ onCloseModal }: NoteFormProps) {
  const idUse = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (noteData: NewNote) => createNote(noteData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      if (onCloseModal) {
        onCloseModal();
      } else {
        router.back();
      }
    },
  });

  const handleSubmit = (
    values: FormValues,
    formikHelper: FormikHelpers<FormValues>,
  ) => {
    formikHelper.resetForm();
    mutate(values);
  };

  const handleCancel = () => {
    if (onCloseModal) {
      onCloseModal();
    } else {
      router.back();
    }
  };

  const initialValues: FormValues = {
    title: draft?.title ?? '',
    content: draft?.content ?? '',
    tag: (draft?.tag as FormValues['tag']) ?? 'Todo',
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={NoteSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${idUse}-title`}>Title</label>
            <Field
              id={`${idUse}-title`}
              type="text"
              name="title"
              className={css.input}
              value={values.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;
                setFieldValue('title', v);
                setDraft({ ...draft, title: v });
              }}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${idUse}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${idUse}-content`}
              name="content"
              rows={8}
              className={css.textarea}
              value={values.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                const v = e.target.value;
                setFieldValue('content', v);
                setDraft({ ...draft, content: v });
              }}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${idUse}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${idUse}-tag`}
              name="tag"
              className={css.select}
              value={values.tag}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const v = e.target.value as FormValues['tag'];
                setFieldValue('tag', v);
                setDraft({ ...draft, tag: v });
              }}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}
            >
              {isPending ? 'Creating new note...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
