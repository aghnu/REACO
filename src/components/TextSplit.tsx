import textStyle from '@styles/modules/text.module.scss';

const TextSplit = ({
  left,
  right,
}: {
  left: JSX.Element;
  right: JSX.Element;
}) => {
  return (
    <div className={textStyle['text-split']}>
      {left}
      <span className={textStyle['text-split__sep']} />
      {right}
    </div>
  );
};

export default TextSplit;
