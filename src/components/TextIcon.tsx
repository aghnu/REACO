import styles from '@styles/components/text-icon.module.scss';

const TextIcon = ({ iconElement }: { iconElement: JSX.Element }) => {
  return (
    <div className={styles['text-icon']}>
      <div className={styles['text-icon__icon']}>{iconElement}</div>
    </div>
  );
};

export default TextIcon;
