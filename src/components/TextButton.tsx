import textStyle from '@styles/modules/text.module.scss';
import textComponentStyle from '@styles/modules/text-components.module.scss';
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
        textStyle.link,
        textStyle.desc,
        textComponentStyle['text-button'],
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
