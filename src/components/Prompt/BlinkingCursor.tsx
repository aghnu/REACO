import { useEffect, useState } from 'react';

const BLINKING_INTERVAL_SECONDS = 1;

const BlinkingCursor = () => {
  const [cursor, setCursor] = useState('');
  useEffect(() => {
    const timeInterval = window.setInterval(() => {
      setCursor((prevCursor) => (prevCursor === '' ? '_' : ''));
    }, BLINKING_INTERVAL_SECONDS * 1000);

    return () => {
      window.clearInterval(timeInterval);
    };
  }, []);
  return (
    <>
      <span>{cursor}</span>
    </>
  );
};

export default BlinkingCursor;
