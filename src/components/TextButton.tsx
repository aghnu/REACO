import styles from '@styles/components/text-button.module.scss';
import { getClassName } from '@utils/helpers';
import React from 'react';

// TODO: implement logic to communicate with external app
const TextButton = ({
  children,
  onClick = () => {},
}: React.PropsWithChildren<{
  onClick?: (e: React.MouseEvent) => void;
}>) => {
  return (
    <button
      className={getClassName([
        'gl-link',
        'gl-color-text-desc',
        styles['text-button'],
      ])}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {children}
    </button>
  );
};

export default TextButton;
