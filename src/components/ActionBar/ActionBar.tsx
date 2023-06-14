import ThemeSelector from './ThemeSelector';
import styles from '@styles/components/action-bar.module.scss';

const ActionBar = () => {
  return (
    <div className={styles['action-bar']}>
      <ThemeSelector />
    </div>
  );
};

export default ActionBar;
