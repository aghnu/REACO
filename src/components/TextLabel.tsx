const TextLabel = ({ text }: { text: string }) => {
  return <p className="gl-color-text-focus">{`[${text}]`}</p>;
};

export default TextLabel;
