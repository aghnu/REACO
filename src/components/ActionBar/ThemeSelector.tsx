import styles from '@styles/components/action-bar.module.scss';
import { icon } from '@utils/svgFactory';
import TextIcon from '@components/TextIcon';
import { useMemo } from 'react';
import { globalStyleState } from '@store/index';
import { useAtomValue } from 'jotai';
import ApplicationController from '@applications/controllers/ApplicationController';

const ThemeSelector = () => {
  const themeMode = useAtomValue(globalStyleState.displayThemeMode);

  const iconMoon = useMemo(() => icon.moon('var(--color-focus)', '90%'), []);
  const iconSun = useMemo(() => icon.sun('var(--color-focus)', '90%'), []);

  return (
    <div className={styles['theme-selector']}>
      {themeMode === 'dark' ? (
        <span
          className="gl-clickable"
          onClick={() => {
            ApplicationController.getInstance().runApplicationFromArgs([
              'theme',
              'light',
            ]);
          }}
        >
          <TextIcon iconElement={iconSun}></TextIcon>
        </span>
      ) : (
        <span
          className="gl-clickable"
          onClick={() => {
            ApplicationController.getInstance().runApplicationFromArgs([
              'theme',
              'dark',
            ]);
          }}
        >
          <TextIcon iconElement={iconMoon}></TextIcon>
        </span>
      )}
    </div>
  );
};

export default ThemeSelector;
