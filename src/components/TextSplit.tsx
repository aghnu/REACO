import textComponentStyle from '@styles/components/text-components.module.scss';

const TextSplit = ({
  left,
  right,
}: {
  left: JSX.Element;
  right: JSX.Element;
}) => {
  return (
    <div className={textComponentStyle['text-split']}>
      {left}
      <span className={textComponentStyle['text-split__sep']} />
      {right}
    </div>
  );
};

export default TextSplit;
