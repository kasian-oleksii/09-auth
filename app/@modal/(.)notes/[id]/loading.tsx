import { MoonLoader } from 'react-spinners';
import css from './NotePreview.module.css';

export default function Loading() {
  return (
    <div className={css.loaderContainer}>
      <MoonLoader color="#0d6efd" size={80} />
    </div>
  );
}
