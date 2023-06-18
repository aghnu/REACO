import textStyle from '@styles/modules/text.module.scss';
import { getClassName } from '@utils/helpers';
import React from 'react';

// TODO: implement logic to communicate with external app
// for now, just <a /> tag
const TextLink = ({
  children,
  link,
  target = '_blank',
  className = undefined,
}: React.PropsWithChildren<{
  link: string;
  target?: string;
  className?: string;
}>) => {
  return (
    <a
      className={getClassName([
        textStyle.link,
        'global-w-fit-content',
        className,
      ])}
      href={link}
      target={target}
    >
      {children}
    </a>
  );
};

export default TextLink;
