import styles from '@styles/components/footer.module.scss';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer + ' ' + 'gl-color-text-focus'}>
        © 2023 Gengyuan Huang
      </footer>
    </>
  );
};

export default Footer;
