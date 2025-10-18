import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

const Header = async () => {
  const tags = [
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
    'Ideas',
    'Travel',
    'Finance',
    'Health',
    'Important',
  ];

  return (
    <header className={css.header}>
      <Link className={css.logo} href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <TagsMenu tags={tags} />
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
