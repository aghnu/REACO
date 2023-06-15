import textStyle from '@styles/modules/text.module.scss';

const TextLabel = ({ text }: { text: string }) => {
  return <p className={textStyle.focus}>{`[${text}]`}</p>;
};

export default TextLabel;
