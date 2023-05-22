import styles from '@styles/components/footer.module.scss';
import stylesText from '@styles/modules/text.module.scss';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer + ' ' + stylesText.focus}>
        © 2022 Gengyuan Huang
      </footer>
    </>
  );
};

export default Footer;
