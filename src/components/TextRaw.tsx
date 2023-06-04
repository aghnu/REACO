import { useMemo } from 'react';

const TextRaw = ({
  text,
  className,
  type = 'span',
}: {
  text: string;
  type?: 'span' | 'p';
  className?: string | undefined;
}) => {
  const inputChunks = useMemo(() => {
    if (text === '') return [];

    const textSplits = text.split(' ');
    const chunks: string[] = [];
    for (let i = 0; i < textSplits.length; i++) {
      if (textSplits[i] !== '') chunks.push(textSplits[i]);
      if (i + 1 < textSplits.length) chunks.push(' ');
    }

    return chunks;
  }, [text]);

  const innerContent = useMemo(
    () => (
      <>
        {inputChunks.map((chunk, index) =>
          chunk === ' ' ? (
            <span key={index}>&nbsp;</span>
          ) : (
            <span key={index}>{chunk}</span>
          )
        )}
      </>
    ),
    [inputChunks]
  );

  return (
    <>
      {type === 'p' ? (
        <p className={className}>{innerContent}</p>
      ) : (
        <span className={className}>{innerContent}</span>
      )}
    </>
  );
};

export default TextRaw;
