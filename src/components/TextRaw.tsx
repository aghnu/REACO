import { useMemo } from 'react';

const TextRaw = ({ text }: { text: string }) => {
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

  return (
    <>
      {inputChunks.map((chunk, index) =>
        chunk === ' ' ? (
          <span key={index}>&nbsp;</span>
        ) : (
          <span key={index}>{chunk}</span>
        )
      )}
    </>
  );
};

export default TextRaw;
