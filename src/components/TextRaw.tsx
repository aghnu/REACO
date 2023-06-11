import React, { useMemo } from 'react';

const TextRaw = ({
  text,
  className,
  type = 'span',
}: {
  text: string;
  type?: 'span' | 'p';
  className?: string | undefined;
}) => {
  const processedText = useMemo(() => text.replaceAll(' ', '\u00a0'), [text]);

  return <>{React.createElement(type, { className }, processedText)}</>;
};

export default TextRaw;
