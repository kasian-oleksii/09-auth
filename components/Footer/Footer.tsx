import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>
            Developer:{' '}
            <a
              href="https://www.linkedin.com/in/oleksii-kasian-dev/"
              target="_blank"
            >
              Oleksii Kasian
            </a>{' '}
          </p>
          <p>
            Contact us:{' '}
            <a href="kasianalex1@gmail.com">kasianalex1@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
