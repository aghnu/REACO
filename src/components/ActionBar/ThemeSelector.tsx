import styles from '@styles/components/action-bar.module.scss';
import { icon } from '@utils/svgFactory';
import TextIcon from '@components/TextIcon';
import { useMemo } from 'react';
import { globalStyleState } from '@store/index';
import { useAtom } from 'jotai';

const ThemeSelector = () => {
  const [themeMode, setThemeMode] = useAtom(globalStyleState.displayThemeMode);

  const iconMoon = useMemo(() => icon.moon('var(--color-focus)', '90%'), []);
  const iconSun = useMemo(() => icon.sun('var(--color-focus)', '90%'), []);

  return (
    <div className={styles['theme-selector']}>
      {themeMode === 'dark' ? (
        <span
          className="global-clickable"
          onClick={() => {
            setThemeMode('light');
          }}
        >
          <TextIcon iconElement={iconSun}></TextIcon>
        </span>
      ) : (
        <span
          className="global-clickable"
          onClick={() => {
            setThemeMode('dark');
          }}
        >
          <TextIcon iconElement={iconMoon}></TextIcon>
        </span>
      )}
    </div>
  );
};

export default ThemeSelector;
