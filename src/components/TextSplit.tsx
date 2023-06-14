import textComponentStyle from '@styles/modules/text-components.module.scss';
import { getClassName } from '@utils/helpers';

const TextSplit = ({
  left,
  right,
  type = 'normal',
}: {
  left: JSX.Element | JSX.Element[] | string;
  right: JSX.Element | JSX.Element[] | string;
  type?: 'alt' | 'normal';
}) => {
  return (
    <div className={textComponentStyle['text-split']}>
      {left}
      <span
        className={getClassName([
          textComponentStyle['text-split__sep'],
          { [textComponentStyle['text-split__sep--alt']]: type === 'alt' },
        ])}
      />
      {right}
    </div>
  );
};

export default TextSplit;
